import React from "react";
export const ThemeContext = React.createContext<any>({});
export const ThemeProvider = ({
  theme = {},
  children,
}: React.PropsWithChildren<{ theme: any }>) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => {
  return React.useContext(ThemeContext) || {};
};
