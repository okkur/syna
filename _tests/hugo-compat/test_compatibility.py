#!/usr/bin/env python3
"""Synthetic Hugo regression tests; uses Python's standard library only."""

import argparse
from contextlib import contextmanager
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import threading
import unittest


PARSER = argparse.ArgumentParser(description=__doc__)
PARSER.add_argument("--hugo", required=True, help="Path to a Hugo binary")
PARSER.add_argument("--theme-root", type=Path, default=Path(__file__).resolve().parents[2])
PARSER.add_argument("--artifacts", type=Path)
PARSER.add_argument("--group", choices=["language", "paths", "css", "navigation", "repositories", "smoke", "all"], default="all")
OPTIONS = None


class HugoCase(unittest.TestCase):
    def setUp(self):
        if OPTIONS.artifacts:
            self.root = OPTIONS.artifacts.resolve() / self.id().split(".")[-1]
            self.root.mkdir(parents=True, exist_ok=False)
        else:
            temp = tempfile.TemporaryDirectory(prefix="syna-hugo-")
            self.addCleanup(temp.cleanup)
            self.root = Path(temp.name)
        self.theme = OPTIONS.theme_root.resolve()

    def write(self, path, content):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")

    def partial(self, path):
        target = self.root / "layouts/partials" / path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(self.theme / "layouts/partials" / path, target)

    def build(self, *args, expected=0):
        command = [str(Path(OPTIONS.hugo).resolve()), "--source", str(self.root),
                   "--destination", str(self.root / "public"),
                   "--cacheDir", str(self.root / "cache"), "--ignoreCache", *args]
        env = {key: value for key, value in os.environ.items() if not key.startswith("HUGO_")}
        env.update(GOMAXPROCS="2", HUGO_RESOURCEDIR=str(self.root / "resources"))
        result = subprocess.run(command, capture_output=True, text=True, env=env, timeout=30)
        (self.root / "command.json").write_text(json.dumps(command, indent=2))
        (self.root / "build.log").write_text(result.stdout + result.stderr)
        (self.root / "build-result.json").write_text(json.dumps({
            "exit_code": result.returncode, "expected_success": expected == 0,
            "environment": {"GOMAXPROCS": "2", "HUGO_RESOURCEDIR": str(self.root / "resources")}
        }, indent=2))
        if expected == 0:
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        return result


class FragmentLanguageTests(HugoCase):
    def language_fixture(self, globals=False):
        self.write("config.toml", '''baseURL = "https://example.invalid/"
defaultContentLanguage = "de"
defaultContentLanguageInSubdir = true
disableKinds = ["RSS", "sitemap", "taxonomy", "term", "taxonomyTerm"]
[languages.de]
weight = 1
[languages.en]
weight = 2
[params]
defaultContentLanguage = "de"
''')
        self.partial("helpers/fragments.html")
        self.partial("helpers/deprecation-warning.html")
        self.write("layouts/index.html", "Synthetic home.\n")
        self.write("layouts/_default/single.html", '''{{- .Scratch.Set "layout_info" (dict "root" . "real_page" . "page" .) -}}
{{- partial "helpers/fragments.html" (dict "page_scratch" .Scratch) -}}
{{- $markers := slice -}}
{{- range .Scratch.Get "page_fragments" -}}
  {{- $markers = $markers | append .Params.marker -}}
{{- end -}}
{{- $markers | jsonify -}}
''')
        for path, title in [("_index.md", "Deutsch"), ("_index.en.md", "English")]:
            self.write("content/" + path, '+++\ntitle = "' + title + '"\n+++\n')
        for directory in (["_global", "page"] if globals else ["page"]):
            for suffix in ["", ".en"]:
                metadata = "headless = true" if directory == "_global" else 'title = "Synthetic page"'
                self.write(f"content/{directory}/index{suffix}.md", f"+++\n{metadata}\n+++\n")
        fragments = [
            ("page/localized.md", "local-de"),
            ("page/localized.en.md", "local-en"),
        ]
        if globals:
            fragments += [("_global/translated.md", "global-de"),
                          ("_global/translated.en.md", "global-en"),
                          ("_global/fallback.md", "global-fallback")]
        for path, marker in fragments:
            self.write("content/" + path,
                       f'+++\nfragment = "content"\nmarker = "{marker}"\n+++\nSynthetic fragment.\n')
    def test_language_selection(self):
        self.language_fixture()
        self.build()
        de = json.loads((self.root / "public/de/page/index.html").read_text())
        en = json.loads((self.root / "public/en/page/index.html").read_text())
        self.assertEqual(de, ["local-de"])
        self.assertEqual(en, ["local-en"])


