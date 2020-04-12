import { system } from "./system";
import { allConfig } from "./style-config";

export const deepParser = system(allConfig, "merge", false);

const animTransform = (
  value: { [x: string]: any },
  _scale: any,
  props: any,
  theme: { disableStyledSystemCache: any }
) => {
  if (typeof value !== "object" || Array.isArray(animTransform)) {
    return value;
  }
  return deepParser(value, theme);
};

export const motionParser = system(
  {
    animate: {
      property: "animate",
      transform: animTransform,
      allowComplex: true,
    },
    variants: {
      property: "variants",
      transform: (
        value: { [x: string]: any },
        _scale: any,
        props: any,
        theme: { disableStyledSystemCache: any }
      ) => {
        const v: any = {};
        for (var key in value) {
          if (typeof value[key] == "function") {
            v[key] = value[key];
          } else {
            v[key] = deepParser(value[key], theme);
          }
        }
        return v;
      },
      allowComplex: true,
    },
    transition: true,
    initial: {
      property: "initial",
      transform: animTransform,
      allowComplex: true,
    },
    exit: {
      property: "exit",
      transform: animTransform,
      allowComplex: true,
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
      property: "whileTap",
      transform: animTransform,
      allowComplex: true,
    },

    // Hover handlers
    whileHover: {
      property: "whileHover",
      transform: animTransform,
      allowComplex: true,
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
    inherit: true,
  },
  "separate"
);