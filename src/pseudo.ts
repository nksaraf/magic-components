// const group = {
//   hover: (selector: string) => `${selector}:hover &, ${selector}[data-hover] &`,
//   focus: (selector: string) =>
//     `${selector}:focus &, ${selector}[data-focus] &,`,
//   active: (selector: string) =>
//     `${selector}:active &, ${selector}[data-active] &, ${selector}[data-state=active] &`,
//   disabled: (selector: string) =>
//     `${selector}:disabled &, ${selector}[data-disabled] &, ${selector}[data-state=disabled] &`,
//   invalid: (selector: string) =>
//     `${selector}:invalid &, ${selector}[data-invalid] &, ${selector}[data-state=invalid] &`,
//   checked: (selector: string) =>
//     `${selector}:checked &, ${selector}[data-checked] &, ${selector}[data-state=checked] &`,
//   indeterminate: (selector: string) =>
//     `${selector}:indeterminate &, ${selector}[aria-checked=mixed] &, ${selector}[data-indeterminate] &, ${selector}[data-state=mixed] &`,
//   readOnly: (selector: string) =>
//     `${selector}:read-only &, ${selector}[readonly] &, ${selector}[data-read-only] &, ${selector}[data-state=readonly] &`,
//   expanded: (selector: string) =>
//     `${selector}:read-only &, ${selector}[aria-expanded=true] &, ${selector}[data-expanded] &, ${selector}[data-state=expanded] &`,
// }

// function toGroup(fn: AnyFunction) {
//   return merge(fn, "[role=group]", "[data-group]")
// }

// function merge(fn: AnyFunction, ...selectors: string[]) {
//   return selectors.map(fn).join(", ")
// }

// const disabled = (selector: string) =>
//   `${selector}, ${selector}:focus, ${selector}:hover`

// const disabledSelector = merge(
//   disabled,
//   "&[disabled]",
//   "&[aria-disabled=true]",
//   "&[data-disabled]",
//   "&[data-state=disabled]",
// )

