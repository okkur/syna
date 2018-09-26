const fs = require("fs");
const path = require("path");
const paths = {
  root: path.resolve(`${__dirname}/..`),
  content: path.resolve(`${__dirname}/../exampleSite/content`),
  fragments: path.resolve(`${__dirname}/../exampleSite/content/fragments`),
  devColors: path.resolve(`${__dirname}/../exampleSite/content/dev/colors`)
};

const fragments = fs.readdirSync(paths.fragments).reduce((tmp, dir) => {
  if (["_index", "_index.md"].indexOf(dir) > -1) {
    return tmp;
  }

  const inside = fs.readdirSync(`${paths.fragments}/${dir}`);
  const fragments = inside
    .filter(
      file =>
        file.match(/\.md$/) &&
        file.indexOf("code-") === -1 &&
        file !== "index.md"
    )
    .reduce((tmp, file) => {
      tmp[file.replace(".md", "")] = `${paths.fragments}/${dir}/${file}`;
      return tmp;
    }, {});
  const nested = inside
    .filter(file =>
      fs.lstatSync(`${paths.fragments}/${dir}/${file}`).isDirectory()
    )
    .reduce((tmp, nDir) => {
      if (["_index", "_index.md"].indexOf(nDir) > -1) {
        return tmp;
      }

      tmp[nDir] = fs
        .readdirSync(`${paths.fragments}/${dir}/${nDir}`)
        .filter(file => file.indexOf("code-") === -1)
        .reduce((tmp, file) => {
          tmp[file] = `${paths.fragments}/${dir}/${nDir}/${file}`;
          return tmp;
        }, {});
      return tmp;
    }, {});
  tmp[dir] = {
    fragments,
    nested
  };
  return tmp;
}, {});

const backgrounds = ["white", "light", "secondary", "dark", "primary"];
const indexTemplate = `+++
title = "%fragment%"
fragment = "content"
weight = 100
+++

Different colors for %fragment% fragment

`;
if (!fs.existsSync(paths.devColors)) {
  const index = `+++
title = "Colors"
+++
`;
  const content = `+++
title = "Colors"
fragment = "content"
weight = 100
headless = true
+++
`;
  const list = `+++
fragment = "list"
weight = 110
section = "dev/colors"
count = 1000
summary = false
tiled = true
subsections = false
+++
`;

  fs.mkdirSync(paths.devColors);
  fs.mkdirSync(`${paths.devColors}/_index`);
  fs.writeFile(`${paths.devColors}/_index.md`, index, "utf-8", () => {});
  fs.writeFile(
    `${paths.devColors}/_index/index.md`,
    content,
    "utf-8",
    () => {}
  );
  fs.writeFile(`${paths.devColors}/_index/list.md`, list, "utf-8", () => {});
}

Object.keys(fragments).forEach((fragment, i) => {
  Object.keys(fragments[fragment].fragments).forEach(filename => {
    parseBlackFriday(
      fragment,
      fs.readFileSync(fragments[fragment].fragments[filename], "utf-8"),
      filename
    );
  });
  Object.keys(fragments[fragment].nested).forEach(dir => {
    const index = fragments[fragment].nested[dir]["index.md"];
    parseBlackFriday(fragment, fs.readFileSync(index, "utf-8"), "index", dir);
    Object.keys(fragments[fragment].nested[dir]).forEach(filename => {
      if (filename === "index.md") {
        return;
      }

      backgrounds.forEach(background => {
        fs.createReadStream(fragments[fragment].nested[dir][filename]).pipe(
          fs.createWriteStream(
            `${paths.devColors}/${fragment}/${dir}-${background}/${filename}`
          )
        );
      });
    });
  });
});

function parseBlackFriday(fragment, content, filename, dir) {
  if (!content.match(/background\s?=\s".*"/im)) {
    return;
  }

  if (!fs.existsSync(`${paths.devColors}/${fragment}`)) {
    fs.mkdirSync(`${paths.devColors}/${fragment}`);
  }
  if (dir && !fs.existsSync(`${paths.devColors}/${fragment}/${dir}`)) {
    backgrounds.forEach(background => {
      const path = `${paths.devColors}/${fragment}/${dir}-${background}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
    });
  }
  fs.writeFile(
    `${paths.devColors}/${fragment}/index.md`,
    indexTemplate.replace(/%fragment%/g, fragment),
    "utf-8",
    () => {}
  );

  backgrounds.forEach((background, i) => {
    const tmp = content
      .replace(/background\s?=\s".*"/im, `background = "${background}"`)
      .replace(/weight\s?=\s?"?\d+"?/im, `weight = ${110 + i * 10}`);
    fs.writeFile(
      `${paths.devColors}/${fragment +
        (dir ? `/${dir}-${background}` : "")}/${filename +
        (dir ? "" : `-${background}`)}.md`,
      tmp,
      "utf-8",
      () => {}
    );
  });
}
