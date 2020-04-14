import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme";
import { elements } from "./dom";
import { hash, GOOBER_REGEX, sheet } from "./stylesheet";
import "./types";
import { allConfig } from "./style-config";
import { system } from "./system";
import { motionParser, deepParser as linientCssParser } from "./motion";

export const strictCssParser = system(allConfig, "separate");

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
  defaultCss: any = {},
  displayName: string = typeof component === "string"
    ? component
    : component.displayName || component.name || "Component"
) => {
  const Magic = React.forwardRef(
    ({ children, className, as: asProp, css, motion:  allowMotion = true, ...props }: any, ref) => {
      // Grab a shallow copy of the props
      // _ctx.p: is the props sent to the context

      // Set a flag if the current components had a previous className
      // similar to goober. This is the append/prepend flag

      // test if given className is an old one, in which case we want to override
      // by appending at the top of the stylesheet
      let override = GOOBER_REGEX.test(className);

      // override defaultStyles with given css prop
      css = Object.assign({}, defaultCss, css);

      const theme = useTheme();

      // handle all framer-motion props, including style prop
      // other
      const [motionProps, nonMotionProps] = motionParser(props, theme) as any;

      let baseProps = {};
      let computedClassName: string | undefined = undefined;
      // if no css to process
      if (
        Object.keys(nonMotionProps).length === 0 &&
        Object.keys(css).length === 0
      ) {
        computedClassName = className;
      } else {
        let propsCss = {};
        // handles all style props, except css prop
        let [stylePropsCss, remainingProps] = strictCssParser(nonMotionProps, theme);
        baseProps = remainingProps;
        propsCss = stylePropsCss;
        // if css prop has anything
        if (css && Object.keys(css).length > 0) {
          // handle top level css declarations
          const [cssPropCss, nestedCssProps] = strictCssParser(css, theme);
          const cssPropNestedCss: any = {};
          for (var prop in nestedCssProps) {
            if (typeof nestedCssProps[prop] !== "object") {
              cssPropNestedCss[prop] = nestedCssProps[prop];
            } else {
              cssPropNestedCss[prop] = linientCssParser(nestedCssProps[prop], theme);
            }
          }
          propsCss = Object.assign({}, stylePropsCss, cssPropCss, cssPropNestedCss);
        }

        // if there was any css to process, generate className for it
        if (Object.keys(propsCss).length > 0) {
          let magicClass = hash(propsCss, sheet, false, override);
          computedClassName = `${magicClass}${
            className ? ` ${className}` : ""
          }`;
        } else {
          computedClassName = className;
        }
      }

      const baseComponent = asProp ? asProp : component;

      const toRender = Object.keys(motionProps).length > 0 && allowMotion
      ? typeof baseComponent === "string"
        ? (motion as any)[baseComponent]
        : motion.custom(baseComponent)
      : baseComponent;
      return React.createElement(
        toRender,
        Object.assign({}, motionProps, baseProps, {
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
