import React from "react";
import { hash, getSheet } from "./parser";
import { motion } from "framer-motion";
import { domElements } from "./components";
import { css } from "./css";
import {  useTheme } from './theme';
// let h: (arg0: any, arg1: any) => any =  Reat, forwardRef: (arg0: (props: any, ref: any) => any) => any, useTheme: () => any;
// const setup = (pragma: any, prefix: any, fwd: any, theme: any) => {
//     // This one needs to stay in here, so we won't have cyclic dependencies
//     parse.p = prefix;

//     // These are scope to this context
//     h = pragma;
//     forwardRef = fwd;
//     useTheme = theme;
// };


// export { defaultTheme } from "./css";
/**
 * Styled function
 * @param {String} tag
 */
export function createMagic(tag: any) {
  function Styled({  children, ...props }: any, ref: any) {
    // Grab a shallow copy of the props
    // _ctx.p: is the props sent to the context

    // Set a flag if the current components had a previous className
    // similar to goober. This is the append/prepend flag
    let append = /\s*go[0-9]+/g.test(props.className);

    const { result, other } = css(props)(useTheme());
    console.log(result, other);
    // Define the new className
    return React.createElement(
      props.as || tag,
      Object.assign({}, other, {
        ref,
        children,
        className: `${hash(result, getSheet(undefined), false, append)}${
          props.className ? " " + props.className : ""
        }`
      })
    );
  }
  return React.forwardRef(Styled);
}


export type Merge<T1, T2> = Omit<T1, Extract<keyof T1, keyof T2>> & T2

export type SafeMerge<T, P> = P & Omit<T, keyof P>

export type UnionStringArray<T extends Readonly<string[]>> = T[number]

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type As<P = any> = React.ReactType<P>

export type AnyFunction<T = any> = (...args: T[]) => any

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never

export type Dict<T = any> = Record<string, T>


export type DOMElements = UnionStringArray<typeof domElements>


export const magic = (createMagic as unknown) as { [Tag in DOMElements]: any };
domElements.forEach((el) => {
  magic[el] = createMagic(motion[el]);
});


export * from './theme';