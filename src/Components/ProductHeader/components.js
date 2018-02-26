import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import colors, { shadeColor } from '../../util/styles/colors'
import { hexToRgb } from '../../util/styles/mixins'
import gplayBg from '../../assets/images/gplayBg.png'
import ProductCartQuantity from '../ProductCartQuantity'
import AddProductToBundleButton from '../AddProductToBundleButton'
import AddProductQuantity from '../AddProductQuantity'
import StartBundleWithProductButton from '../StartBundleWithProductButton'
import ButtonLink from '../ButtonLink'
import media from '../../util/styles/media'

export const ProductHeaderWrapper = styled.div`
  display: flex;
  position: relative;
   ${media.phone`
    flex-direction: column;
  `}
`

export const SplitPlacementWrapper = styled.div`
  max-width: 535px;
  position: relative;
  box-sizing: border-box;
`

export const SplitPlacementContainer = styled.div`
  display: inline-block;
  text-align: left;
  vertical-align: top;
  position: relative;
  z-index: 10;
`

export const ProductHeaderLeftWrapper = styled.div`
  flex: 1;
  display: flex;
  background: url(${gplayBg});
  background-color: ${({ product }) => hexToRgb(product.primaryColor, 0.15)};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  ${SplitPlacementWrapper} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  ${SplitPlacementContainer} {
    text-align: center;
    ${media.tablet`
      display: flex;
      justify-content: center;
    `}
  }
`

export const ProductImageStyled = styled.img`
  width: 60%;
  box-shadow: 0 5px 50px rgba(0, 0, 0, 0.15);
  border-radius: 0.3em;
  margin-bottom: 2em;
   ${media.tablet`
    width: 200%;
    height: 100%;
    max-height: 100%;
    flex: 1;
    transform: rotate(-90deg);
    margin-bottom: 0;
  `}
   ${media.phone`
    width: 80%;
    flex: 0;
    transform: none;
    margin: 2em 0;
  `}
`

export const ProductHeaderLightenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
`

export const ProductHeaderRightWrapper = styled.div`
  flex: 1;
  position: relative;
  background: ${({ product }) => hexToRgb(product.primaryColor, 0.09)};
  ${SplitPlacementWrapper} {
    padding: 3em 1em 3em 4em;
    ${media.phone`
      padding: 2em 1em;
    `}
  }
   ${media.tablet`
    flex: 3;
  `}
`

ProductHeaderRightWrapper.fragments = {
  product: gql`
    fragment ProductHeaderRightWrapper_product on Product {
      primaryColor
    }
  `,
}

export const ProductDescriptionWrapper = styled.p`
  font-weight: 300;
  line-height: 1.6em;
  color: ${({ product }) => shadeColor(product.primaryColor, -0.5)};
  padding: 0 2em;
  text-shadow: 0 1px 5px rgb(255, 255, 255);
  ${media.tablet`
    text-shadow: none;
    border-left: 5px solid ${({ product }) => hexToRgb(product.primaryColor, 0.075)};
    padding: 0;
    padding-left: 1em;
  `}
`

export const ProductDescription = ({ product }) => (
  <ProductDescriptionWrapper product={product}>{product.description}</ProductDescriptionWrapper>
)

ProductDescription.fragments = {
  product: gql`
    fragment ProductDescription_product on Product {
      description
      primaryColor
    }
  `,
}

export const OrSeparator = styled.p`
  padding: 0.2em;
  font-size: 2em;
  text-align: center;
  color: rgba(0, 0, 0, 0.1);
`

export const ProductHeaderRightInnerTop = styled.div`
  font-weight: 300;
  margin-bottom: 2em;
  display: flex;
  ${media.phone`
    margin-bottom: 1em;
  `}
`

export const ProductTitleWrapper = styled.span`
  font-size: 3.5em;
  color: ${({ product }) => product.primaryColor};
  text-transform: uppercase;
  text-shadow: 0 0 7px ${({ product }) => hexToRgb(product.primaryColor, 0.3)};
  flex: 1;
`

export const ProductTitle = ({ product }) => (
  <ProductTitleWrapper product={product}>{product.title}</ProductTitleWrapper>
)

ProductTitle.fragments = {
  product: gql`
    fragment ProductTitle_product on Product {
      title
      primaryColor
    }
  `,
}

export const ProductCurrency = styled.span`
  font-size: 50%;
  vertical-align: top;
  line-height: 1.6em;
