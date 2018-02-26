import { serverFactory } from 'inferno-crm-ssr-server'
import path from 'path'
import webpackIsomorphicToolsConfiguration from '../webpack/webpack-isomorphic-tools-configuration'
import ssrProvider from '../dist/ssr.provider'

const vhosts = [
  {
    hosts: [
      'crm.myzenpen.com',
      'localhost',
      'myzenpen.local',
      'myzenpen.fermi.io',
    ],
    root: path.resolve(__dirname, '..'),
    assets: path.resolve(__dirname, '../dist'),
    jwt: {
      issuer: 'https://www.myzenpen.com',
      audience: 'store',
    },
    ssr: {
      app: 'dist/prerender.js',
      provider: ssrProvider,
      loadableModules: 'react-loadable.json',
    },
    webpack: {
      isomorphicToolsConfiguration: webpackIsomorphicToolsConfiguration,
    },
  },
]

const server = serverFactory({}, vhosts)

server.run()
