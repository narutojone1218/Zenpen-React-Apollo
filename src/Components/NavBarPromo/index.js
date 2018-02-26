import React from 'react'

import style from './style'
import gql from 'graphql-tag'


class NavBarPromo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    }
  }

  handleToggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleMenuItemSelected() {
    this.setState({ menuOpen: false })
  }

  render() {
    // {this.props.viewer.cart.quantity}

    return (
      <div className={this.props.className}>
        <span><i className="fa fa-star" aria-hidden="true" /> Free ZenPen</span>
        <div><div /></div>
      </div>
    )
  }
}

const NavBarPromoStyled = style(NavBarPromo)

NavBarPromoStyled.fragments = {
  viewer: gql`
    fragment NavBarPromo_viewer on Viewer {
      cart {
        quantity
      }
    }
  `,
}

export default NavBarPromoStyled
