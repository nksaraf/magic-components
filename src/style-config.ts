import * as CSS from "csstype";
import { get, createParser } from "./system";

export interface ConfigStyle {
  /**
   * The CSS property to use in the returned style object
   * (overridden by `properties` if present).
   */
  property?: keyof CSS.Properties;
  /**
   * An array of css properties (e.g. `['marginLeft', 'marginRight']`)
   * the prop maps to.
   */
  properties?: Array<keyof CSS.Properties>;
  /**
   * A reference to theme scale for this property or properties.
   */
  scale?: string;
  /**
   * A fallback scale object if scale is not found
   * in theme
   */
  fallbackScale?: any;
  /**
   * A function to transform the raw value based on the scale.
   */
  transform?: (value: any, scale?: any) => any;
}

export type Config = null | true | ConfigStyle;

export type ConfigObject = { [prop: string]: Config };

export function positiveOrNegativePx(value: string | number, scale: any) {
  if (typeof value !== "number" || value >= 0) {
    const n = get(scale, String(value), String(value));
    if (typeof n === "string") return n;
    return n + "px";
  }
  const absolute = Math.abs(value);
  const n: any = get(scale, String(absolute), String(absolute));
  if (typeof n === "string") return "-" + n;
  return n * -1 + "px";
}

export function px(value: string | number, scale: any) {
  const n = get(scale, String(value), String(value));
  if (typeof n === "string") return n;
  return n + "px";
}

const defaults = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

export const background = {
  bg: {
    property: "background",
    scale: "colors",
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors",
  },
  background: {
    property: "background",
    scale: "colors",
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors",
  },
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  bgImage: {
    property: "backgroundImage",
  },
  bgSize: {
    property: "backgroundSize",
  },
  bgPosition: {
    property: "backgroundPosition",
  },
  bgRepeat: {
    property: "backgroundRepeat",
  },
  bgAttachment: {
    property: "backgroundAttachment",
  },
};

export const border = {
  border: {
    property: "border",
    scale: "borders",
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths",
    transform: px,
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles",
  },
  borderColor: {
    property: "borderColor",
    scale: "colors",
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii",
    transform: px,
  },
  borderTop: {
    property: "borderTop",
    scale: "borders",
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii",
    transform: px,
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii",
    transform: px,
  },
  borderRight: {
    property: "borderRight",
    scale: "borders",
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders",
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii",
    transform: px,
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii",
    transform: px,
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders",
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders",
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders",
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths",
    transform: px,
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors",
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles",
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths",
    transform: px,
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors",
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles",
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths",
    transform: px,
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors",
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles",
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths",
    transform: px,
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors",
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles",
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii",
    transform: px,
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
    transform: px,
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
    transform: px,
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
    transform: px,
  },
};

export const color = {
  color: {
    property: "color",
    scale: "colors",
  },
  textColor: {
    property: "color",
    scale: "colors",
  },
  opacity: true,
  fill: {
    property: "fill",
    scale: "colors",
  },
  stroke: {
    property: "stroke",
    scale: "colors",
  },
  outline: true,
  outlineOffset: true,
  outlineColor: {
    property: "outlineColor",
    scale: "colors",
  },
};

export const typography = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts",
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes",
    fallbackScale: defaults.fontSizes,
    transform: px,
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights",
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights",
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings",
    transform: px,
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: { property: "textDecoration" },
  textDecor: { property: "textDecoration" },
};

export const flexbox = {
  alignItems: true,
  alignContent: true,
  align: {
    property: 'alignItems'
  },
  justifyItems: true,
  justifyContent: true,
  justify: {
    property: 'justifyContent'
  },
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: "flexBasis",
    scale: "sizes",
    transform: px,
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
  flexDir: {
    property: "flexDirection",
  },
};

