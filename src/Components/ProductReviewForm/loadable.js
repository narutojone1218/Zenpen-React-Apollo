import React from 'react'
import Loadable from 'react-loadable'
import SectionLoader from '../SectionLoader'

export default Loadable({
  loader: () => import('./index'),
  loading() {
    return <SectionLoader isVisible />
  }
})
