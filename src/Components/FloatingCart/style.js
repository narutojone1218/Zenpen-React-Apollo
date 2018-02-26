import React from 'react'

import styled from 'styled-components';

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'
import { boxShadow } from '../../util/styles/mixins'

//

export default component => (styled(component)`

  position: fixed;
  top: 6em;
  right: 0;
  padding: 1em;
  z-index: 50;

  > .inner {
    padding: 2em;
    border-left: 3px solid #238fce;
    background: rgba(255, 255, 255, 0.82);
    ${boxShadow('0', '1px', '6px', 'rgba(0,0,0,.15)')}
    > .header {
      font-weight: lighter;
      font-size: 2em;
      margin-bottom: 0.4em;
    }
    > .cart-wrapper {
      > .cart-table-wrapper {
        margin-bottom: 1.5em;
      }
      > .cart-actions {
        > button {
          width: 100%;
        }
      }
    }
  }

  ${media.desktop_lr`
    display: none;
  `}

`)
