// @ts-nocheck

import {
  magic,
  parseMotionProps,
  wrapMotionComponent,
  createClassName,
} from "../core/magic";
import { domElements } from "../babel/elements";

domElements.forEach((el) => {
  magic[el as any] = magic.custom(
    el as any,
    {},
    {
      beforeParseCSS: parseMotionProps,
      wrapComponent: wrapMotionComponent,
      processCSS: createClassName,
    }
  );
});
