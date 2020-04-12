import React from "react";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./theme";
import { elements } from "./dom";
import { hash, getSheet, GOOBER_REGEX } from "./stylesheet";
import './types';
import { allConfig } from "./style-config";
import { system, compose, createParser } from './system';

export const cssParser = system(allConfig, 'separate');
export const deepParser = system({ ...allConfig, x: {
  property: 'x',
  scale: 'space'
}, y:{
  property: 'y',
  scale: 'space'
}}, 'merge', false);

const animTransform = (value: { [x: string]: any; }, _scale: any, props: any, theme: { disableStyledSystemCache: any; }) => {
  if (typeof value !== 'object' || Array.isArray(animTransform)) {
    return value;
  }
  console.log(deepParser(value, theme));
  return deepParser(value, theme);
};

export const motionParser = system({
  animate: {
    property: 'animate',
    transform: animTransform,
    allowComplex: true
  },
  variants: {
    property: 'variants',
    transform: (value: { [x: string]: any; }, _scale: any, props: any, theme: { disableStyledSystemCache: any; }) => {
      const v : any= {};
      for (var key in value) {
        if (typeof(value[key]) == 'function') {
          v[key] = value[key];
          console.log('here');
        } else {
          v[key] = deepParser(value[key], theme);
        }
      }
      return v;
    },
    allowComplex: true
  },
  transition: true,
  initial: {
    property: 'initial',
    transform: animTransform,
    allowComplex: true
  },
  exit: {
    property: 'exit',
    transform: animTransform,
    allowComplex: true
  },

  style: true,
  transformTemplate: true,
  transformValues: true,
  // MotionCallbacks
  onUpdate: true,
  onAnimationStart: true,
  onAnimationComplete: true,
  
  // Pan Handlers
  onPan: true,
  onPanStart: true,
  onPanSessionStart: true,
  onPanEnd: true,
  
  // Tap Handlers
  onTap: true,
  onTapStart: true,
  onTapCancel: true,
  whileTap: {
    property: 'whileTap',
    transform: animTransform,
    allowComplex: true
  },
  
  // Hover handlers
  whileHover: {
    property: 'whileHover',
    transform: animTransform,
    allowComplex: true
  },
  onHoverStart: true,
  onHoverEnd: true,
  
  // Magic Props
  layoutId: true,
  onMagicComplete: true,
  magicDependency: true,
  allowTransformNone: true,
  
  // Drag handlers
  drag: true,
  dragDirectionLock: true,
  dragPropagation: true,
  dragConstraints: true,
  dragElastic: true,
  dragMomentum: true,
  dragTransition: true,
  dragOriginX: true,
  dragOriginY: true,
  dragControls: true,
  dragListener: true,
  
  // Advanced
  custom: true,
  static: true,
  inherit: true
}, 'separate')



let sheet: any;
if (typeof window !== "undefined") {
  sheet = getSheet(document && document.head);
} else {
  sheet = getSheet();
}

// export const glob = (compiled: object) =>  {
//   return hash(cssParser(compiled, ), sheet, true, false);
// }

export const Global = ({ style }: any) => {
  const theme = useTheme();
  React.useEffect(() => {
    hash(cssParser(style, theme), sheet, true, false);
  }, [])
}

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
) => {
  const Magic = React.forwardRef(
    ({ children, className, as: asProp, ...props }: any, ref) => {
      // Grab a shallow copy of the props
      // _ctx.p: is the props sent to the context

      // Set a flag if the current components had a previous className
      // similar to goober. This is the append/prepend flag
      let append = GOOBER_REGEX.test(props.className);

      const theme = useTheme();
      const [motionProps, otherProps] = motionParser(props, theme) as any;

      let remain = {}
      let computedClassName: string | undefined = undefined;
      if (Object.keys(otherProps).length === 0) {
        computedClassName = className;
      } else {
        const [themedCss, remaining] = cssParser(otherProps, theme);
        remain = remaining;
        if (Object.keys(themedCss).length > 0) {
          let magicClass = hash(themedCss, sheet, false, append);
          computedClassName = `${magicClass}${className ? ` ${className}` : ""}`;
        } else {
          computedClassName = className;
        }
      }

      return React.createElement(
        asProp || Object.keys(motionProps).length > 0 ?
          (typeof component === "string"
            ? (motion as any)[component]
            : motion.custom(component)) : component,
        Object.assign(
          {},
          motionProps,
          remain,
          {
            ref,
            children,
            className: computedClassName,
          }
        )
      );
    }
  );

  if (process.env.NODE_ENV === "development") {
    Magic.displayName = `Magic(${
      typeof component === "string"
        ? component
        : component.displayName || component.name || "Component"
    })`;
  }

  return Magic;
};

export const magic = createMagic;
elements.forEach((el) => {
  (magic as any)[el] = createMagic(el);
}); 

export * from "./theme";
export * from "framer-motion";
export * from "./stylesheet";
export * from './base-theme';
export * from './system';
export * from './types';

// export const magic = baseMagic as unknown as typeof createMagic & { }
