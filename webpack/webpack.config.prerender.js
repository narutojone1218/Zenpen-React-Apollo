const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const WebpackIsomorphicToolsPluginConfiguration = require('./webpack-isomorphic-tools-configuration')

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsPluginConfiguration)
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = merge(common, {
  entry: {
    prerender: [
      path.resolve(__dirname, '../src/Containers/App/prerender.js'),
    ],
    'ssr.provider': [
      path.resolve(__dirname, '../ssr/ssr.provider.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/static/',
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            babelrc: false,
            presets: [
              ['@babel/env', {
                targets: {
                  node: 'current',
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              ['graphql-tag'],
              ['styled-components', {
                ssr: true,
                displayName: false,
              }],
              ['transform-object-rest-spread'],
              ['@babel/transform-modules-commonjs', {}],
              ['dynamic-import-node'],
              ['react-loadable/babel'],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  stats: {
    children: false,
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
        PUBLIC_URL_BASE: JSON.stringify(process.env.PUBLIC_URL_BASE),
        GOOGLE_PLACES_API_KEY: JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
        GOOGLE_TAG_MANAGER_ID: JSON.stringify(process.env.GOOGLE_TAG_MANAGER_ID),
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new MinifyPlugin(
      {
        removeConsole: true,
        removeDebugger: true,
      },
      {
        comments: false,
        sourceMap: false,
      },
    ),
    webpackIsomorphicToolsPlugin,
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, '../react-loadable.json'),
    }),
  ],
});
