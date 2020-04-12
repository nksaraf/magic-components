import { hash, sheet } from "./stylesheet";
import { useTheme } from "./theme";
import { cssParser } from "./magic";

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
  const memo = React.useMemo(() => {
    const styles: any = {};
    for (var item in style) {
      const [css, _] = cssParser(style[item], theme);
      styles[item] = css;
    }
    return hash(styles, sheet, true, true);
  }, []);

  return <></>;
};
