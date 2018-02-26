const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const WebpackIsomorphicToolsPluginConfiguration = require('./webpack-isomorphic-tools-configuration')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsPluginConfiguration)
const MinifyPlugin = require('babel-minify-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeJsPlugin = require("optimize-js-plugin")

module.exports = merge(common, {
  entry: {
    app: [
      path.resolve(__dirname, '../src/app.js'),
    ],
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
                  browsers: [
                    'last 2 versions',
                    'not IE <= 10',
                  ],
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              ['graphql-tag'],
              ['styled-components', {
                displayName: false,
              }],
              ['transform-object-rest-spread'],
              ['@babel/transform-modules-commonjs', {}],
              ['@babel/syntax-dynamic-import', {}],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize=true!sass-loader',
        }),
      },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize=true',
        }),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    publicPath: '/static/',
  },
  devtool: false,
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
        PUBLIC_URL_BASE: JSON.stringify(process.env.PUBLIC_URL_BASE),
        GOOGLE_PLACES_API_KEY: JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
        GOOGLE_TAG_MANAGER_ID: JSON.stringify(process.env.GOOGLE_TAG_MANAGER_ID),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
    new OptimizeJsPlugin({
      sourceMap: false,
    }),
    webpackIsomorphicToolsPlugin,
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, '../react-loadable.json'),
    }),
  ],
});
