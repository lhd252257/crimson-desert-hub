import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="bg-black text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
