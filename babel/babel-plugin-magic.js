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
      // elements.includes(path.node.name.name) &&
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
