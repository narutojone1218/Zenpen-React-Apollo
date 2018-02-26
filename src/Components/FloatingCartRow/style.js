import React from 'react'

import styled from 'styled-components';

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'

export default component => (styled(component)`

  .product-color {
    color: ${({ edge }) => (edge.node.primaryColor)};
  }

`)