export const grid = {
  gridGap: {
    property: "gridGap",
    scale: "space",
    fallbackScale: defaults.space,
    transform: px,
  },
  gridColumnGap: {
    property: "gridColumnGap",
    scale: "space",
    fallbackScale: defaults.space,
    transform: px,
  },
  gridRowGap: {
    property: "gridRowGap",
    scale: "space",
    fallbackScale: defaults.space,
    transform: px,
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true,
};

// function transformPercentageOrPx(value: any, scale: any) {
//   if (typeof value === "number" && value <= 1) {

//   }
//   const defaultValue =
//     !(typeof value === "number") || value > 1 ? px(value, scale) : value * 100 + "%";
//   return get(scale, value, defaultValue);
// }

export const layout = {
  width: {
    property: "width",
    scale: "sizes",
    transform: px,
  },
  w: {
    property: "width",
    scale: "sizes",
    transform: px,
  },
  height: {
    property: "height",
    scale: "sizes",
    transform: px,
  },
  h: {
    property: "height",
    scale: "sizes",
    transform: px,
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes",
    transform: px,
  },
  minW: {
    property: "minWidth",
    scale: "sizes",
    transform: px,
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes",
    transform: px,
  },
  minH: {
    property: "minHeight",
    scale: "sizes",
    transform: px,
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes",
    transform: px,
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes",
    transform: px,
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes",
    transform: px,
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes",
    transform: px,
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
};

export const others = {
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  transition: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true,
  listStyleType: true,
  listStylePosition: true,
  listStyleImage: true,
};

export const position = {
  position: true,
  pos: {
    property: "position",
  },
  zIndex: {
    property: "zIndex",
    scale: "zIndices",
  },
  top: {
    property: "top",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegativePx,
  },
  right: {
    property: "right",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegativePx,
  },
  bottom: {
    property: "bottom",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegativePx,
  },
  left: {
    property: "left",
    scale: "space",
    fallbackScale: defaults.space,
    transform: positiveOrNegativePx,
  },
};

export const shadow = {
  boxShadow: {
    property: "boxShadow",
    scale: "shadows",
  },
  textShadow: {
    property: "textShadow",
    scale: "shadows",
  },
};

const shared = {
  scale: "space",
  fallbackScale: defaults.space,
};

export const space = {
  margin: {
    property: "margin",
    transform: positiveOrNegativePx,
    ...shared,
  },
  m: {
    property: "margin",
    transform: positiveOrNegativePx,
    ...shared,
  },
  marginTop: {
    property: "marginTop",
    transform: positiveOrNegativePx,
    ...shared,
  },
  mt: {
    property: "marginTop",
    transform: positiveOrNegativePx,
    ...shared,
  },
  marginRight: {
    property: "marginRight",
    transform: positiveOrNegativePx,
    ...shared,
  },
  mr: {
    property: "marginRight",
    transform: positiveOrNegativePx,
    ...shared,
  },
  marginBottom: {
    property: "marginBottom",
    transform: positiveOrNegativePx,
    ...shared,
  },
  mb: {
    property: "marginBottom",
    transform: positiveOrNegativePx,
    ...shared,
  },
  marginLeft: {
    property: "marginLeft",
    transform: positiveOrNegativePx,
    ...shared,
  },
  ml: {
    property: "marginLeft",
    transform: positiveOrNegativePx,
    ...shared,
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegativePx,
    ...shared,
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    transform: positiveOrNegativePx,
    ...shared,
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegativePx,
    ...shared,
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    transform: positiveOrNegativePx,
    ...shared,
  },
  padding: {
    property: "padding",
    transform: px,

    ...shared,
  },
  p: {
    property: "padding",
    transform: px,

    ...shared,
  },
  paddingTop: {
    property: "paddingTop",
    transform: px,

    ...shared,
  },
  pt: {
    property: "paddingTop",
    transform: px,

    ...shared,
  },
  paddingRight: {
    property: "paddingRight",
    transform: px,

    ...shared,
  },
  pr: {
    property: "paddingRight",
    transform: px,

    ...shared,
  },
  paddingBottom: {
    property: "paddingBottom",
    transform: px,

    ...shared,
  },
  pb: {
    property: "paddingBottom",
    transform: px,

    ...shared,
  },
  paddingLeft: {
    property: "paddingLeft",
    transform: px,

    ...shared,
  },
  pl: {
    property: "paddingLeft",
    transform: px,

    ...shared,
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    transform: px,

    ...shared,
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    transform: px,

    ...shared,
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    transform: px,

    ...shared,
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    transform: px,

    ...shared,
  },
};

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */

export const allConfig = {
  ...background,
  ...border,
  ...color,
  ...typography,
  ...flexbox,
  ...grid,
  ...layout,
  ...others,
  ...position,
  ...shadow,
  ...space,
};

export type ResponsiveValue<T> = T | T[];

export type ResponsiveCSSValue<
  K extends keyof CSS.Properties
> = ResponsiveValue<CSS.Properties<number | string | 0>[K]>;

export type ResponsiveCSSProperties = {
  [K in keyof CSS.Properties<number | string | 0>]: ResponsiveCSSValue<K>;
};

export type StylePropConfig = typeof allConfig;
export type StyleAliasConfig = Omit<StylePropConfig, keyof CSS.Properties<any>>;
export type StyleAliases = keyof StyleAliasConfig;
export type StylePropNames = (keyof StylePropConfig) | (keyof CSS.Properties);
export type ResponsiveStyleProps = {
  [K in keyof CSS.Properties]?: ResponsiveCSSValue<K> | ResponsiveValue<string | number | 0>
}
export type ResponsiveStyleAliases = {
  [K in Exclude<keyof StylePropConfig, keyof CSS.Properties>]?: ResponsiveValue<string | number | 0>;
}
export type StyleProps = ResponsiveStyleProps & ResponsiveStyleAliases;
  // : (StyleAliasConfig[K] extends { "property": string } ? ResponsiveCSSValue<StylePropConfig[K]["property"]> : ResponsiveValue<string | number | 0> }
// export type StyleProps = CSS.Properties & StyleAliasProps;