// export const pseudoSelectors = {
//   /**
//    * Styles for CSS selector `&:hover`
//    */
//   _hover: "&:hover, &[data-hover]",
//   /**
//    * Styles for CSS Selector `&:active`
//    */
//   _active: "&:active, &[data-active], &[data-state=active]",
//   /**
//    * Styles for CSS selector `&:focus`
//    *
//    */
//   _focus: "&:focus, &[data-focus], &[data-state=focused]",
//   _highlighted: "&[data-highlighted]",
//   /**
//    * Styles to apply when a child of this element has received focus
//    * - CSS Selector `&:focus-within`
//    */
//   _focusWithin: "&:focus-within",
//   _focusVisible: "&:focus-visible",
//   /**
//    * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
//    * - `&[aria-disabled=true]`
//    * - `&:disabled`
//    * - `&:disabled:focus`
//    * - `&:disabled:hover`
//    * - `&:focus[aria-disabled=true]`
//    * - `&:hover[aria-disabled=true]`
//    */
//   _disabled: disabledSelector,
//   /**
//    * Styles for CSS Selector `&:readonly`
//    */
//   _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
//   /**
//    * Styles for CSS selector `&:before`
//    *
//    * NOTE:When using this, ensure the `content` is wrapped in a backtick.
//    * @example
//    * ```jsx
//    * <Box _before={{content:`""` }}/>
//    * ```
//    */
//   _before: "&:before",
//   /**
//    * Styles for CSS selector `&:after`
//    *
//    * NOTE:When using this, ensure the `content` is wrapped in a backtick.
//    * @example
//    * ```jsx
//    * <Box _after={{content:`""` }}/>
//    * ```
//    */
//   _after: "&:after",
//   _empty: "&:empty",
//   /**
//    * Styles to apply when the ARIA attribute `aria-expanded` is `true`
//    * - CSS selector `&[aria-expanded=true]`
//    */
//   _expanded: "&[aria-expanded=true], &[data-expanded], &[data-state=expanded]",
//   /**
//    * Styles to apply when the ARIA attribute `aria-checked` is `true`
//    * - CSS selector `&[aria-checked=true]`
//    */
//   _checked: "&[aria-checked=true], &[data-checked], &[data-state=checked]",
//   /**
//    * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
//    * - CSS selector `&[aria-grabbed=true]`
//    */
//   _grabbed: "&[aria-grabbed=true], &[data-grabbed], &[data-state=grabbed]",
//   /**
//    * Styles for CSS Selector `&[aria-pressed=true]`
//    * Typically used to style the current "pressed" state of toggle buttons
//    */
//   _pressed: "&[aria-pressed=true], &[data-pressed], &[data-state=pressed]",
//   /**
//    * Styles to apply when the ARIA attribute `aria-invalid` is `true`
//    * - CSS selector `&[aria-invalid=true]`
//    */
//   _invalid:
//     "&[aria-invalid=true], &[data-invalid], &:invalid, &[data-state=invalid]",
//   _valid: "&[data-valid], &:valid, &[data-state=valid]",
//   /**
//    * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
//    * Useful for styling loading states
//    */
//   _loading: "&[data-loading], &[aria-busy=true], &[data-state=loading]",
//   /**
//    * Styles to apply when the ARIA attribute `aria-selected` is `true`
//    * - CSS selector `&[aria-selected=true]`
//    */
//   _selected: "&[aria-selected=true], &[data-selected], &[data-state=selected]",
//   /**
//    * Styles for CSS Selector `[hidden=true]`
//    * Useful for styling the hidden state
//    */
//   _hidden: "&[hidden], &[data-hidden]",
//   _autofill: "&:-webkit-autofill",
//   /**
//    * Styles for CSS Selector `&:nth-child(even)`
//    */
//   _even: "&:nth-of-type(even)",
//   /**
//    * Styles for CSS Selector `&:nth-child(odd)`
//    */
//   _odd: "&:nth-of-type(odd)",
//   /**
//    * Styles for CSS Selector `&:first-of-type`
//    */
//   _first: "&:first-of-type",
//   /**
//    * Styles for CSS Selector `&:last-of-type`
//    */
//   _last: "&:last-of-type",
//   /**
//    * Styles for CSS Selector `&:visited`
//    */
//   _visited: "&:visited",
//   /**
//    * Used to style the active link in a navigation
//    * Styles for CSS Selector `&[aria-current=page]`
//    */
//   _activeLink: "&[aria-current=page]",
//   /**
//    * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
//    * - CSS selector `&[aria-checked=mixed]`
//    */
//   _indeterminate:
//     "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate], &[data-state=mixed]",
//   /**
//    * Styles to apply when you hover on a parent that has `role=group`.
//    */
//   _groupHover: toGroup(group.hover),
//   _groupFocus: toGroup(group.focus),
//   _groupActive: toGroup(group.active),
//   _groupDisabled: toGroup(group.disabled),
//   _groupInvalid: toGroup(group.invalid),
//   _groupChecked: toGroup(group.checked),
//   /**
//    * Styles for CSS Selector `&::placeholder`.
//    * Useful for inputs
//    */
//   _placeholder: "&::placeholder",
//   _fullScreen: "&:fullscreen",
//   /**
//    * Styles for CSS Selector `&::selection`
//    */
//   _selection: "&::selection",
// }

// export type Pseudos = typeof pseudoSelectors

// export const pseudoPropNames = Object.keys(pseudoSelectors) as (keyof Pseudos)[]

// import { Dict, memoizeOne, isObject, isFunction } from "@chakra-ui/utils"
// import { pseudoSelectors, Pseudos } from "./pseudo.selector"

// const isPseudoProp = (prop: string): prop is keyof Pseudos =>
//   prop in pseudoSelectors

// const getPropName = memoizeOne((prop: string) =>
//   isPseudoProp(prop) ? pseudoSelectors[prop] : prop,
// )

// export function parsePseudo(props: Dict) {
//   const next: Dict = {}

//   for (const prop in props) {
//     const propValue = props[prop]
//     const propName = getPropName(prop)

