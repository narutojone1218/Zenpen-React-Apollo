import Loadable from 'react-loadable'
import app from './index'

export default app

export const preload = () => Loadable.preloadAll()
