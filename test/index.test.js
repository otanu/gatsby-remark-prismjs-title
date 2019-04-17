const remark = require("remark");
const cheerio = require("cheerio");
const gatsbyRemarkCodeTitles = require("../index");

//
test("with title", () => {
  const tree = remark().parse(`
# head

\`\`\`js:title=test.js
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const titleNode = ret.children[1];
  const codeNode = ret.children[2];
  const $ = cheerio.load(titleNode.value);

  expect(titleNode.type).toBe("html");
  expect($("span", ".gatsby-code-title").text()).toBe("test.js");
  expect(codeNode.lang).toBe("js");
});

//
test("with title and line highlight", () => {
  const tree = remark().parse(`
# head

\`\`\`js{1,3-5}:title=test.js
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const titleNode = ret.children[1];
  const codeNode = ret.children[2];
  const $ = cheerio.load(titleNode.value);

  expect(titleNode.type).toBe("html");
  expect($("span", ".gatsby-code-title").text()).toBe("test.js");
  expect(codeNode.lang).toBe("js{1,3-5}");
});

//
test("with title and line no", () => {
  const tree = remark().parse(`
# head

\`\`\`js{numberLines: true}:title=test.js
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const titleNode = ret.children[1];
  const codeNode = ret.children[2];
  const $ = cheerio.load(titleNode.value);
  expect(titleNode.type).toBe("html");
  expect($("span", ".gatsby-code-title").text()).toBe("test.js");
  expect(codeNode.lang).toBe("js{numberLines: true}");
});

//
test("with title and line highlight and line no", () => {
  const tree = remark().parse(`
# head

\`\`\`js{numberLines: true}{1,3-5}:title=test.js
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const titleNode = ret.children[1];
  const codeNode = ret.children[2];
  const $ = cheerio.load(titleNode.value);
  expect(titleNode.type).toBe("html");
  expect($("span", ".gatsby-code-title").text()).toBe("test.js");
  expect(codeNode.lang).toBe("js{numberLines: true}{1,3-5}");
});

test("No title", () => {
  const tree = remark().parse(`
# head

\`\`\`js
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const codeNode = ret.children[1];

  expect(codeNode.lang).toBe("js");
});

//
test("no title and line highlight", () => {
  const tree = remark().parse(`
# head

\`\`\`js{1,3-5}
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const codeNode = ret.children[1];
  expect(codeNode.lang).toBe("js{1,3-5}");
});

//
test("no title and line no", () => {
  const tree = remark().parse(`
# head

\`\`\`js{numberLines: true}
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const codeNode = ret.children[1];
  expect(codeNode.lang).toBe("js{numberLines: true}");
});

//
test("no title and line highlight and line no", () => {
  const tree = remark().parse(`
# head

\`\`\`js{numberLines: true}{1,3-5}
function example() {
  console.log("example);
}
\`\`\`
`);

  const ret = gatsbyRemarkCodeTitles({ markdownAST: tree }, {});
  const codeNode = ret.children[1];
  expect(codeNode.lang).toBe("js{numberLines: true}{1,3-5}");
});
