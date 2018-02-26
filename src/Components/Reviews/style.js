import React from 'react'

import styled from 'styled-components';

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'

export default component => (styled(component)`

  > .review {
    background: rgb(255,255,255);
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    padding: 1.5em 1em;    
    max-width: 40em;
    margin: 1em auto;
    text-align: center;    
    
    > .title {
      font-weight: bold;
      margin: 1.2em 0;
    
      > span {
        font-weight: normal;
      }    
    }
    
    > .comment {

    }
  }

`)