class FragmentPathTests(FragmentLanguageTests):
    test_language_selection = None

    def test_global_fallback(self):
        self.language_fixture(globals=True)
        self.build()
        de = json.loads((self.root / "public/de/page/index.html").read_text())
        en = json.loads((self.root / "public/en/page/index.html").read_text())
        self.assertCountEqual(de, ["global-de", "global-fallback", "local-de"])
        self.assertCountEqual(en, ["global-en", "global-fallback", "local-en"])

    def test_home_fragment_bundle(self):
        self.language_fixture()
        self.write("layouts/index.html", (self.root / "layouts/_default/single.html").read_text())
        for suffix in ["", ".en"]:
            self.write(f"content/_index/index{suffix}.md", "+++\nheadless = true\n+++\n")
        self.write("content/_index/home.md", '+++\nfragment = "content"\nmarker = "home-de"\n+++\n')
        self.write("content/_index/home.en.md", '+++\nfragment = "content"\nmarker = "home-en"\n+++\n')
        self.build()
        self.assertEqual(json.loads((self.root / "public/de/index.html").read_text()), ["home-de"])
        self.assertEqual(json.loads((self.root / "public/en/index.html").read_text()), ["home-en"])

    def test_local_precedence(self):
        self.language_fixture(globals=True)
        for path, marker in [("_global/override.md", "global"), ("page/override.md", "local")]:
            self.write("content/" + path, f'+++\nfragment = "content"\nmarker = "{marker}"\n+++\n')
        self.build()
        de = json.loads((self.root / "public/de/page/index.html").read_text())
        self.assertIn("local", de)
        self.assertNotIn("global", de)
        self.assertEqual(de.count("local"), 1)

    def test_not_found_fragments(self):
        self.language_fixture(globals=True)
        template = (self.root / "layouts/_default/single.html").read_text()
        self.write("layouts/404.html", template.replace(
            '(dict "root" .', '(dict "is_404" true "root" .'))
        self.build()
        self.assertCountEqual(json.loads((self.root / "public/de/404.html").read_text()),
                              ["global-de", "global-fallback"])
        self.assertCountEqual(json.loads((self.root / "public/en/404.html").read_text()),
                              ["global-en", "global-fallback"])


class NavigationTests(HugoCase):
    def navigation(self, multilingual):
        config = 'baseURL = "https://example.invalid/"\ndisableKinds = ["RSS", "sitemap", "taxonomy", "term", "taxonomyTerm"]\n'
        if multilingual:
            config += '[languages.de]\nweight = 1\n[languages.en]\nweight = 2\n'
        self.write("config.toml", config)
        self.partial("fragments/nav.html")
        self.write("layouts/index.html", '''{{- partial "fragments/nav.html" (dict "self" . "page_scratch" .Scratch "root" . "Site" .Site "Params" (dict "asset" (dict "text" "Synthetic")) "Name" "nav") -}}''')
        self.write("content/_index.md", "+++\ntitle = 'Synthetic'\n+++\n")
        if multilingual:
            self.write("content/_index.de.md", "+++\ntitle = 'Deutsch'\n+++\n")
        self.build()

    def test_navigation_one_language(self):
        self.navigation(False)
        html = (self.root / "public/index.html").read_text()
        self.assertIn("navbar-toggler", html)
        self.assertNotIn('href="/en"', html)

    def test_navigation_two_languages(self):
        self.navigation(True)
        html = (self.root / "public/index.html").read_text()
        self.assertIn('href="/en"', html)
        self.assertIn('href="/de"', html)


