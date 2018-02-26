import styled from 'styled-components';
import { Link } from 'react-router-dom'
import media from '../../util/styles/media'
import colors from '../../util/styles/colors'

export const NavBarBundleBuilderWrapper = styled.div`
  transition: all .2s;
  background: #f7f7f7;
  border: 1px solid #f1f1f1;
  border-radius: 0.3em;
  padding: 0.5em 1em;
  cursor: pointer;
  ${media.tablet`
    border: none;
    border-top: 2px solid #25aae1;
    background: white;
    font-size: 150%;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
  `}
  ${media.phone`
    border-top: 1px solid #25aae1;
    font-size: 100%;
  `}
`

export const NavBarBundleBuilderLink = styled(Link)`
  text-decoration: none;
  color: ${colors.black};
`

export const NavBarBundleBuilderTitle = styled.span`
  font-size: 90%;
  margin-right: 1em;
  > i {
    margin-right: 0.65em;
    color: ${colors.brand};
  }
`

export const NavBarBundleBuilderProductIcons = styled.div`
  display: inline-block;
  > i {
    margin-right: 2px;
    &:last-child {
      margin-right: 0;
    }
    &.placeholder {
      color: #cccccc;
    }
  }
`