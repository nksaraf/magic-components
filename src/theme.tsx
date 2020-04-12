import React from "react";
import { baseTheme } from "./base-theme";
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
export const useTheme = () => {
  return React.useContext(ThemeContext) || {};
};
