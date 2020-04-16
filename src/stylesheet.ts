// import { prefixProperty, prefixValue } from 'tiny-css-prefixer';
import { prefix } from 'inline-style-prefixer'
/**
 * Parses the object into css, scoped, blocks
 * @param {Object} obj
 * @param {String} paren
 * @param {String} wrapper
 */
export interface Parse {
  (obj: { [key: string]: any }, paren: string, wrapper?: string): string
  p?: any
}

// export const prefix = (prop: string, value: string) => {
//   debugger;
//   const base = `${prop}: ${value}; `;
//   value = prefixValue(prop, value);
//   let css = `${prop}: ${value}; `;
//   const flag = prefixProperty(prop);
//   if (flag & 0b001) css += `-ms-${base}`;
//   if (flag & 0b010) css += `-moz-${base}`;
//   if (flag & 0b100) css += `-webkit-${base}`;
//   return css;
// };

import resolveArrayValue from 'css-in-js-utils/lib/resolveArrayValue';

export const parse: Parse = (obj, paren, wrapper) => {
  let outer = '';
  let blocks = '';
  let current = '';

  for (let key in obj) {
      const val = obj[key];

      // If this is a 'block'
      if (typeof val == 'object' && !Array.isArray(val)) {
          // Regular selector
          let next = paren + ' ' + key;

          // Nested
          if (/&/g.test(key)) next = key.replace(/&/g, paren);

          // Media queries or other
          if (key[0] == '@') {
              next = paren;
              // If this is the case for `@font-face`
              if (key[1] == 'f') {
                  next = key;
              }
          }

          // If this is the `@keyframes`
          if (/@k/.test(key)) {
              // Take the key and inline it
              blocks += key + '{' + parse(val, '', '') + '}';
          } else {
              // Call the parse for this block
              blocks += parse(val, next, next == paren ? key : wrapper || '');
          }
      } else {
          if (/^@i/.test(key)) {
              outer = key + ' ' + val + ';';
          } else {
              // Push the line for this property
              key = key.replace(/[A-Z]/g, '-$&').toLowerCase();
              current += 
              // parse.p
                  // ? // We have a prefixer and we need to run this through that
                    // parse.p(key.replace(/[A-Z]/g, '-$&').toLowerCase(), val)
                  // : // Nope no prefixer just append it
                   key  + ':' + (Array.isArray(val) ? val.join(';' + key + ':') : val) + ';';
          }
      }
  }

  // If we have properties
  if (current[0]) {
      // Standard rule composition
      const rule = paren + '{' + current + '}';

      // With wrapper
      if (wrapper) return blocks + wrapper + '{' + rule + '}';

      // Else just push the rule
      return outer + rule + blocks;
  }

  return outer + blocks;
};

// parse.p = prefix;

export const GOOBER_ID = '✨📃';
export const GOOBER_PREFIX = '.✨';
export const GOOBER_REGEX = /\s*✨[0-9]+/g
export const ssr = {
  data: ''
};

/**
* Returns the _commit_ target
* @param {Object} [target]
* @returns {HTMLStyleElement|{data: ''}}
*/
export const getSheet = (target?: any) => {
  try {
      // Querying the existing target for a previously defined <style> tag
      // We're doing a querySelector because the <head> element doesn't implemented the getElementById api
      let sheet : any = target ? target.querySelector('#' + GOOBER_ID) : null;
      if (!sheet) {
          // Note to self: head.innerHTML +=, triggers a layout/reflow. Avoid it.
          sheet = (target || document.head).appendChild(document.createElement('style'));
          sheet.innerHTML = ' ';
          sheet.id = GOOBER_ID;
      }
      return sheet.firstChild;
  } catch (e) {}
  return ssr;
};

/**
* Extracts and wipes the cache
* @returns {String}
*/
export const extractCss = (target?: string) => {
  const sheet = getSheet(target);
  const out = sheet.data;
  sheet.data = '';
  return out;
};

/**
* Updates the target and keeps a local cache
* @param {String} css
* @param {Object} target
* @param {Boolean} append
*/
export const update = (css: string, sheet: { data: string }, append: boolean) => {
  sheet.data.indexOf(css) < 0 && (sheet.data = append ? css + sheet.data : sheet.data + css);
};



/**
* Transforms the input into a className.
* The multiplication constant 101 is selected to be a prime,
* as is the initial value of 11.
* The intermediate and final results are truncated into 32-bit
* unsigned integers.
* @param {String} str
*/
const toHash = (str: string) =>
  GOOBER_PREFIX + str.split('').reduce((out, i) => (101 * out + i.charCodeAt(0)) >>> 0, 11);


/**
* In-memory cache.
*/
let cache : { [key: string]: string } = {};

/**
* Generates the needed className
* @param {String|Object} compiled
* @param {Object} sheet StyleSheet target
* @param {Object} global Global flag
* @param {Object} append Append or not
* @returns {String}
*/
export const hash = (compiled: object, sheet: any, global: boolean, append: boolean) => {
  // generate hash
  const compString = JSON.stringify(compiled);
  const className = cache[compString] || (cache[compString] = toHash(compString));

  // Parse the compiled
  const parsed =
      cache[className] ||
      (cache[className] = parse(prefix(compiled), global ? '' : className));

  // add or update
  update(parsed, sheet, append);

  // return hash
  return className.slice(1);
};


let sheet: any;
if (typeof window !== "undefined") {
  sheet = getSheet(document && document.head);
} else {
  sheet = getSheet();
}

export { sheet };
