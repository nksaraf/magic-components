import { hash, sheet } from "./stylesheet";
import { useTheme } from "./theme";
import { strictCssParser } from "./magic";
import React from "react";
import { StyleProps } from "./style-config";

const globalCache: { [key: string]: any } = {};

export const Global = ({
  style,
  id,
}: {
  style: {
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
      const [css, _] = strictCssParser(style[item], theme);
      styles[item] = css;
    }
    if (id) {
      globalCache[id] = style;
    }
    return hash(styles, sheet, true, false);
  }, [id]);

  return <></>;
};

export function important(s: string | object) {
  if (typeof s === "string") {
    return `${s} !important`;
  } else {
    Object.fromEntries(
      Object.entries(s).map(([key, value]) => [key, important(value)])
    );
  }
}
