import * as CSS from "csstype";
import { MotionProps } from 'framer-motion';
import * as Other from 'react';
declare global {
  type ResponsiveValue<T> = T | T[];
  type CSSPropertiesWithMultiValues = {
    [K in keyof CSS.Properties<number | string | 0>]: CSS.Properties<number | string | 0>[K] | Array<CSS.Properties<number | string | 0>[K]>
  }


  
  namespace React {
  //   type HTMLAttributesWithoutMotionProps<Attributes extends HTMLAttributes<Element>, Element extends HTMLElement> = {
  //     [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
  // };

  type Motion<T> = {  [K in Exclude<keyof MotionProps, keyof Other.HTMLAttributes<T>>]?: MotionProps[K] | null; }

  // export declare type HTMLMotionProps<TagName extends keyof ReactHTML> = HTMLAttributesWithoutMotionProps<UnwrapFactoryAttributes<ReactHTML[TagName]>, UnwrapFactoryElement<ReactHTML[TagName]>> & MotionProps;
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface HTMLAttributes<T> extends CSSPropertiesWithMultiValues, Motion<T> {
    }
  }

  // namespace JSX {
  //   interface IntrinsicElements {
  //     flex: Other.DetailedHTMLProps<
  //       Other.HTMLAttributes<HTMLDivElement>,
  //       HTMLDivElement
  //     >;
  //   }
  // }
}
