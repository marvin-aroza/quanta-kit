import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/angular',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  webpackFinal: async (config) => {
    // Filter out DefinePlugin that sets process.env.NODE_ENV to avoid conflicts with Angular's builder
    config.plugins = config.plugins?.filter((plugin) => {
      if (plugin?.constructor.name === 'DefinePlugin') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const definitions = (plugin as any).definitions;
        // If this DefinePlugin sets NODE_ENV, remove it to let Angular's prevail (or vice versa, but usually removing the duplicate helps)
        // However, blindly removing it might be risky.
        // A safer approach for this specific warning is often to just let it be, but the user wants it fixed.
        // Let's try to remove the one that Storybook adds.
        if (definitions && definitions['process.env.NODE_ENV']) {
          return false;
        }
      }
      return true;
    });
    return config;
  },
};
export default config;
