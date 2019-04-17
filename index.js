"use strict";

const visit = require("unist-util-visit");

const titlePrefix = ":title="

module.exports = function gatsbyRemarkCodeTitles(_ref, pluginOptions) {
  const markdownAST = _ref.markdownAST;
  const customClassName = pluginOptions.className;
  visit(markdownAST, "code", (node, index) => {
    const lang = node.lang || "";
    const separatorIndex = lang.lastIndexOf(titlePrefix);
    if (separatorIndex === -1) {
      return;
    }

    const newLang = lang.slice(0, separatorIndex);
    const title = lang.slice(separatorIndex + titlePrefix.length);

    const className = ["gatsby-code-title"].concat(customClassName || []);
    const titleNode = {
      type: "html",
      value: `
        <div class="${className.join(" ").trim()}">
          <span>${title}</span>
        </div>
       `
    };

    markdownAST.children.splice(index, 0, titleNode);
    node.lang = newLang;
  });
  return markdownAST;
};
