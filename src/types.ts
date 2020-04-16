import * as CSS from "csstype";
import { MotionProps } from "framer-motion";
import * as Other from "react";
import { StyleProps } from "./style-config";

export type AdvancedPseudos =
  | "&:-moz-any()"
  | "&:-moz-dir"
  | "&:-webkit-any()"
  | "&::cue"
  | "&::cue-region"
  | "&::part"
  | "&::slotted"
  | "&:dir"
  | "&:has"
  | "&:host"
  | "&:host-context"
  | "&:is"
  | "&:lang"
  | "&:matches()"
  | "&:not"
  | "&:nth-child"
  | "&:nth-last-child"
  | "&:nth-last-of-type"
  | "&:nth-of-type"
  | "&:where";

export type SimplePseudos =
  | "&:-khtml-any-link"
  | "&:-moz-any-link"
  | "&:-moz-focusring"
  | "&:-moz-full-screen"
  | "&:-moz-placeholder"
  | "&:-moz-read-only"
  | "&:-moz-read-write"
  | "&:-ms-fullscreen"
  | "&:-ms-input-placeholder"
  | "&:-webkit-any-link"
  | "&:-webkit-full-screen"
  | "&::-moz-placeholder"
  | "&::-moz-progress-bar"
  | "&::-moz-range-progress"
  | "&::-moz-range-thumb"
  | "&::-moz-range-track"
  | "&::-moz-selection"
  | "&::-ms-backdrop"
  | "&::-ms-browse"
  | "&::-ms-check"
  | "&::-ms-clear"
  | "&::-ms-fill"
  | "&::-ms-fill-lower"
  | "&::-ms-fill-upper"
  | "&::-ms-input-placeholder"
  | "&::-ms-reveal"
  | "&::-ms-thumb"
  | "&::-ms-ticks-after"
  | "&::-ms-ticks-before"
  | "&::-ms-tooltip"
  | "&::-ms-track"
  | "&::-ms-value"
  | "&::-webkit-backdrop"
  | "&::-webkit-input-placeholder"
  | "&::-webkit-progress-bar"
  | "&::-webkit-progress-inner-value"
  | "&::-webkit-progress-value"
  | "&::-webkit-slider-runnable-track"
  | "&::-webkit-slider-thumb"
  | "&::after"
  | "&::backdrop"
  | "&::before"
  | "&::cue"
  | "&::cue-region"
  | "&::first-letter"
  | "&::first-line"
  | "&::grammar-error"
  | "&::marker"
  | "&::placeholder"
  | "&::selection"
  | "&::spelling-error"
  | "&:active"
  | "&:after"
  | "&:any-link"
  | "&:before"
  | "&:blank"
  | "&:checked"
  | "&:default"
  | "&:defined"
  | "&:disabled"
  | "&:empty"
  | "&:enabled"
  | "&:first"
  | "&:first-child"
  | "&:first-letter"
  | "&:first-line"
  | "&:first-of-type"
  | "&:focus"
  | "&:focus-visible"
  | "&:focus-within"
  | "&:fullscreen"
  | "&:hover"
  | "&:in-range"
  | "&:indeterminate"
  | "&:invalid"
  | "&:last-child"
  | "&:last-of-type"
  | "&:left"
  | "&:link"
  | "&:only-child"
  | "&:only-of-type"
  | "&:optional"
  | "&:out-of-range"
  | "&:placeholder-shown"
  | "&:read-only"
  | "&:read-write"
  | "&:required"
  | "&:right"
  | "&:root"
  | "&:scope"
  | "&:target"
  | "&:valid"
  | "&:visited";

declare global {
  type ResponsiveValue<T> = T | T[];

  type CSSMutliValue<K extends keyof CSS.Properties> = ResponsiveValue<
    CSS.Properties<number | string | 0>[K]
  >;
  type CSSPropertiesWithMultiValues = {
    [K in keyof CSS.Properties<number | string | 0>]: CSSMutliValue<K>;
  };

  type Motion<T> = {
    [K in Exclude<keyof MotionProps, keyof Other.HTMLAttributes<T>>]?:
      | MotionProps[K]
      | null;
  };

  type CSSProps = {
    [K in keyof CSS.Properties<any>]?: CSSMutliValue<K>;
  };

  type HTMLStyleProps = {
    [K in Exclude<StyleProps, keyof CSS.Properties<any>>]?:
      | string
      | number
      | string[]
      | number[];
  };

  // export type As = Other.ElementType<any>;
  // export type PropsOf<T extends As> = Other.ComponentPropsWithRef<T>;
  // export type PropsWithAs<P, T extends As> = P &
  //   Omit<PropsOf<T>, "as" | keyof P> & {
  //     as?: T;
  //   };

  // export interface MagicComponentProps<T>
  //   extends CSSPropertiesWithMultiValues,
  //     Motion<T>,
  //     HTMLStyleProps {
  //   css?: CSSProps & { [key in SimplePseudos | AdvancedPseudos]?: CSSProps };
  //   as?: Other.ElementType<any> | string;
  // }

  // export type MagicComponent<T extends As, P> =
  //   | ((
  //       props: PropsOf<T> & P & MagicComponentProps & { as?: As }
  //     ) => JSX.Element)
  //   | (<TT extends As = T>(
  //       props: PropsWithAs<PropsOf<T>, TT> & ChakraProps & P
  //     ) => JSX.Element);

  namespace React {
    interface HTMLAttributes<T>
      extends CSSPropertiesWithMultiValues,
        Motion<T>,
        HTMLStyleProps {
      css?: CSSProps & { [key in SimplePseudos | AdvancedPseudos]?: CSSProps };
      as?: Other.ElementType<any> | string;
      noMotion?: boolean;
    }
  }

  interface MoreJSX {
    stack?: Omit<
      Other.DetailedHTMLProps<
        Other.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "gap"
    > & {
      inline?: boolean;
      justify?: CSSMutliValue<"justifyContent">;
      align?: CSSMutliValue<"alignItems">;
      direction?: "horizontal" | "vertical";
      gap?: CSSMutliValue<"marginRight"> | ResponsiveValue<number>;
    };
    flex?: Other.DetailedHTMLProps<
      Other.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    column?: Other.DetailedHTMLProps<
      Other.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    row?: Other.DetailedHTMLProps<
      Other.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    grid?: Other.DetailedHTMLProps<
      Other.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
  }
  namespace JSX {
    interface IntrinsicElements extends MoreJSX {}
  }
}
