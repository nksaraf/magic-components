import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { extractStyleTag } from "../src";

export default class MyDocument extends Document<{ style: any }> {
  static async getInitialProps(props: DocumentContext) {
    const documentProps = await Document.getInitialProps(props);
    const { renderPage } = props;
    const page = renderPage();
    const style = extractStyleTag();
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
