import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript } } = context;
    const { html, head, errorHtml, chunks } = context.renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles, locale, localeDataScript };
  }

  render() {
    return (
      <html>
        <Head>
          <title>SYNC</title>
          <link rel="shortcut icon" href="/static/c-icon-128.png" />
          <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <meta charset="utf-8"/>
          <meta name="theme-color" content="#000000"/>
        </Head>
        <body className="custom_class">
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
       <script src="https://sdk.scdn.co/spotify-player.js"></script>
       
          {this.props.customValue}
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
