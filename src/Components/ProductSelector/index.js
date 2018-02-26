import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
import styled from 'styled-components'
import SectionLoader from '../SectionLoader'
import VerticalProductBox from '../VerticalProductBox'
import colors from '../../util/styles/colors'

const ProductSelectorWrapper = styled.div`
  position: relative;
  min-height: 300px;
`

const MoreInfoLinkStyled = styled(Link)`
  color: ${colors.gray};
`

const ProductWrapper = styled.div`
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
`

const ProductSelector = ({ data, onSelect }) => {
  let innerComponent = null
  if (!data.loading) {
    innerComponent = data.viewer.products.edges.map(({ node }) => (
      <ProductWrapper key={node.id} onClick={() => (onSelect(node))}>
        <VerticalProductBox shiftIconLeft product={node}>
          <MoreInfoLinkStyled onClick={e => e.stopPropagation()} to={`/blends/${node.slug}`}>More Info...</MoreInfoLinkStyled>
        </VerticalProductBox>
      </ProductWrapper>
    ))
  }
  return (
    <ProductSelectorWrapper>
      <SectionLoader isVisible={data.loading} size="medium" />
      {innerComponent}
    </ProductSelectorWrapper>
  )
}

ProductSelector.defaultProps = {
  onSelect: (() => {}),
}

export default graphql(gql`
  query ProductSelectorQuery {
    viewer {
      id
      products: allProducts {
        edges {
          node {
            id
            slug
            ...VerticalProductBox_product
          }
        }
      }
    }
  }
  ${VerticalProductBox.fragments.product}
`)(ProductSelector)