class CssTests(HugoCase):
    def css_build(self, development):
        self.write("config.toml", 'baseURL = "https://example.invalid/"\ndisableKinds = ["RSS", "sitemap", "taxonomy", "term", "taxonomyTerm"]\n')
        for path in ["head.html", "helpers/page-title.html", "extra/grid-css.html"]:
            self.partial(path)
        self.write("layouts/index.html", '{{ partial "head.html" . }}')
        self.write("content/_index.md", "+++\ntitle = 'Synthetic'\n+++\n")
        # Exercise ExecuteAsTemplate and the actual head partial with tiny deterministic assets.
        self.write("assets/styles/index.scss", '$c: #112233; .synthetic {color: $c;}')
        self.write("assets/scripts/syna-head.js", 'window.synthetic = true;')
        self.build("--environment", "development" if development else "production", "--minify")
        css_files = list((self.root / "public").glob("style*.css"))
        self.assertEqual(len(css_files), 1)
        self.assertIn(".synthetic", css_files[0].read_text())
        self.assertIn("#123", css_files[0].read_text())
        html = (self.root / "public/index.html").read_text()
        self.assertIn(css_files[0].name, html)

    def test_css_production(self):
        self.css_build(False)

    def test_css_development(self):
        self.css_build(True)


class RepositoriesTests(HugoCase):
    @contextmanager
    def api(self, body, status=200):
        payload = body.encode()

        class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(payload)

            def log_message(self, *args):
                pass

        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            yield f"http://127.0.0.1:{server.server_port}"
        finally:
            server.shutdown()
            server.server_close()
            thread.join()

    def repositories(self, body, status=200, params="", expected=0):
        with self.api(body, status) as endpoint:
            endpoint_pattern = re.escape(endpoint)
            self.write("config.toml", f'''baseURL = "https://example.invalid/"
timeout = "1s"
disableKinds = ["RSS", "sitemap", "taxonomy", "term", "taxonomyTerm"]
[params.repositories]
user = "synthetic"
{params}
[security.http]
urls = ['^{endpoint_pattern}/users/synthetic/repos$']
''')
            self.partial("fragments/repositories_github.html")
            self.partial("helpers/container.html")
            target = self.root / "layouts/partials/fragments/repositories_github.html"
            source = target.read_text()
            # Redirect only the fixed API origin in this temporary copy; never call GitHub.
            self.assertEqual(source.count("https://api.github.com"), 1)
            target.write_text(source.replace("https://api.github.com", endpoint))
            self.write("layouts/index.html", '''{{- partial "fragments/repositories_github.html" (dict "self" . "page_scratch" .Scratch "Params" .Site.Params.repositories "Name" "repositories") -}}''')
            self.write("content/_index.md", "+++\ntitle = 'Synthetic'\n+++\n")
            result = self.build(expected=expected)
            return (self.root / "public/index.html").read_text() if expected == 0 else result.stdout + result.stderr

    def test_repositories_sort_count_and_forks(self):
        data = [{"name": n, "fork": fork, "stargazers_count": stars,
                 "svn_url": f"https://example.invalid/{n}", "updated_at": "2020-01-01T00:00:00Z"}
                for n, fork, stars in [("low", False, 1), ("fork", True, 100), ("high", False, 9)]]
        html = self.repositories(json.dumps(data), params="count = 1")
        self.assertIn('href="https://example.invalid/high"', html)
        self.assertNotIn('href="https://example.invalid/low"', html)
        self.assertNotIn('href="https://example.invalid/fork"', html)

    def test_repositories_allowlist_and_display_forks(self):
        data = [{"name": n, "fork": fork, "stargazers_count": 1,
                 "svn_url": f"https://example.invalid/{n}", "updated_at": "2020-01-01T00:00:00Z"}
                for n, fork in [("selected", True), ("excluded", False)]]
        html = self.repositories(json.dumps(data), params='display_forks = true\nallowlist = ["selected"]')
        self.assertIn('href="https://example.invalid/selected"', html)
        self.assertNotIn('href="https://example.invalid/excluded"', html)

    def test_repositories_empty_list(self):
        self.assertNotIn('class="card"', self.repositories("[]"))

    def test_repositories_not_found(self):
        self.assertIn("resource not found", self.repositories("{}", status=404, expected=1))

    def test_repositories_http_error(self):
        self.assertIn("500", self.repositories("{}", status=500, expected=1))

    def test_repositories_invalid_json(self):
        self.assertIn("unmarshal", self.repositories("invalid JSON", expected=1).lower())


