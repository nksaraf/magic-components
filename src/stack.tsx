import React from "react";
import { magic, createMagic } from "./magic";

import deepmerge from "deepmerge";

const mergeTwo = (a: any = {}, b: any = {}) => {
  // remove undefined values before merge
  Object.keys(a).forEach((key) => a[key] == undefined && delete a[key]);
  Object.keys(b).forEach((key) => b[key] == undefined && delete b[key]);

  return deepmerge(a, b);
};

const merge = (...objs: any[]) => {
  return objs.reduce(function (merged, currentValue) {
    return mergeTwo(merged, currentValue);
  }, {});
};

const Stack = ({
  inline,
  justify,
  align,
  direction,
  gap = 0,
  css,
  ...props
}: any) => {
  const styles: any = {
    display: inline ? "inline-flex" : "flex",
    // width: '100%', // causes weirdness in nested avatar. todo: debug
  };

  if (Array.isArray(direction)) {
    styles.flexDirection = direction.map((d) =>
      d === "vertical" ? "column" : "row"
    );
    styles["> *:not(:last-child)"] = direction.map((d) => ({
      [d === "vertical" ? "marginBottom" : "marginRight"]: gap,
      [d === "vertical" ? "marginRight" : "marginBottom"]: 0,
    }));
  } else {
    styles.flexDirection = direction === "vertical" ? "column" : "row";
    styles["> *:not(:last-child)"] = {
      [direction === "vertical" ? "marginBottom" : "marginRight"]: gap,
    };
  }

  return React.createElement(
    (magic as any).div,
    Object.assign({}, props, { css: merge(styles, css) })
  );
};

Stack.displayName = "Magic(stack)";
(magic as any)["stack"] = Stack;

const Row = Stack.bind({});
Row.displayName = "Magic(row)";
(Row as any).defaultProps = {
  direction: "horizontal",
};

(magic as any)["row"] = Row;

const Column = Stack.bind({});
Column.displayName = "Magic(column)";
(Column as any).defaultProps = {
  direction: "vertical",
};
(magic as any)["column"] = Column;

(magic as any)["grid"] = createMagic("div")(
  {
    display: "grid",
  },
  "grid"
);
