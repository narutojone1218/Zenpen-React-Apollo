import React from 'react'

import styled from 'styled-components';

import media from '../../util/styles/media'
import colors from '../../util/styles/colors'

export default component => (styled(component)`

  > table {
    width: 100%;



    > thead > tr > th {
      text-align: left;
      border-bottom: 1px solid ${colors.gray};
      padding: 0.3em 0.6em;
      &:last-child {
        text-align: right;
      }
    }
    > tbody > tr > td {
      padding: 0.3em 0.4em;
      text-align: left;
      font-weight: 300;
      &:last-child {
        text-align: right;
      }
    }
  }

`)