//     if (isObject(propValue) && !isFunction(propValue)) {
//       next[propName] = parsePseudo(propValue)
//     } else {
//       next[propName] = propValue
//     }
//   }

//   return next
// }

// export type AdvancedPseudos =
//   | "&:-moz-any()"
//   | "&:-moz-dir"
//   | "&:-webkit-any()"
//   | "&::cue"
//   | "&::cue-region"
//   | "&::part"
//   | "&::slotted"
//   | "&:dir"
//   | "&:has"
//   | "&:host"
//   | "&:host-context"
//   | "&:is"
//   | "&:lang"
//   | "&:matches()"
//   | "&:not"
//   | "&:nth-child"
//   | "&:nth-last-child"
//   | "&:nth-last-of-type"
//   | "&:nth-of-type"
//   | "&:where";

// export type SimplePseudos =
//   | "&:-khtml-any-link"
//   | "&:-moz-any-link"
//   | "&:-moz-focusring"
//   | "&:-moz-full-screen"
//   | "&:-moz-placeholder"
//   | "&:-moz-read-only"
//   | "&:-moz-read-write"
//   | "&:-ms-fullscreen"
//   | "&:-ms-input-placeholder"
//   | "&:-webkit-any-link"
//   | "&:-webkit-full-screen"
//   | "&::-moz-placeholder"
//   | "&::-moz-progress-bar"
//   | "&::-moz-range-progress"
//   | "&::-moz-range-thumb"
//   | "&::-moz-range-track"
//   | "&::-moz-selection"
//   | "&::-ms-backdrop"
//   | "&::-ms-browse"
//   | "&::-ms-check"
//   | "&::-ms-clear"
//   | "&::-ms-fill"
//   | "&::-ms-fill-lower"
//   | "&::-ms-fill-upper"
//   | "&::-ms-input-placeholder"
//   | "&::-ms-reveal"
//   | "&::-ms-thumb"
//   | "&::-ms-ticks-after"
//   | "&::-ms-ticks-before"
//   | "&::-ms-tooltip"
//   | "&::-ms-track"
//   | "&::-ms-value"
//   | "&::-webkit-backdrop"
//   | "&::-webkit-input-placeholder"
//   | "&::-webkit-progress-bar"
//   | "&::-webkit-progress-inner-value"
//   | "&::-webkit-progress-value"
//   | "&::-webkit-slider-runnable-track"
//   | "&::-webkit-slider-thumb"
//   | "&::after"
//   | "&::backdrop"
//   | "&::before"
//   | "&::cue"
//   | "&::cue-region"
//   | "&::first-letter"
//   | "&::first-line"
//   | "&::grammar-error"
//   | "&::marker"
//   | "&::placeholder"
//   | "&::selection"
//   | "&::spelling-error"
//   | "&:active"
//   | "&:after"
//   | "&:any-link"
//   | "&:before"
//   | "&:blank"
//   | "&:checked"
//   | "&:default"
//   | "&:defined"
//   | "&:disabled"
//   | "&:empty"
//   | "&:enabled"
//   | "&:first"
//   | "&:first-child"
//   | "&:first-letter"
//   | "&:first-line"
//   | "&:first-of-type"
//   | "&:focus"
//   | "&:focus-visible"
//   | "&:focus-within"
//   | "&:fullscreen"
//   | "&:hover"
//   | "&:in-range"
//   | "&:indeterminate"
//   | "&:invalid"
//   | "&:last-child"
//   | "&:last-of-type"
//   | "&:left"
//   | "&:link"
//   | "&:only-child"
//   | "&:only-of-type"
//   | "&:optional"
//   | "&:out-of-range"
//   | "&:placeholder-shown"
//   | "&:read-only"
//   | "&:read-write"
//   | "&:required"
//   | "&:right"
//   | "&:root"
//   | "&:scope"
//   | "&:target"
//   | "&:valid"
//   | "&:visited";

// export type StyleAliasProps = {
//   [K in Exclude<StylePropNames, keyof CSS.Properties<any>>]?: ResponsiveValue<
//     string | number | 0
//   >;
// };

export {};
