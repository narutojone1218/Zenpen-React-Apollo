import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import NavBarCart from '../NavBarCart'
import NavBarBundleBuilder from '../NavBarBundleBuilder'
import * as C from './components'

const isActive = (currentUrl, linkUrl) => ((currentUrl || '').indexOf(linkUrl) === 0)

const NavComponent = ({
  currentUrl, isOpen, onToggleMenu, onMenuItemSelected,
}) => (
  <nav>
    <C.NavBarExpandedContainer>
      <C.NavBarLinksContainer>
        <C.NavBarNavLink className={isActive(currentUrl, '/blends') ? 'active' : ''} onClick={onMenuItemSelected} to="/blends">
          <i className="fa fa-leaf" aria-hidden="true" /> blends & benefits
        </C.NavBarNavLink>
        <C.NavBarNavLink className={isActive(currentUrl, '/how-it-works') ? 'active' : ''} onClick={onMenuItemSelected} to="/how-it-works">
          <i className="fa fa-magic" aria-hidden="true" /> how it works
        </C.NavBarNavLink>
        <C.NavBarNavLink className={isActive(currentUrl, '/blog') ? 'active' : ''} onClick={onMenuItemSelected} to="/blog">
          <i className="fa fa-rss" aria-hidden="true" /> blog
        </C.NavBarNavLink>
        <C.NavBarNavLink className={isActive(currentUrl, '/faq') ? 'active' : ''} onClick={onMenuItemSelected} to="/faq">
          <i className="fa fa-question-circle-o" aria-hidden="true" /> faq
        </C.NavBarNavLink>
      </C.NavBarLinksContainer>
    </C.NavBarExpandedContainer>
    <C.NavBarCollapsedContainer>
      <C.NavBarLinksContainer>
        <C.NavBarNavLink className={isActive(currentUrl, '/blends') ? 'active' : ''} onClick={onMenuItemSelected} to="/blends">
          <i className="fa fa-leaf" aria-hidden="true" /> blends & benefits
        </C.NavBarNavLink>
        <C.NavBarNavLink className={isActive(currentUrl, '/how-it-works') ? 'active' : ''} onClick={onMenuItemSelected} to="/how-it-works">
          <i className="fa fa-magic" aria-hidden="true" /> how it works
        </C.NavBarNavLink>
        <C.NavBarNavLink className={isActive(currentUrl, '/blog') ? 'active' : ''} onClick={onMenuItemSelected} to="/blog">
          <i className="fa fa-rss" aria-hidden="true" /> blog
        </C.NavBarNavLink>
        <C.NavBarNavLink className={isActive(currentUrl, '/faq') ? 'active' : ''} onClick={onMenuItemSelected} to="/faq">
          <i className="fa fa-question-circle-o" aria-hidden="true" /> faq
        </C.NavBarNavLink>
      </C.NavBarLinksContainer>
    </C.NavBarCollapsedContainer>
  </nav>
)

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false }
    this.handleToggleMenu = this.handleToggleMenu.bind(this)
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this)
  }

  handleToggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleMenuItemSelected() {
    this.setState({ menuOpen: false })
  }

  makeNavBarComponents() {
    let dropNav = null
    let bundleBuilderComponent = null

    const navComponentProps = {
      isOpen: this.state.menuOpen,
      onToggleMenu: this.handleToggleMenu,
      onMenuItemSelected: this.handleMenuItemSelected,
    };

    if (this.state.menuOpen) {
      dropNav = (
        <div className="drop-nav">
          <NavComponent {...navComponentProps} />
        </div>
      )
    }

    if (this.props.viewer.userBundle) {
      bundleBuilderComponent = (
        <C.NavBarActionWrapper>
          <NavBarBundleBuilder userBundle={this.props.viewer.userBundle} />
        </C.NavBarActionWrapper>
      )
    }

    return (
      <C.NavBarLeftContainer className="navbar-wrapper">
        <C.NavBarActionsContainer className="navbar-actions">
          {bundleBuilderComponent}
          <C.NavBarActionWrapper>
            <NavBarCart viewer={this.props.viewer} />
          </C.NavBarActionWrapper>
          <C.NavBarActionWrapper>
            <C.NavBarAccountButton className="navbar-account">
              <i className="fa fa-user" />
              <span>Account</span>
            </C.NavBarAccountButton>
          </C.NavBarActionWrapper>
          <C.NavBarActionWrapper>
            <C.NavBarHamburger />
          </C.NavBarActionWrapper>
        </C.NavBarActionsContainer>
        <NavComponent currentUrl={this.props.location.pathname} {...navComponentProps} />
        {dropNav}
      </C.NavBarLeftContainer>
    )
  }

  render() {
    let navBarComponents = null
    if (this.props.enabled) {
      navBarComponents = this.makeNavBarComponents()
    }
    return (
      <C.NavBarWrapper>
        <C.NavBarContainer>
          <C.NavBarBrand onClick={this.handleMenuItemSelected} to="/" />
          {navBarComponents}
        </C.NavBarContainer>
      </C.NavBarWrapper>
    )
  }
}

NavBar.fragments = {
  viewer: gql`
    fragment NavBar_viewer on Viewer {
      id
      ...NavBarCart_viewer
      userBundle {
        id
        ...NavBarBundleBuilder_userBundle
      }
    }
    ${NavBarCart.fragments.viewer}
    ${NavBarBundleBuilder.fragments.userBundle}
  `,
}

export default compose(withRouter)(NavBar)
