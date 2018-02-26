import React from 'react'

import styled from 'styled-components';

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'

export default component => (styled(component)`

    transition: all .2s;
    background: #f7f7f7;
    border: 1px solid #f1f1f1;
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
    cursor: pointer;

    > span {
      font-size: 90%;
      margin-right: 1rem;
      > i {
        margin-right: 0.65rem;
        color: ${colors.brand};
      }
    }
    
    > div {
      vertical-align: middle;
      display: inline-block;
      width: 6rem;
      height: 0.5rem;
      background: #b9b9b9;
      border-radius: 0.3rem;
      line-height: 0.1rem;
      margin: 0.1rem 0;
      
      > div {
        transition: width .2s;
        width: ${({ viewer }) => (((viewer.cart.quantity / 3) > 1 ? 1 : viewer.cart.quantity / 3) * 100)}%;
        height: 0.5rem;
        background: ${colors.brand};
        border-radius: 0.3rem;
      }
      
    }

`)
