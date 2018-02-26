import React from 'react'

import styled from 'styled-components'

const Field = styled.div`
  position: relative;
  width: 100%;
  margin: 0 5px;
  display: flex;
  align-items: center;
  flex: ${({ flex }) => (_ => flex)};
`

Field.defaultProps = {
  flex: 1,
}

export default Field
