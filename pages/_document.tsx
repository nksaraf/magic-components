import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { extractCss, GOOBER_ID } from "magic-components";

export default class MyDocument extends Document<{ css: string }> {
  static async getInitialProps(props: DocumentContext) {
    const documentProps = await Document.getInitialProps(props);
    const { renderPage } = props;
    const page = renderPage();
    const styles = extractCss();

    return { ...documentProps, ...page, css: styles };
  }

  render() {
    return (
      <html>
        <Head>
          <style
            id={GOOBER_ID}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
