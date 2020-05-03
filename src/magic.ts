import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme";
import { addCSS, MAGIC_REGEX, sheet } from "./stylesheet";
import "./style-config";
import { strictCssParser, linientCssParser } from "./parser";
import { motionParser } from "./motion";
import { MotionProps } from "framer-motion";
import * as ReactTypes from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { PropsWithAs, As, forwardRefWithAs } from "@reach/utils";
import { merge } from "./system";

declare global {
  namespace Magic {
    export interface CSSProp {
      css?: {
        [K in string]: CSSObject<K>;
      };
    }

    export interface MagicUtilityProps {
      noMotion?: boolean;
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

    export interface ComponentWithAs<ComponentType extends As, ComponentProps> {
      // <TT extends As>(
      //   props: PropsWithAs<TT, ComponentProps>
      // ): ReactTypes.ReactElement | null;
      (
        props: PropsWithAs<ComponentType, ComponentProps>
      ): ReactTypes.ReactElement | null;
      displayName?: string;
      // // propTypes?: React.WeakValidationMap<PropsWithAs<ComponentType, ComponentProps>>;
      // // contextTypes?: React.ValidationMap<any>;
      defaultProps?: any;
    }

    export type HTMLElement<T extends As> = ComponentProps<T>;

    export type JSXElements = {
      [K in Exclude<
        keyof JSX.IntrinsicElements,
        "style"
      >]: ReactTypes.ComponentType<JSX.IntrinsicElements[K]>;
    };

    export interface HTMLElements {}

    export interface MagicComponents extends JSXElements {
      // style: React.ElementType<StyleTagProps>;
      custom: typeof createMagic;
      // <ComponentType extends As>(
      //   Component: ComponentType,
      //   defaultProps?: any,
      //   displayName?: string
      // ) => ComponentWithAs<ComponentType, MagicProps>;
    }
  }

  namespace React {
    interface HTMLAttributes<T> extends Magic.HTMLProps<T> {}
  }

  namespace JSX {
    interface IntrinsicElements extends Magic.HTMLElements {}
  }
}

export const createMagic = <ComponentType extends As>(
  Component: ComponentType,
  defaultProps: any = {},
  // | Magic.ComponentProps<ComponentType>
  // | ((
  //     props: Magic.ComponentProps<ComponentType>
  //   ) => Magic.ComponentProps<ComponentType>) = {} as any,
  {
    displayName = typeof Component === "string"
      ? (Component as string)
      : typeof Component === "undefined"
      ? "Component"
      : (Component as any).displayName ||
        (Component as any).name ||
        "Component",
    forwardAs = false,
  } = {}
) => {
  if (!Component) {
    throw new Error();
  }

  const Magic = forwardRefWithAs<Magic.MagicProps, ComponentType>(
    (givenProps: Magic.ComponentProps<ComponentType>, ref) => {
      // Grab a shallow copy of the props
      // _ctx.p: is the props sent to the context
      // if noMagic from
      const { noMagic, muggle, ..._props } = givenProps;

      if (noMagic || muggle) {
        return React.createElement(Component as any, _props);
      }

      let magicProps: any;
      if (typeof defaultProps === "object") {
        magicProps = merge(defaultProps, _props);
      } else {
        magicProps = defaultProps(_props as any);
      }

      let {
        children,
        className,
        as: asProp,
        css,
        noMotion = false,
        asProps: normalProps,
        ...props
      } = magicProps;

      // Set a flag if the current components had a previous className
      // similar to goober. This is the append/prepend flag

      // test if given className is an old one, in which case we want to override
      // by appending at the top of the stylesheet
      let override = MAGIC_REGEX.test(magicProps.className);
      const theme = useTheme();

      // handle all framer-motion props, including style prop
      // other
      const [motionProps, nonMotionProps] = motionParser(props, theme) as any;

      let baseProps = {};
      let computedClassName: string | undefined = undefined;
      // if no css to process
      if (
        Object.keys(nonMotionProps).length === 0 &&
        (!css || Object.keys(css).length === 0)
      ) {
        computedClassName = className;
      } else {
        let propsCss = {};
        // handles all style props, except css prop
        let [stylePropsCss, remainingProps] = strictCssParser(
          nonMotionProps,
          theme
        );
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
              cssPropNestedCss[prop] = linientCssParser(
                nestedCssProps[prop],
                theme
              );
            }
          }
          propsCss = Object.assign(
            {},
            stylePropsCss,
            cssPropCss,
            cssPropNestedCss
          );
        }

        // if there was any css to process, generate className for it
        if (Object.keys(propsCss).length > 0) {
          let magicClass = addCSS(propsCss, sheet, false, override);
          computedClassName = `${magicClass}${
            className ? ` ${className}` : ""
          }`;
        } else {
          computedClassName = className;
        }
      }

      const baseComponent = asProp && !forwardAs ? asProp : Component;

      const toRender =
        Object.keys(motionProps).length > 0 && !noMotion
          ? typeof baseComponent === "string"
            ? (motion as any)[baseComponent]
            : motion.custom(baseComponent)
          : baseComponent;

      return React.createElement(
        toRender,
        Object.assign({}, motionProps, baseProps, normalProps, {
          ...(forwardAs && asProp ? { as: asProp } : {}),
          ref,
          children,
          className: computedClassName,
        })
      );
    }
  );

  hoistNonReactStatics(Magic, Component as any);
  Magic.displayName = `Magic(${displayName})`;
  return Magic as Magic.ComponentWithAs<ComponentType, Magic.MagicProps>;
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
