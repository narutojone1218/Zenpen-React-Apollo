import styled from 'styled-components'
import CartRow from '../CartRow'

export const CartRowStyled = styled(CartRow)`
  &:nth-child(odd) {
    background-color: #efefef;
  }
  &:nth-child(even) {
    background-color: white;
  }
`

export const CartTableWrapper = styled.div`
  ${CartRowStyled} {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
