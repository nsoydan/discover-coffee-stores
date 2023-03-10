import Document, { Head, Main, NextScript, Html } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="preload" href="/fonts/RobotoSlab-Bold.ttf" as="font" crossOrigin="anonymous" ></link> 
        <link rel="preload" href="/fonts/RobotoSlab-Regular.ttf" as="font" crossOrigin="anonymous" ></link> 
        <link rel="preload" href="/fonts/RobotoSlab-SemiBold.ttf" as="font" crossOrigin="anonymous" ></link> 
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
