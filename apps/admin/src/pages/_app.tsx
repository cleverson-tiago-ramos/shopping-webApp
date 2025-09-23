// apps/admin/src/pages/_app.tsx
import type { AppProps } from "next/app";
import ToastProvider from "@/components/Toast/ToastProvider";
import "@/assets/styles/main.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
