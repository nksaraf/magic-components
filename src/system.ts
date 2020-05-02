export const merge = (a: { [x: string]: any }, b: { [x: string]: any }) => {
  let result = Object.assign({}, a, b);
  for (const key in a) {
    if (!a[key] || typeof b[key] !== "object") continue;
    Object.assign(result, {
      [key]: Object.assign(a[key], b[key]),
    });
  }
  return result;
};

// sort object-value responsive styles
const sort = (obj: { [x: string]: any }) => {
  const next: any = {};
  Object.keys(obj)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    )
    .forEach((key) => {
      next[key] = obj[key];
    });
  return next;
};

const defaults = {
  breakpoints: [40, 52, 64].map((n) => n + "em"),
};

const createMediaQuery = (n: any) => `@media screen and (min-width: ${n})`;

const getValue = (n: any, scale: any) => get(scale, n, n);

export const get = (
  obj: { [x: string]: any },
  key: string,
  def: string | string[],
  p?: number | undefined,
  undef?: undefined
) => {
  let keys = key && key.split ? key.split(".") : [key];
  for (p = 0; p < keys.length; p++) {
    obj = obj ? obj[keys[p]] : undef;
  }
  return obj === undef ? def : obj;
};

export const createParser = (
  config: { [x: string]: any },
  remaining = "ignore",
  breakpoint = true
) => {
  const cache: any = {};
  const parse = (
    props: {
      [x: string]: any;
    },
    theme: any
  ) => {
    let styles: any = {};
    let others: any = {};
    let shouldSort = false;
    const isCacheDisabled = theme && theme.disableStyledSystemCache;

    for (const key in props) {
      if (!config[key]) {
        if (remaining === "separate") {
          others[key] = props[key];
        } else if (remaining === "merge") {
          styles[key] = props[key];
        }
        continue;
      }
      const sx = config[key];
      const raw = props[key];
      const scale = get(theme, sx.scale, sx.defaults);

      if (typeof raw === "object") {
        if (!breakpoint && Array.isArray(raw)) {
          styles[key] = raw.map((r) => sx(r, scale, props, theme)[key]);
          continue;
        }

        if (sx.allowComplex || !breakpoint) {
          Object.assign(styles, sx(raw, scale, props, theme));
          continue;
        }

        cache.breakpoints =
          (!isCacheDisabled && cache.breakpoints) ||
          get(theme, "breakpoints", defaults.breakpoints);
        if (Array.isArray(raw)) {
          cache.media = (!isCacheDisabled && cache.media) || [
            null,
            ...cache.breakpoints.map(createMediaQuery),
          ];
          styles = merge(
            styles,
            parseResponsiveStyle(cache.media, sx, scale, raw, props, theme)
          );
          continue;
        }
        if (raw !== null) {
          styles = merge(
            styles,
            parseResponsiveObject(
              cache.breakpoints,
              sx,
              scale,
              raw,
              props,
              theme
            )
          );
          shouldSort = true;
        }
        continue;
      }

      Object.assign(styles, sx(raw, scale, props, theme));
    }

    // sort object-based responsive styles
    if (shouldSort) {
      styles = sort(styles);
    }

    if (remaining === "separate") {
      return [styles, others];
    }

    return styles;
  };
  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  // const keys = Object.keys(config).filter(k => k !== 'config')
  // if (keys.length > 1) {
  //   keys.forEach(key => {
  //     parse[key] = createParser({ [key]: config[key] })
  //   })
  // }

  return parse;
};

const parseResponsiveStyle = (
  mediaQueries: string | any[],
  sx: (arg0: any, arg1: any, arg2: any, arg3: any) => any,
  scale: any,
  raw: any[],
  _props: any,
  theme: any
) => {
  let styles: any = {};
  raw
    .slice(0, mediaQueries.length)
    .forEach((value: any, i: string | number) => {
      const media = mediaQueries[i as any];
      const style = sx(value, scale, _props, theme);
      if (!media) {
        Object.assign(styles, style);
      } else {
        Object.assign(styles, {
          [media]: Object.assign({}, styles[media], style),
        });
      }
    });
  return styles;
};

const parseResponsiveObject = (
  breakpoints: { [x: string]: any },
  sx: (arg0: any, arg1: any, arg2: any, arg3: any) => any,
  scale: any,
  raw: { [x: string]: any },
  _props: any,
  theme: any
) => {
  let styles: any = {};
  for (let key in raw) {
    const breakpoint = breakpoints[key];
    const value = raw[key];
    const style = sx(value, scale, _props, theme);
    if (!breakpoint) {
      Object.assign(styles, style);
    } else {
      const media = createMediaQuery(breakpoint);
      Object.assign(styles, {
        [media]: Object.assign({}, styles[media], style),
      });
    }
  }
  return styles;
};

export const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  fallbackScale,
  allowComplex = false,
}: any) => {
  properties = properties || [property];
  const sx = (value: any, scale: any, _props: any, theme: any) => {
    const result: any = {};
    let n = transform(value, scale, _props, theme);
    if (n === null) return;
    if (!allowComplex && typeof n === "object") {
      n = value;
    }
    properties.forEach((prop: string | number) => {
      result[prop] = n;
    });
    return result;
  };
  sx.scale = scale;
  sx.allowComplex = allowComplex;
  sx.defaults = fallbackScale;
  return sx;
};

// new v5 API
export const system = (
  propConfig: any = {},
  remaining = "ignore",
  breakpointArray = true
) => {
  const config: any = {};
  Object.keys(propConfig).forEach((key) => {
    const conf = propConfig[key];
    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key,
        scale: key,
      });
      return;
    }
    if (typeof conf === "function") {
      config[key] = conf;
      return;
    }
    config[key] = createStyleFunction(conf);
  });

  const parser = createParser(config, remaining, breakpointArray);
  return parser;
};

export const compose = (...parsers: any[]) => {
  let config = {};
  parsers.forEach((parser) => {
    if (!parser || !parser.config) return;
    Object.assign(config, parser.config);
  });
  const parser = createParser(config);
  return parser;
};
