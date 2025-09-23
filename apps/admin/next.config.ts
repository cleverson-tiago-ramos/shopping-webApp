import { withSharedConfig } from "../../config/base";
import type { NextConfig } from "next";

const customAdminConfig: NextConfig = {
  env: {
    ADMIN_NAME: "Painel Administrativo",
  },
};

export default withSharedConfig(customAdminConfig);
