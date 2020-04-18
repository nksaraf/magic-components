import { MotionProps } from "framer-motion";
import * as ReactTypes from "react";
import { ResponsiveCSSValue, StyleProps, ResponsiveValue } from "./style-config";

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



export type MotionProperties<T> = {
  [K in Exclude<keyof MotionProps, keyof ReactTypes.HTMLAttributes<T>>]?:
    | MotionProps[K]
    | null;
};

// export type StyleAliasProps = {
//   [K in Exclude<StylePropNames, keyof CSS.Properties<any>>]?: ResponsiveValue<
//     string | number | 0
//   >;
// };

declare global {
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
      extends StyleProps,
        MotionProperties<T> {
      css?: StyleProps & { [key: string]: StyleProps };
      as?: ReactTypes.ElementType<any> | string;
      noMotion?: boolean;
      props?: any
    }
  }

  interface MagicElements {
    stack?: Omit<
      ReactTypes.DetailedHTMLProps<
        ReactTypes.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "gap"
    > & {
      inline?: boolean;
      justify?: ResponsiveCSSValue<"justifyContent">;
      align?: ResponsiveCSSValue<"alignItems">;
      direction?: "horizontal" | "vertical";
      gap?: ResponsiveCSSValue<"marginRight"> | ResponsiveValue<string | number>;
    };
    flex?: ReactTypes.DetailedHTMLProps<
      ReactTypes.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    column?: ReactTypes.DetailedHTMLProps<
      ReactTypes.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    row?: ReactTypes.DetailedHTMLProps<
      ReactTypes.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    grid?: ReactTypes.DetailedHTMLProps<
      ReactTypes.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
  }
  namespace JSX {
    interface IntrinsicElements extends MagicElements {}
  }
}
