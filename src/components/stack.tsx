import { magic } from "../core/magic";

// import deepmerge from "deepmerge";

// const mergeTwo = (a: any = {}, b: any = {}) => {
//   // remove undefined values before merge
//   Object.keys(a).forEach((key) => a[key] == undefined && delete a[key]);
//   Object.keys(b).forEach((key) => b[key] == undefined && delete b[key]);

//   return deepmerge(a, b);
// };

// export const merge = (...objs: any[]) => {
//   return objs.reduce(function (merged, currentValue) {
//     return mergeTwo(merged, currentValue);
//   }, {});
// };

declare global {
  namespace Magic {
    interface HTMLElementProps {
      stack?: HTMLElement<"div">;
      flex?: HTMLElement<"div">;
      column?: HTMLElement<"div">;
      row?: HTMLElement<"div">;
      grid?: HTMLElement<"div">;
    }
  }
}

const transformer = ({ inline, direction, gap = 0, ...props }: any) => ({
  ...props,
  display: inline ? "inline-flex" : "flex",
  flexDirection: Array.isArray(direction)
    ? direction.map((d) => (d === "vertical" ? "column" : "row"))
    : direction === "vertical"
    ? "column"
    : "row",
  css: {
    "> *:not(:last-child)": Array.isArray(direction)
      ? direction.map((d) => ({
          [d === "vertical" ? "marginBottom" : "marginRight"]: gap,
          [d === "vertical" ? "marginRight" : "marginBottom"]: 0,
        }))
      : {
          [direction === "vertical" ? "marginBottom" : "marginRight"]: gap,
        },
  },
});

magic.stack = magic.custom("div", transformer, { displayName: "stack" });
magic.row = magic.custom(
  "div",
  (props: any) => transformer({ direction: "horizontal", ...props }),
  { displayName: "row" }
);

magic.column = magic.custom(
  "div",
  (props: any) => transformer({ direction: "vertical", ...props }),
  { displayName: "column" }
);
magic.grid = magic.custom("div", { display: "grid" }, { displayName: "grid" });
