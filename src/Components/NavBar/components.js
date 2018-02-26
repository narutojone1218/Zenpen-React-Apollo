import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../util/styles/colors'
import { main } from '../../assets/images'
import media from '../../util/styles/media'

export const NavBarWrapper = styled.div`
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.94);;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  border-bottom: 0.01em solid white;
`

export const NavBarContainer = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const NavBarLeftContainer = styled.div`
  flex: 1;
  padding: 1rem 1rem 1rem 0;
  text-align: right;
  ${media.phone`
    padding-right: 0;
  `}
`

export const NavBarActionsContainer = styled.div`
  margin-bottom: 1rem;
  ${media.tablet`
    margin-bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `}
`

export const NavBarActionWrapper = styled.div`
  display: inline-block;
  line-height: 1rem;
  margin: 0 1rem 0 0;
  &:last-child {
    margin-right: 0;
  }
  ${media.phone`
    font-size: 100%;
    margin-right: 0.2rem;
  `}
`

export const NavBarAccountButton = styled.div`
  cursor: pointer;
  transition: all .2s;
  color: #b9b9b9;
  background: #f7f7f7;
  border: 1px solid #f1f1f1;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  text-shadow: 0 1px 1px rgba(0,0,0,0);
  > i {
    margin-right: 0.65rem;
  }
  &:hover {
    background: #23a3dd;
    color: white;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  ${media.tablet`
    display: none;
  `}
`

export const NavBarLinksContainer = styled.div`

`

export const NavBarExpandedContainer = styled.div`
  display: block;
  ${media.tablet`
    display: none;
  `}
`

export const NavBarCollapsedContainer = styled.div`
  display: none;
  ${media.tablet`
    ${NavBarLinksContainer} {
      display: block;
    }
  `}
`

export const NavBarHamburgerWrapper = styled.div`
  cursor: pointer;
  transition: all .2s;
  color: ${colors.blackish};
  background: #f7f7f7;
  border: 1px solid #f1f1f1;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  text-shadow: 0 1px 1px rgba(0,0,0,0);
  display: none;
  ${media.tablet`
    display: block;
    font-size: 200%;
  `}
  ${media.phone`
    font-size: 100%;
  `}
`

export const NavBarHamburger = () => (
  <NavBarHamburgerWrapper>
    <i className="fa fa-bars" />
  </NavBarHamburgerWrapper>
)

export const NavBarBrand = styled(Link)`
  cursor: pointer;
  background: url(${main.logo}) left no-repeat;
  background-size: auto 75%;
  margin-left: 1rem;
  height: 4.5rem;
  width: 13rem;
  ${media.phone`
    margin-left: 0;
    height: 3.5rem;
    width: 10rem;
  `}
`

export const NavBarNavLink = styled(Link)`
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: .02rem;
  font-weight: 300;
  transition: all .2s;
  margin: 0 2rem 0 0;
  &:last-child {
    margin-right: 0;
  }
  font-size: 1rem;
  color: ${colors.black};
  > i {
    display: none;
  }
  &:visited {
    color: ${colors.black};
  }
  &:active {
    color: ${colors.black};
  }
  &:hover {
    color: ${colors.brandDark};
  }
  &.active {
    color: ${colors.brandDark};
  }
`