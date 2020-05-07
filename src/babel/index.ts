// @ts-nocheck
import { elements } from "../elements";

module.exports = function magicBabel(babel: any) {
  const { types: t } = babel;
  const importLocation = "magic-components";
  // const importLocation = "src";
  const namespace = "magic";
  const addMagicImport = (
    path: { findParent: (arg0: (p: any) => any) => any },
    that: {
      JSXOpeningElement?: (path: any) => void;
      JSXClosingElement?: (path: any) => void;
      imported?: any;
    }
  ) => {
    if (!that.imported) {
      const program = path.findParent((p: { isProgram: () => any }) =>
        p.isProgram()
      );
      program.node.body = [
        t.importDeclaration(
          [t.importSpecifier(t.identifier(namespace), t.identifier(namespace))],
          t.stringLiteral(importLocation)
        ),
        ...program.node.body,
      ];
      that.imported = true;
    }
  };
  const isLower = (char: string) => char === char.toLowerCase();
  const isDOMElement = (path: { node: { name: { name: string } } }) => {
    return (
      t.isJSXIdentifier(path.node.name) &&
      elements.includes(path.node.name.name) &&
      isLower(path.node.name.name.charAt(0))
    );
  };
  const namespacedElement = (path: { node: { name: { name: any } } }) => {
    return t.jsxMemberExpression(
      t.jsxIdentifier(namespace),
      t.jsxIdentifier(path.node.name.name.replace("-", ""))
    );
  };
  return {
    name: "magic", // not required
    pre(s: any) {
      this.imported = false;
    },
    visitor: {
      JSXOpeningElement(path: { node: { name: any } }) {
        if (isDOMElement(path)) {
          const attributes = path.get("attributes");
          let muggle = false;

          attributes.forEach((attr) => {
            if (attr.isJSXAttribute()) {
              const jsxName = attr.get("name");
              if (jsxName.isJSXIdentifier()) {
                const attrName = jsxName.get("name").node;
                if (attrName === "muggle" || attrName === "noMagic") {
                  muggle = true;
                  attr.remove();
                }
                if (path.node.name.name === "style" && attrName === "jsx") {
                  muggle = true;
                }
              }
            }
          });
          if (!muggle) {
            path.node.name = namespacedElement(path);
            addMagicImport(path, this);
            const closingElement = path.parentPath.get("closingElement");
            if (closingElement && closingElement.node) {
              closingElement.node.name = namespacedElement(closingElement);
            }
          }
        }
      },

      ImportDeclaration(path) {
        if (path.node.source.value === importLocation) {
          if (
            path.node.specifiers.find((spec) => spec.local.name === "magic")
          ) {
            this.imported = true;
          }
        }
      },
    },
  };
};

// Babel.registerPlugin("magic", babelMagic);
