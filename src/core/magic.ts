import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../theme";
import { addCSS, MAGIC_REGEX, sheet } from "../stylesheet";
import { strictCssParser, linientCssParser } from "./css-parser";
import { motionParser } from "./motion-parser";
import { MotionProps } from "framer-motion";
import * as ReactTypes from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import {
  PropsWithAs,
  As,
  forwardRefWithAs,
  ComponentWithAs,
} from "@reach/utils";
import deepmerge from "deepmerge";

declare global {
  namespace Magic {
    export interface CSSProp {
      css?: StyleProps & {
        [K: string]: StyleProps | ResponsiveValue<string | number | undefined>;
      };
    }

    export interface MagicUtilityProps {
      noMagic?: boolean;
      asProps?: any;
      muggle?: boolean;
    }

    export type HTMLProps<T> = StyleProps &
      Omit<MotionProps, keyof ReactTypes.HTMLAttributes<T> | keyof StyleProps> &
      MagicUtilityProps &
      CSSProp & {
        as?: any;
      };

    export type MagicProps = StyleProps &
      Omit<MotionProps, keyof StyleProps> &
      MagicUtilityProps &
      CSSProp;

    export type ComponentProps<T extends As> = PropsWithAs<T, MagicProps>;
    export type Component<T extends As> = ComponentWithAs<T, MagicProps>;

    // export type HTMLElement<T> = ReactTypes.DetailedHTMLProps<
    //   ReactTypes.HTMLAttributes<T>,
    //   T
    // >;

    // export interface ComponentWithAs<ComponentType extends As, ComponentProps> {
    //   // <TT extends As>(
    //   //   props: PropsWithAs<TT, ComponentProps>
    //   // ): ReactTypes.ReactElement | null;
    //   (
    //     props: PropsWithAs<ComponentType, ComponentProps>
    //   ): ReactTypes.ReactElement | null;
    //   displayName?: string;
    //   // // propTypes?: React.WeakValidationMap<PropsWithAs<ComponentType, ComponentProps>>;
    //   // // contextTypes?: React.ValidationMap<any>;
    //   defaultProps?: any;
    // }

    export type HTMLElement<T extends As> = ComponentProps<T>;

    export interface HTMLElementProps {}

    export type JSXElements = {
      [K in Exclude<
        keyof ReactTypes.ReactHTML,
        "style"
      >]: ReactTypes.ReactHTML[K];
    };

    export type CustomJSXElements = {
      [K in keyof HTMLElementProps]: ReactTypes.ComponentType<
        HTMLElementProps[K]
      >;
    };

    export interface MagicComponents
      extends Omit<JSXElements, keyof HTMLElementProps>,
        CustomJSXElements {
      // style: React.ElementType<StyleTagProps>;
      custom: typeof createMagic;
      // <ComponentType extends As>(
      //   Component: ComponentType,
      //   defaultProps?: any,
      //   displayName?: string
      // ) => ComponentWithAs<ComponentType, MagicProps>;
    }

    export type NewJSXElements = Omit<HTMLElementProps, keyof JSXElements>;
  }

  namespace React {
    interface HTMLAttributes<T> extends Magic.HTMLProps<T> {}
  }

  namespace JSX {
    interface IntrinsicElements extends Magic.NewJSXElements {}
  }
}

export const createMagic = <ComponentType extends As>(
  Component: ComponentType,
  defaultProps: any = {},
  {
    displayName = typeof Component === "string"
      ? (Component as string)
      : typeof Component === "undefined"
      ? "Component"
      : (Component as any).displayName ||
        (Component as any).name ||
        "Component",
    forwardAs = false,
    getTheme = useTheme,
    beforeParseCSS = parseMotionProps,
    wrapComponent = wrapMotionComponent,
    processCSS = createClassName,
  } = {}
) => {
  if (!Component) {
    throw new Error();
  }

  const MagicComponent = wrapComponent ? wrapComponent(Component) : Component;

  const Magic = forwardRefWithAs<Magic.MagicProps, ComponentType>(
    (givenProps: Magic.ComponentProps<ComponentType>, ref) => {
      // if noMagic from
      const { noMagic, muggle, ..._props } = givenProps;

      if (noMagic || muggle) {
        return React.createElement(Component as any, _props);
      }

      let magicProps: any;
      console.log(defaultProps, _props);
      if (typeof defaultProps === "object") {
        magicProps = deepmerge(defaultProps, _props as any);
        console.log(magicProps);
      } else {
        magicProps = defaultProps(_props as any);
      }

      let {
        children,
        as: asProp,
        asProps: asPropForwards,
        ...props
      } = magicProps;

      const baseComponent = asProp && !forwardAs ? asProp : MagicComponent;

      const theme = getTheme();

      // handle all framer-motion props, including style prop
      // other
      const {
        forwardProps: preCSSForwards,
        unProcessedProps: cssPropsToParse,
      } = beforeParseCSS(props, theme) as any;

      const { forwardProps: cssForwards, unProcessedProps } = parseCSSProps(
        cssPropsToParse,
        theme,
        processCSS
      );

      return React.createElement(
        baseComponent,
        Object.assign(
          {},
          unProcessedProps,
          preCSSForwards,
          cssForwards,
          asPropForwards,
          {
            ...(forwardAs && asProp ? { as: asProp } : {}),
            ref,
            children,
          }
        )
      );
    }
  );

  hoistNonReactStatics(Magic, Component as any);
  Magic.displayName = `Magic(${displayName})`;
  return Magic as ComponentWithAs<ComponentType, Magic.MagicProps>;
};

