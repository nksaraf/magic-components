const elements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  // "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  // "meta",
  "meter",
  "nav",
  // "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "svg",
  "samp",
  // "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  // "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "webview",
  "stack",
  "flex",
  "row",
  "column",
  "grid"
];

module.exports = function babelMagic(babel) {
  const { types: t } = babel;
  const importLocation = "magic-components";
  // const importLocation = "src";
  const namespace = "magic";
  const addMagicImport = (path, that) => {
    if (!that.imported) {
      const program = path.findParent((p) => p.isProgram());
      program.node.body = [
        t.importDeclaration(
          [
            t.importSpecifier(
              t.identifier(namespace),
              t.identifier(namespace)
            )
          ],
          t.stringLiteral(importLocation)
        ),
        ...program.node.body
      ];
      that.imported = true;
    }
  };
  const isLower = (char) => char === char.toLowerCase();
  const isDOMElement = (path) => {
    return (
      t.isJSXIdentifier(path.node.name) &&
      elements.includes(path.node.name.name) &&
      isLower(path.node.name.name.charAt(0))
    );
  };
  const namespacedElement = (path) => {
    return t.jsxMemberExpression(
      t.jsxIdentifier(namespace),
      t.jsxIdentifier(path.node.name.name)
    );
  };
  return {
    name: "magic", // not required
    pre(s) {
      this.imported = false;
    },
    visitor: {
      JSXOpeningElement(path) {
        if (isDOMElement(path)) {
          path.node.name = namespacedElement(path);
          addMagicImport(path, this);
        }
      },
      JSXClosingElement(path) {
        if (isDOMElement(path)) {
          path.node.name = namespacedElement(path);
        }
      }
    }
  };
}

// Babel.registerPlugin("magic", babelMagic);
