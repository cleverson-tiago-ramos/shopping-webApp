import type { NextConfig } from "next";

/**
 * Configuração compartilhada entre os apps (site, admin, etc.)
 */
export function withSharedConfig(customConfig: NextConfig = {}): NextConfig {
  return {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ["localhost"], // ajuste conforme necessário
    },
    ...customConfig,
  };
}