export const createClassName = (
  styles: any,
  nestedStyles,
  { className, ...props }: any
) => {
  let override = MAGIC_REGEX.test(className);

  if (Object.keys(styles).length > 0 || Object.keys(nestedStyles).length > 0) {
    let magicClass = addCSS(
      { ...styles, ...nestedStyles },
      sheet,
      false,
      override
    );
    return { className: `${magicClass}${className ? ` ${className}` : ""}` };
  } else {
    return { className };
  }
};

export const createSXProp = (
  styles: any,
  nestedStyles,
  { sx, ...props }: any
) => {
  if (Object.keys(styles).length > 0 || Object.keys(nestedStyles).length > 0) {
    return { sx: { ...sx, ...styles, ...nestedStyles } };
  } else {
    return { sx };
  }
};

export const wrapMotionComponent = (Component) => {
  return typeof Component === "string"
    ? (motion as any)[Component]
    : motion.custom(Component);
};

export const createStyleProp = (
  styles: any,
  nestedStyles,
  { style, ...props }: any
) => {
  if (Object.keys(styles).length > 0) {
    return { style: { ...style, ...styles } };
  } else {
    return { style };
  }
};

export const createStyleConfig = (root) => (
  styles: any,
  nestedStyles,
  { styleConfig, ...props }: any
) => {
  console.log(styles, nestedStyles);
  if (Object.keys(styles).length > 0 || Object.keys(nestedStyles).length > 0) {
    return {
      styleConfig: deepmerge(styleConfig, {
        base: { [root]: { ...styles }, ...nestedStyles },
      }),
    };
  } else {
    return { styleConfig };
  }
};

export const parseMotionProps = (propsToProcess: any, theme: any) => {
  const [motionProps, nonMotionProps] = motionParser(propsToProcess, theme);
  return { forwardProps: motionProps, unProcessedProps: nonMotionProps };
};

export const parseCSSProps = (
  propsToProcess: any,
  theme: any,
  processCSS: any
) => {
  const { css, ...props } = propsToProcess;
  let baseProps = {};
  if (
    Object.keys(props).length === 0 &&
    (!css || Object.keys(css).length === 0)
  ) {
    return { unProcessedProps: props };
  } else {
    let styles = {};
    let nestedStyles = {};
    // handles all style props, except css prop
    let [stylePropsCss, remainingProps] = strictCssParser(props, theme);
    baseProps = remainingProps;
    styles = stylePropsCss;
    // if css prop has anything
    if (css && Object.keys(css).length > 0) {
      // handle top level css declarations
      const [cssPropCss, nestedCssProps] = strictCssParser(css, theme);
      const cssPropNestedCss: any = {};
      for (var prop in nestedCssProps) {
        if (typeof nestedCssProps[prop] !== "object") {
          cssPropNestedCss[prop] = nestedCssProps[prop];
        } else {
          cssPropNestedCss[prop] = linientCssParser(
            nestedCssProps[prop],
            theme
          );
        }
      }

      styles = Object.assign({}, stylePropsCss, cssPropCss);
      nestedStyles = cssPropNestedCss;
    }

    return {
      unProcessedProps: baseProps,
      forwardProps: processCSS(styles, nestedStyles, props),
    };
  }
};

export const magic: Magic.MagicComponents = {
  custom: createMagic,
} as any;

export const addMagicComponent = (name: string, Component: any) => {
  if (name.indexOf("-") >= 0) {
    (magic as any)[name.replace("-", "")] = Component;
  }

  (magic as any)[name] = Component;
  Component.displayName = `Magic(${name})`;
};

export const themed = (props, theme) => {
  return linientCssParser(props, theme);
};
