const path = require('path')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const WebpackIsomorphicToolsPluginConfiguration = require('./webpack-isomorphic-tools-configuration')

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsPluginConfiguration)

module.exports = {
  context: path.resolve(__dirname, '..'),
  module: {
    loaders: [
      {
        test: /images\/favicons/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: '[name].[ext]',
        },
      },
      {
        test: /node_modules\/fsevents\/node_modules\/rc\/index\.js$/i,
        use: require.resolve('./loaders/remove-hashbang-loader'),
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('other_images'),
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[hash].[ext]',
            },
          },
        ],
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
            },
          },
        ],
        exclude: [/photos/],
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loaders: [
          {
            loader: require.resolve('./loaders/sqip-loader'),
          },
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
            },
          },
        ],
        include: [/photos/],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[hash].[ext]',
              mimetype: 'mimetype=image/svg+xml',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      name: 'My ZenPen',
      short_name: 'MyZenPen',
      description: 'My ZenPen',
      background_color: '#ffffff',
    }),
  ],
};
