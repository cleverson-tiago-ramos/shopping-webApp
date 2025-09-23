import { withSharedConfig } from "../../config/base";
import type { NextConfig } from "next";

const customSiteConfig: NextConfig = {
  env: {
    SITE_NAME: "Shopping WebApp",
  },
};

export default withSharedConfig(customSiteConfig);
