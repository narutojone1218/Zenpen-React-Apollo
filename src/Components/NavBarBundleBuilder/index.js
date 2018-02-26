import React from 'react'
import gql from 'graphql-tag'
import ProductIcon from '../ProductIcon'
import * as C from './components'

const NavBarBundleBuilder = ({ userBundle }) => {
  const remaining = userBundle.bundleConfig.quantity - userBundle.products.edges.length

  const placeholderIcons = []
  for (let i = 0; i < remaining; i++) {
    placeholderIcons.push(<i key={i} className="fa fa-circle-o placeholder" />)
  }

  return (
    <C.NavBarBundleBuilderWrapper>
      <C.NavBarBundleBuilderLink to="/bundles/builder">
        <C.NavBarBundleBuilderTitle>My Bundle</C.NavBarBundleBuilderTitle>
        <C.NavBarBundleBuilderProductIcons className="product-icons">
          {userBundle.products.edges.map(({ node, id }, idx) => (
            <ProductIcon key={`${idx}_${(id || 'no-selection')}`} forceIcon="fa fa-circle" product={node} />
          ))}
          {placeholderIcons}
        </C.NavBarBundleBuilderProductIcons>
      </C.NavBarBundleBuilderLink>
    </C.NavBarBundleBuilderWrapper>
  )
}

NavBarBundleBuilder.fragments = {
  userBundle: gql`
    fragment NavBarBundleBuilder_userBundle on UserBundle {
      bundleConfig {
        id
        quantity
        slug
      }
      products {
        edges {
          id
          node {
            id
            ...ProductIcon_product
          }
        }
      }
    }
    ${ProductIcon.fragments.product}
  `,
}

export default NavBarBundleBuilder
