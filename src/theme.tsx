import React from "react";
import { baseTheme } from "./base-theme";
import { get } from "./core/utils";
import Color from "color";

export const ThemeContext = React.createContext<any>(baseTheme);

export const ThemeProvider = ({
  theme = {},
  children,
}: React.PropsWithChildren<{ theme?: any }>) => {
  return (
    <ThemeContext.Provider value={theme || baseTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export let useTheme = () => {
  const base = React.useContext(ThemeContext) || {};
  const theme = Object.assign(base as { [key: string]: any }, {
    get: (...keys: string[]) => get(base, keys.join("."), ""),
    color: (val: string) => get(base, `colors.${val}`, val),
    size: (val: string) => get(base, `sizes.${val}`, val),
    Color: (val: string) => Color(get(base, `colors.${val}`, val)),
  });
  return theme;
};

export const setUseTheme = (useThee) => {
  console.log(useThee);
  useTheme = useThee;
};
