import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const getAbsolutePath = (packageName) =>
  dirname(require.resolve(join(packageName, "package.json")));

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  framework: "@storybook/react-vite",
  staticDirs: [{ from: "../static", to: "/static" }],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    enableCrashReports: false,
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
};
export default config;
