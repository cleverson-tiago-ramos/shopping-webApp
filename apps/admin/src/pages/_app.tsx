// apps/admin/src/pages/_app.tsx
import "@/assets/styles/main.scss"; // aqui vai o global SCSS

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
