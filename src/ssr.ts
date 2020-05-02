import React from "react";
import { extractCss, MAGIC_ID } from "./stylesheet";

export const extractMagicStyles = () => {
  const css = extractCss();
  return React.createElement("style", {
    id: MAGIC_ID,
    dangerouslySetInnerHTML: { __html: css },
  });
};
