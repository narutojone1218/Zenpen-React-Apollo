import React from 'react'

import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../util/styles/colors'

const StyledLink = styled(Link)`
 text-decoration: none;
 color: white;
 transition: all .2s;
`

const NavBarCartWrapper = styled.div`
  cursor: pointer;
  transition: all .2s;
  background: ${colors.orange};
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  transition: all .2s;
  &.pulse {
    background: white;
    ${StyledLink} {
      color: ${colors.orange};
    }
  }
`

const StyledIcon = styled.i`
  margin-right: 0.65rem;
`

class NavBarCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pulse: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewer.cart && this.props.viewer.cart && nextProps.viewer.cart.quantity !== this.props.viewer.cart.quantity) {
      this.pulse()
    }
  }

  pulse() {
    if (this.state.pulse === true) {
      return
    }
    this.setState({ pulse: true })
    setTimeout(() => this.setState({ pulse: false }), 200)
  }

  render() {
    const { viewer, className = '' } = this.props
    if (!viewer.cart) {
      return null
    }
    return (
      <NavBarCartWrapper className={`${className}${this.state.pulse ? ' pulse' : ''}`}>
        <StyledLink to="/cart">
          <StyledIcon className="fa fa-shopping-cart" />
          <span>{viewer.cart.quantity}</span>
        </StyledLink>
      </NavBarCartWrapper>
    )
  }
}

NavBarCart.fragments = {
  viewer: gql`
    fragment NavBarCart_viewer on Viewer {
      cart {
        quantity
      }
    }
  `,
}

export default NavBarCart
