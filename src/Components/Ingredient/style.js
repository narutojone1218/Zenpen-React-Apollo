import React from 'react'

import styled from 'styled-components'

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'


//

export default component => (styled(component)`

  text-align: center;
  
  > img {
    display: inline-block;
    width: 4em;
    margin-bottom: 0.5em;
  }

  > p {
    font-weight: 300;
    color: ${colors.blackish};
    font-size: 80%;
    margin: 0 -1em;
  }

  ${media.phone`
    > img {
      width: 3em;
      margin-bottom: 0;
    }
    > p {
      display: none;
    }
  `}

`)
