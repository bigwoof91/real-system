const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  stories: ['../packages/**/*.stories.@(mdx|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-performance',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    'storybook-addon-playroom',
  ],
  typescript: {
    // enable type checking
    check: true,
    checkOptions: {
      // check all ts and tsx files
      reportFiles: ['packages/**/*.{ts,tsx}'],
    },
    reactDocgen: 'react-docgen-typescript',
    // these options will include styled-system props
    reactDocgenTypescriptOptions: {
      skipPropsWithoutDoc: false,
      shouldExtractLiteralValuesFromEnum: true,
      // don't include node_module props as you'll cause the machine to run out of memory on our repo
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  webpackFinal: async (config) => {
    const customPlugins = [
      new DirectoryNamedWebpackPlugin({
        honorPackage: ['main:dev', 'main'],
        exclude: /node_modules/,
      }),
    ];

    config.resolve.plugins = [...config.resolve.plugins, ...customPlugins];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      'emotion-theming': '@emotion/react',
    };

    console.table(config.resolve.alias);

    return config;
  },
  features: {
    babelModeV7: true,
  },
};
