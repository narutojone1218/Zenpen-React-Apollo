import { serverFactory } from 'inferno-crm-ssr-server'
import path from 'path'
import webpackConfig from '../webpack/webpack.config.development'
import webpackIsomorphicToolsConfiguration from '../webpack/webpack-isomorphic-tools-configuration'
import ssrProvider from './ssr.provider'

const vhosts = [
  {
    hosts: [
      'localhost',
      'myzenpen.local',
    ],
    root: path.resolve(__dirname, '..'),
    assets: path.resolve(__dirname, '../dist'),
    jwt: {
      issuer: 'https://www.myzenpen.com',
      audience: 'store',
    },
    ssr: {
      app: 'src/Containers/App/index.js',
      provider: ssrProvider,
      loadableModules: 'react-loadable.json',
    },
    webpack: {
      config: webpackConfig,
      isomorphicToolsConfiguration: webpackIsomorphicToolsConfiguration,
    },
  },
]

const server = serverFactory({}, vhosts)

server.run()
