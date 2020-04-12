import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme";
import { elements } from "./dom";
import { hash, GOOBER_REGEX, sheet } from "./stylesheet";
import "./types";
import { allConfig } from "./style-config";
import { system } from "./system";
import { motionParser, deepParser } from "./motion";

export const cssParser = system(allConfig, "separate");

export const createMagic = (
  component:
    | string
    | React.FunctionComponent<{
        ref:
          | ((instance: unknown) => void)
          | React.MutableRefObject<unknown>
          | null;
        children: any;
        style: any;
        className: string | undefined;
      }>
) => (
  defaultStyles: any = {},
  displayName: string = typeof component === "string"
    ? component
    : component.displayName || component.name || "Component"
) => {
  const Magic = React.forwardRef(
    ({ children, className, as: asProp, css, ...props }: any, ref) => {
      // Grab a shallow copy of the props
      // _ctx.p: is the props sent to the context

      // Set a flag if the current components had a previous className
      // similar to goober. This is the append/prepend flag
      let append = GOOBER_REGEX.test(props.className);

      css = Object.assign({}, defaultStyles, css);
      const theme = useTheme();
      const [motionProps, otherProps] = motionParser(props, theme) as any;

      let remain = {};
      let computedClassName: string | undefined = undefined;
      if (
        Object.keys(otherProps).length === 0 &&
        Object.keys(css).length === 0
      ) {
        computedClassName = className;
      } else {
        const [themedCss, remaining] = cssParser(otherProps, theme);
        remain = remaining;
        if (css && Object.keys(css).length > 0) {
          const [cssStyles, others] = cssParser(css, theme);
          const otherstyles: any = {};
          for (var other in others) {
            if (typeof others[other] !== "object") {
              otherstyles[other] = others[other];
            } else {
              otherstyles[other] = deepParser(others[other], theme);
            }
          }
          Object.assign(themedCss, cssStyles, otherstyles);
        }
        if (Object.keys(themedCss).length > 0) {
          let magicClass = hash(themedCss, sheet, false, append);
          computedClassName = `${magicClass}${
            className ? ` ${className}` : ""
          }`;
        } else {
          computedClassName = className;
        }
      }

      return React.createElement(
        asProp || Object.keys(motionProps).length > 0
          ? typeof component === "string"
            ? (motion as any)[component]
            : motion.custom(component)
          : component,
        Object.assign({}, motionProps, remain, {
          ref,
          children,
          className: computedClassName,
        })
      );
    }
  );

  Magic.displayName = `Magic(${displayName})`;
  return Magic;
};

export const magic = createMagic;
elements.forEach((el) => {
  (magic as any)[el] = createMagic(el)();
});

// export const magic = baseMagic as unknown as typeof createMagic & { }
