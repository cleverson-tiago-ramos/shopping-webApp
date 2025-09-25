// apps/admin/src/pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "sonner";
import "@/assets/styles/main.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Vantage App - Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />

      <Toaster richColors position="top-right" />
    </>
  );
}
