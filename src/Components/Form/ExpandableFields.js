import styled from 'styled-components'

const ExpandableFields = styled.div`
  overflow-y: hidden;
  max-height: 0;
  transition-property: all;
  transition-duration: .3s;
  overflow-y: inherit;
  max-height: 1000px; 
`

export default ExpandableFields
