import { withSharedConfig } from "../../config/base";
import path from "path";
import type { NextConfig } from "next";

const customAdminConfig: NextConfig = {
  env: {
    ADMIN_NAME: "Painel Administrativo",
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default withSharedConfig(customAdminConfig);
