import colors from '../../util/styles/colors'
import styled from 'styled-components'

export default styled.legend`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1em;
  color: ${colors.darkGray};
  padding: 13px 10px 17px;
  clear: both;
  font-weight: bold;
  pointer-events: none;
`
