# Hugo compatibility regression tests

These tests use Python 3's standard library and an explicitly selected Hugo
binary. They do not install dependencies, rebuild JavaScript, or use any private
website. All content, configuration, and remote API responses are synthetic.

Run the complete suite with Hugo Extended:

```sh
python3 _tests/hugo-compat/test_compatibility.py --hugo /absolute/path/to/hugo
```

Use `--group language`, `paths`, `css`, `navigation`, `repositories`, or `smoke`
to review each fix separately. Use `--theme-root /path/to/unmodified/syna` to
check a regression against the original source. `--artifacts /new/output/path`
preserves generated fixtures, exact build commands, output, and build logs;
without it, temporary directories are removed at the end of each test.

The repository tests bind a short-lived HTTP server to `127.0.0.1` on an
automatically selected port. Only in the temporary fixture, they replace the
fixed GitHub API origin with this local origin. Hugo's HTTP allowlist is
restricted to that exact local endpoint. No requests are sent to GitHub.
Environments that prohibit binding or contacting localhost must allow this
group separately; such failures are environment errors, not passing tests.

Coverage:

- Language-specific page fragments, default-language global fallback, local
  precedence, the headless `_index/index` bundle, and global fragments on
  generated 404 pages that have no backing content file.
- The actual theme head partial in development and production, including Sass,
  minification, and fingerprint references. PostCSS is deliberately not enabled:
  it needs separately installed `postcss` / `postcss-cli` dependencies.
- Navigation with one and two languages.
- Repository sorting, count, fork exclusion, allowlist, empty results, HTTP
  404/500, and invalid JSON.
- A complete synthetic theme build with actual theme assets, HTML and search
  JSON, homepage and section fragments, a regular page, navigation, and a 404
  page with global navigation, a hero with an image and particles enabled,
  and the not-found fragment. A generated term page without file metadata is
  also built; this checks that it does not crash, not that it lists articles.

The reviewed suite contains 17 tests and was run with Homebrew's Hugo 0.168.0
(`extended+withdeploy`, darwin/arm64, build date 2026-10-13). This is the exact
tested version, not a claim about the newest Hugo release. The repository
fragment uses `resources.GetRemote` (available since Hugo 0.91.0); `theme.toml`
declares that API requirement. Hugo 0.91.0 and intermediate versions have not
been validated by this review. Earlier, smaller test fixtures were exercised
with Hugo 0.88.1 Extended; that does not establish support for the final suite
or the complete theme on that version.

The public example was also built with its production and development configs,
prebuilt theme assets, `DEMO_MODE=true`, and `--minify`. Both raw builds fail
on the existing documentation reference `/global-variables` in
`exampleSite/content/fragments/items/docs.md`; the target actually lives below
`/docs`. Both builds complete when a temporary additional config sets
`refLinksErrorLevel = "WARNING"`. That diagnostic override leaves a broken
documentation link and is not a passing unmodified example build. The content
fix is outside this compatibility change. The example configs explicitly
allow the existing `DEMO_MODE` variable through Hugo's environment policy;
other sites using this switch need the same `[security.funcs]` allowlist.

These tests use bundled LibSass in Hugo Extended. Optional PostCSS, a JavaScript
rebuild, the legacy Cypress workflow, and browser behavior were not validated.
The example calls GitHub's public API and needs network access; synthetic
regressions use only localhost. No private website content is required.

The suite does not suppress deprecation warnings or validate browser behavior.
Remaining warnings (including LibSass, `.Page.Sites`, `.Site.Languages`, and `.Site.LanguageCode`)
should be assessed separately from these compatibility fixes.
