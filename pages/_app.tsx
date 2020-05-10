import { ThemeContext, useTheme } from "styled-components";
import { RadixProvider } from "@modulz/radix";

setUseTheme(useTheme);

import App from "next/app";
import { setUseTheme } from "../src";

export default class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <RadixProvider>
        <Component {...pageProps} />
      </RadixProvider>
    );
  }
}
