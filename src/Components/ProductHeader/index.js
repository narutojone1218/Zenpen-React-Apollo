import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import { ShareButtons } from 'react-share'
import * as C from './components'
import ProductIconBackground from '../ProductIconBackground'
import { MediaQueryComponent } from '../../util/styles/media'

const {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
} = ShareButtons;

import {
  withTelemetryOnMounted,
} from '../Telemetry'

import {
  product as productImages,
} from '../../assets/images'

const ProductHeader = ({ product, viewer }) => {
  let shareUrl = null

  if (__DEVELOPMENT__) {
    shareUrl = 'https://myzenpen.fermi.io/blends/relax'
  } else if (__CLIENT__) {
    shareUrl = window.location.href
  }

  return (
    <C.ProductHeaderWrapper>
      <C.ProductHeaderLeftWrapper product={product}>
        <C.ProductHeaderLightenWrapper>
          <C.SplitPlacementWrapper>
            <C.SplitPlacementContainer>
              <C.ProductImageStyled src={productImages[product.slug].primary} />
              <MediaQueryComponent.notTablet>
                <C.ProductDescription product={product} />
              </MediaQueryComponent.notTablet>
            </C.SplitPlacementContainer>
          </C.SplitPlacementWrapper>
        </C.ProductHeaderLightenWrapper>
      </C.ProductHeaderLeftWrapper>
      <C.ProductHeaderRightWrapper product={product}>
        <C.SocialSharingCenter>
          <C.SocialShareIcons product={product}>
            <FacebookShareButton url={shareUrl}>
              <i className="fa fa-facebook" />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <i className="fa fa-twitter" />
            </TwitterShareButton>
            <PinterestShareButton url={shareUrl}>
              <i className="fa fa-pinterest-p" />
            </PinterestShareButton>
          </C.SocialShareIcons>
        </C.SocialSharingCenter>
        <C.SplitPlacementWrapper>
          <C.SplitPlacementContainer>
            <C.ProductPrice product={product} />
            <C.ProductHeaderRightInnerTop>
              <C.ProductTitle product={product} />
            </C.ProductHeaderRightInnerTop>
            <C.ProductActions product={product} userBundle={viewer.userBundle} />
            <MediaQueryComponent.tablet>
              <C.ProductDescription product={product} />
            </MediaQueryComponent.tablet>
          </C.SplitPlacementContainer>
          <ProductIconBackground responsive={false} product={product} iconRight={0.05} iconBottom={-0.2} iconSize={25} />
        </C.SplitPlacementWrapper>
      </C.ProductHeaderRightWrapper>
    </C.ProductHeaderWrapper>
  )
}

ProductHeader.fragments = {
  product: gql`
    fragment ProductHeader_product on Product {
      id
      title
      slug
      ...ProductHeaderRightWrapper_product
      ...ProductTitle_product
      ...ProductPrice_product
      ...ProductActions_product
      ...ProductDescription_product
      ...ProductIconBackground_product
    }
    ${C.ProductHeaderRightWrapper.fragments.product}
    ${C.ProductTitle.fragments.product}
    ${C.ProductPrice.fragments.product}
    ${C.ProductActions.fragments.product}
    ${C.ProductDescription.fragments.product}
    ${ProductIconBackground.fragments.product}
  `,
  viewer: gql`
    fragment ProductHeader_viewer on Viewer {
      userBundle {
        ...ProductActions_userBundle
      }
    }
    ${C.ProductActions.fragments.userBundle}
  `,
}

const telemetryEcommerceDetail = withTelemetryOnMounted(
  'emitEcommerceDetail',
  ({ product }) => ({
    id: product.id,
    name: product.title,
  }),
)

export default compose(telemetryEcommerceDetail)(ProductHeader)
