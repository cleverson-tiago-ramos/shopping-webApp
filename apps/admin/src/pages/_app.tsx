// apps/admin/src/pages/_app.tsx
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import "@/assets/styles/main.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </>
  );
}
