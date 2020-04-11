import * as CSS from 'csstype';

export interface ConfigStyle {
  /**
   * The CSS property to use in the returned style object
   * (overridden by `properties` if present).
   */
  property?: keyof CSS.Properties
  /**
   * An array of css properties (e.g. `['marginLeft', 'marginRight']`)
   * the prop maps to.
   */
  properties?: Array<keyof CSS.Properties>
  /**
   * A reference to theme scale for this property or properties.
   */
  scale?: string
  /**
   * A fallback scale object if scale is not found
   * in theme
   */
  fallbackScale?: any
  /**
   * A function to transform the raw value based on the scale.
   */
  transform?: (value: any, scale?: any) => any
}

export type Config = null | true | ConfigStyle

export type ConfigObject = { [prop: string]: Config }

export const background: ConfigObject = {
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
}

export const border : ConfigObject = {
  border: {
    property: "border",
    scale: "borders",
  },
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths",
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
  },
  borderTop: {
    property: "borderTop",
    scale: "borders",
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii",
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii",
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
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii",
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
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
}

export const color: ConfigObject = {
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
}

const defaults = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

export const typography: ConfigObject = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts",
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes",
    fallbackScale: defaults.fontSizes,
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
}

