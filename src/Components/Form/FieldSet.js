import styled from 'styled-components'
import Row from './Row'

const FieldSet = styled.fieldset`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  border-radius: 0.3em;
  padding: 3px;
  border: none;
  position: relative;
`

FieldSet.defaultProps = {
  standalone: false,
}

export default FieldSet