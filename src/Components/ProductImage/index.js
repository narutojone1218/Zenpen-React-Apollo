import gql from 'graphql-tag'
import styled from 'styled-components'

import {
  product as productImages,
} from '../../assets/images'

const ProductImage = styled.div`
  display: block;
  height: ${({ height }) => (height)}px;
  width: ${({ width }) => (width)}px;

  background: url(${({ product }) => (productImages[product.slug].primary)});
  background-position: ${({ position }) => (position)};
  background-size: cover;
  background-repeat: no-repeat;
  
  line-height: 0;
`

ProductImage.fragments = {
  product: gql`
    fragment ProductImage_product on Product {
      id
      slug
    }
  `,
}

ProductImage.defaultProps = {
  height: 100,
  width: 100,
  position: 'right',
}

export default ProductImage
