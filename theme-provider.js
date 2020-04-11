const ThemeContext = React.createContext({ theme: {} });
const ThemeProvider = ({ theme = {}, children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
const useTheme = () => {
  return React.useContext(ThemeContext) || {};
};
