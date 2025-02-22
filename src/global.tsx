import { addCSS, sheet } from "./stylesheet";
import { useTheme } from "./theme";
import { strictCssParser, linientCssParser } from "./core/css-parser";
import React from "react";
import { magic } from "./core/magic";

const globalCache: { [key: string]: any } = {};

declare global {
  namespace Magic {
    interface MagicComponents {
      css: React.ComponentType<StyleTagProps>;
      style: React.ComponentType<StyleTagProps>;
    }

    interface HTMLElementProps {
      css?: StyleTagProps;
    }
  }
}

export interface GlobalStyleProps {
  style?: {
    [k: string]: Magic.StyleProps;
  };
  css?: {
    [k: string]: Magic.StyleProps;
  };
  id?: string;
}

export const Global = ({ style = {}, css = {}, id }: GlobalStyleProps) => {
  const theme = useTheme();
  React.useMemo(() => {
    if (id && globalCache[id]) {
      return;
    }

    const styles: any = {};
    for (var item in style) {
      const styleCss = linientCssParser(style[item], theme);
      styles[item] = styleCss;
    }
    for (var item in css) {
      const cssCss = linientCssParser(css[item], theme);
      styles[item] = cssCss;
    }
    if (id) {
      globalCache[id] = styles;
    }
    return addCSS(styles, sheet, true, false);
  }, [id]);

  return <></>;
};

export interface StyleTagProps
  extends GlobalStyleProps,
    Magic.MagicUtilityProps {
  jsx?: boolean;
}

export const styleElements = ["style"];

export const Style = ({
  jsx = false,
  noMagic = false,
  muggle = false,
  ...props
}: StyleTagProps) => {
  // for trying to be compliant with styled-jsx but its not working
  if (jsx) {
    return React.createElement("style", { jsx, ...props });
  }

  if (noMagic || muggle) {
    return React.createElement("style", { ...props });
  }

  return React.createElement(Global, props);
};

Style.displayName = "Magic(style)";
magic.style = Style;

magic.css = Style.bind({});
magic.css.displayName = "Magic(css)";

export function important<T>(s: T): T {
  if (typeof s === "string") {
    return (`${s} !important` as unknown) as T;
  } else {
    return Object.fromEntries(
      Object.entries(s).map(([key, value]) => [key, important(value)])
    );
  }
}

export const css = (props: Magic.CSSProp["css"]) => {
  const theme = useTheme();
  const cssStyles = linientCssParser(props, theme);
  return addCSS(cssStyles, sheet, false, false);
};

export const glob = (props: GlobalStyleProps["css"]) => {
  const theme = useTheme();
  const cssStyles = linientCssParser(props, theme);
  return addCSS(cssStyles, sheet, true, false);
};

export const withGlobalStyle = (
  id: string,
  css: {
    [k: string]: any;
  },
  Component: any
) => {
  return React.forwardRef((props, ref) => (
    <>
      <Global id={id} css={css} />
      <Component ref={ref} {...props} />
    </>
  ));
};
