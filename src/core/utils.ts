export const merge = (
  a: {
    [x: string]: any;
  },
  b: {
    [x: string]: any;
  }
) => {
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
export const sort = (obj: { [x: string]: any }) => {
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
