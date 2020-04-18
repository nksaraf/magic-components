import { hash, sheet } from "./stylesheet";
import { useTheme } from "./theme";
import { strictCssParser } from "./parser";
import React from "react";
import { StyleProps } from "./style-config";

const globalCache: { [key: string]: any } = {};

export const Global = ({
  style = {},
  css = {},
  id,
}: {
  style?: {
    [k: string]: StyleProps;
  };
  css?: {
    [k: string]: StyleProps;
  };
  id?: string;
}) => {
  const theme = useTheme();
  React.useMemo(() => {
    if (id && globalCache[id]) {
      return;
    }

    const styles: any = {};
    for (var item in style) {
      const [styleCss, _] = strictCssParser(style[item], theme);
      styles[item] = styleCss;
    }
    for (var item in css) {
      const [cssCss, _] = strictCssParser(css[item], theme);
      styles[item] = cssCss;
    }
    if (id) {
      globalCache[id] = styles;
    }
    return hash(styles, sheet, true, false);
  }, [id]);

  return <></>;
};

export function important<T>(s: T): T {
  if (typeof s === "string") {
    return (`${s} !important` as unknown) as T;
  } else {
    return Object.fromEntries(
      Object.entries(s).map(([key, value]) => [key, important(value)])
    );
  }
}
