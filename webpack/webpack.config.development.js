const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const WebpackIsomorphicToolsPluginConfiguration = require('./webpack-isomorphic-tools-configuration')

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsPluginConfiguration)

module.exports = merge(common, {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      path.resolve(__dirname, '../src/app.js'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/i,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              compact: false,
              babelrc: false,
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: [
                      'last 2 versions',
                      'not IE <= 10',
                    ],
                  },
                }],
                '@babel/preset-react',
              ],
              plugins: [
                ['styled-components', {
                  displayName: true,
                }],
                ['transform-object-rest-spread'],
                ['graphql-tag'],
                ['react-hot-loader/babel'],
                ['@babel/transform-modules-commonjs', {}],
                ['@babel/syntax-dynamic-import', {}],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  devtool: 'eval',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
        PUBLIC_URL_BASE: JSON.stringify(process.env.PUBLIC_URL_BASE),
        GOOGLE_PLACES_API_KEY: JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
        GOOGLE_TAG_MANAGER_ID: JSON.stringify(process.env.GOOGLE_TAG_MANAGER_ID),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    webpackIsomorphicToolsPlugin.development(),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, '../react-loadable.json'),
    }),
  ],
});