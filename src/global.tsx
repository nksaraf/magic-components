import { hash, sheet } from "./stylesheet";
import { useTheme } from "./theme";
import { cssParser } from "./magic";
import React from "react";

export const Global = ({
  style,
}: {
  style: {
    [k: string]: {
      [key in keyof React.CSSProperties]: React.CSSProperties[key];
    };
  };
}) => {
  const theme = useTheme();
  React.useMemo(() => {
    const styles: any = {};
    for (var item in style) {
      const [css, _] = cssParser(style[item], theme);
      styles[item] = css;
    }
    return hash(styles, sheet, true, false);
  }, []);

  return <></>;
};