class SmokeTests(HugoCase):
    def full_theme(self, generated_terms=False):
        self.write("config.toml", '''baseURL = "https://example.invalid/"
title = "Synthetic Syna"
disableKinds = ["RSS", "sitemap", "taxonomy", "term", "taxonomyTerm"]
[outputs]
home = ["HTML", "JSON"]
''')
        self.write("content/_index.md", "+++\ntitle = 'Synthetic home'\n+++\n")
        self.write("content/_index/index.md", "+++\nheadless = true\n+++\n")
        self.write("content/_index/content.md", "+++\nfragment = 'content'\nweight = 10\n+++\nSYNTHETIC_HOME_MARKER\n")
        self.write("content/_global/index.md", "+++\nheadless = true\n+++\n")
        self.write("content/_global/nav.md", "+++\nfragment = 'nav'\nweight = 0\n+++\n")
        self.write("content/_global/hero.md", "+++\nfragment = 'hero'\ntitle = 'SYNTHETIC_GLOBAL_HERO_MARKER'\nweight = 5\nparticles = true\n[header]\nimage = 'synthetic-hero.svg'\n+++\n")
        self.write("static/images/synthetic-hero.svg", '<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><rect width="2" height="2" fill="red"/></svg>')
        self.write("content/_global/not-found.md", "+++\nfragment = '404'\ntitle = 'SYNTHETIC_NOT_FOUND_MARKER'\n+++\n")
        self.write("content/page/index.md", "+++\ntitle = 'Synthetic page'\n+++\n")
        self.write("content/page/content.md", "+++\nfragment = 'content'\n+++\nSYNTHETIC_PAGE_MARKER\n")
        self.write("content/section/_index.md", "+++\ntitle = 'Synthetic section'\n+++\n")
        self.write("content/section/_index/index.md", "+++\nheadless = true\n+++\n")
        self.write("content/section/_index/content.md", "+++\nfragment = 'content'\n+++\nSYNTHETIC_SECTION_MARKER\n")
        if generated_terms:
            config = self.root / "config.toml"
            config.write_text(config.read_text().replace(
                '\ndisableKinds = ["RSS", "sitemap", "taxonomy", "term", "taxonomyTerm"]',
                '\ndisableKinds = ["RSS", "sitemap", "taxonomy"]'))
            self.write("content/page/index.md", "+++\ntitle = 'Synthetic page'\ncategories = ['synthetic']\n+++\n")
        self.build("--themesDir", str(self.theme.parent), "--theme", self.theme.name, "--minify")
        home = (self.root / "public/index.html").read_text()
        page = (self.root / "public/page/index.html").read_text()
        section = (self.root / "public/section/index.html").read_text()
        self.assertIn("SYNTHETIC_HOME_MARKER", home)
        self.assertIn("SYNTHETIC_PAGE_MARKER", page)
        self.assertIn("SYNTHETIC_SECTION_MARKER", section)
        self.assertIn("navbar-toggler", home)
        self.assertIn("navbar-toggler", page)
        self.assertGreater(len(json.loads((self.root / "public/index.json").read_text())), 0)
        not_found = (self.root / "public/404.html").read_text()
        self.assertIn("navbar-toggler", not_found)
        self.assertIn("SYNTHETIC_GLOBAL_HERO_MARKER", not_found)
        self.assertIn("SYNTHETIC_NOT_FOUND_MARKER", not_found)
        self.assertIn("images/synthetic-hero.svg", not_found)
        self.assertIn("hero-particles particles-js", not_found)
        self.assertIn('window.syna.api.register("hero"', home)
        self.assertNotIn("SYNTHETIC_NOT_FOUND_MARKER", home)
        self.assertGreater(len(list((self.root / "public").glob("style*.css"))), 0)

        if generated_terms:
            term = self.root / "public/categories/synthetic/index.html"
            self.assertTrue(term.is_file())
            self.assertIn("<html", term.read_text())
            self.assertNotIn("SYNTHETIC_HOME_MARKER", term.read_text())

    def test_full_theme(self):
        self.full_theme()

    def test_generated_term_without_file(self):
        self.full_theme(generated_terms=True)


if __name__ == "__main__":
    OPTIONS = PARSER.parse_args()
    groups = {"language": FragmentLanguageTests, "paths": FragmentPathTests,
              "css": CssTests, "navigation": NavigationTests,
              "repositories": RepositoriesTests, "smoke": SmokeTests}
    classes = list(groups.values()) if OPTIONS.group == "all" else [groups[OPTIONS.group]]
    suite = unittest.TestSuite(unittest.defaultTestLoader.loadTestsFromTestCase(c) for c in classes)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    raise SystemExit(not result.wasSuccessful())
