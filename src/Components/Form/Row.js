import styled from 'styled-components'
import media from '../../util/styles/media'

const Row = styled.div`
  display: flex;
  padding: 0 0.5em 0 0.5em;
  margin: 15px 0;
  ${({ noBottomMargin }) => (noBottomMargin ? `
    margin-bottom: 0;
  ` : '')}
  ${({ noTopMargin }) => (noTopMargin ? `
    margin-top: 0;
  ` : '')}
  ${({ special }) => (special ? `
    background-color: #e2e2e2;
    border-radius: 0.3em;
  ` : '')}
  ${({ responsive }) => (responsive ? `
    ${media.phone`
      flex-direction: column;
    `}
  ` : '')}
`

Row.defaultProps = {
  special: false,
  noBottomMargin: false,
  noTopMargin: false,
}

export default Row
