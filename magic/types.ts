import * as CSS from "csstype";

declare global {
  type ResponsiveValue<T> = T | T[];
  type CSSPropertiesWithMultiValues = {
    [K in keyof CSS.Properties<number | string | 0>]: CSS.Properties<number | string | 0>[K] | Array<CSS.Properties<number | string | 0>[K]>
  }
  
  namespace React {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface HTMLAttributes<T> extends CSSPropertiesWithMultiValues {
      whileHover?: any
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
