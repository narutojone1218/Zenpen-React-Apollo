import React from 'react'

import styled from 'styled-components';
import colors from '../../util/styles/colors'

export default component => (styled(component)`
  padding: 0;
  
  > li {
    display: inline-block;
    
    > .grayStar {
      color: ${colors.gray};
    }
    
    > .ratingStar {
      color: ${colors.brand};
    }
  }
`)