`

const ProductCartQuantityStyled = styled(ProductCartQuantity)`
  margin: 0;
  display: block;
  font-size: 1rem;
`

export const ProductPriceWrapper = styled.div`
  vertical-align: top;
  font-weight: normal;
  text-align: right;
  font-size: 3em;
  float: right;
`

export const ProductPrice = ({ product }) => (
  <ProductPriceWrapper>
    <div>
      <ProductCurrency>{product.price.symbol}</ProductCurrency>
      <span>{product.price.value}</span>
    </div>
    <ProductCartQuantityStyled product={product} />
  </ProductPriceWrapper>
)

ProductPrice.fragments = {
  product: gql`
    fragment ProductPrice_product on Product {
      price(currency: USD) {
        value
        symbol
      }
      ...ProductCartQuantity_product
    }
    ${ProductCartQuantity.fragments.product}
  `,
}

export const ProductActionsWrapper = styled.div`
  display: inline-block;
  ${media.tablet`
    margin-bottom: 3em;
  `}
  ${media.phone`
    margin-bottom: 1em;
    width:100%;
  `}
`

export const SocialSharingCenter = styled.div`
  position: absolute;
  left: -16px;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.phone`
    top: -16px;
    left: 0;
    right: 0;
    bottom: auto;
    flex-direction: row;
  `}
`

export const SocialShareIcons = styled.div`
  z-index: 10;
  font-size: 140%;
  > div {
    cursor: pointer;
    transition: all .2s;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    width: 32px;
    height: 32px;
    font-size: 21px;
    color: ${({ product }) => product.primaryColor};
    background-color: white;
    box-shadow: 0 2px 2px rgba(50,50,93,.11), 0 1px 1px rgba(0,0,0,.08);
    &:hover {
      color: white;
      background-color: ${({ product }) => product.primaryColor};
    }
    margin-bottom: 0.3em;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${media.tablet`
    > div {
      margin-bottom: 0.6em;
    }
  `}
  ${media.phone`
    display: flex;
    flex-direction: row;
    > div {
      margin-bottom: 0;
      margin-right: 1em;
      &:last-child {
        margin-right: 0;
      }
    }
  `}
`

export const ProductActions = ({ userBundle, product, onRefetchRequest }) => {
  let bundleComponent = null
  let startBundleComponent = null

  if (userBundle && userBundle.inCart !== true) {
    let productBundleButtonComponent = null
    if (userBundle.remaining > 0) {
      productBundleButtonComponent = (
        <AddProductToBundleButton
          color="blue"
          onMutationComplete={data => (onRefetchRequest(data))}
          expandToParent
          product={product}
          userBundle={userBundle}
        >
          Add {product.title} to Bundle
        </AddProductToBundleButton>
      )
    } else {
      productBundleButtonComponent = (
        <ButtonLink
          color="blue"
          expandToParent
          to="/bundles/builder"
        >
          Add Finished Bundle to Cart
        </ButtonLink>
      )
    }
    bundleComponent = (
      <div>
        {productBundleButtonComponent}
        <OrSeparator>&#9473; OR &#9473;</OrSeparator>
      </div>
    )
  } else {
    startBundleComponent = (
      <div>
        <OrSeparator>&#9473; OR &#9473;</OrSeparator>
        <StartBundleWithProductButton product={product}>
          Start a Bundle With {product.title}
        </StartBundleWithProductButton>
      </div>
    )
  }

  return (
    <ProductActionsWrapper>
      {bundleComponent}
      <AddProductQuantity product={product} />
      {startBundleComponent}
    </ProductActionsWrapper>
  )
}

ProductActions.defaultProps = {
  onRefetchRequest: () => {},
}

ProductActions.fragments = {
  product: gql`
    fragment ProductActions_product on Product {
      title
      ...AddProductQuantity_product
      ...AddProductToBundleButton_product
      ...StartBundleWithProductButton_product
    }
    ${AddProductQuantity.fragments.product}
    ${AddProductToBundleButton.fragments.product}
    ${StartBundleWithProductButton.fragments.product}
  `,
  userBundle: gql`
    fragment ProductActions_userBundle on UserBundle {
      inCart
      remaining
      ...AddProductToBundleButton_userBundle
    }
    ${AddProductToBundleButton.fragments.userBundle}
  `,
}

