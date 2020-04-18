import React from 'react';
import { extractCss, GOOBER_ID } from "./stylesheet";

export const extractMagicStyles = () => {
  const css = extractCss();
  return React.createElement("style", {
    id: GOOBER_ID,
    dangerouslySetInnerHTML: { __html: css },
  });
};