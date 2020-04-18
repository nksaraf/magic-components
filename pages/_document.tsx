import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { extractMagicStyles } from "magic-components";

export default class MyDocument extends Document<{ style: any }> {
  static async getInitialProps(props: DocumentContext) {
    const documentProps = await Document.getInitialProps(props);
    const { renderPage } = props;
    const page = renderPage();
    const style = extractMagicStyles();
    return { ...documentProps, ...page, style };
  }

  render() {
    return (
      <html>
        <Head>{this.props.style}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
