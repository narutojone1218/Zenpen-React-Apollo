import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { bundles } from '../../assets/images'
import { numToWords } from '../../util/numToWords'
import colors from '../../util/styles/colors'
import SectionRibbon from '../SectionRibbon'

export const SectionRibbonStyled = styled(SectionRibbon)`

`

export const BundleBoxWrapper = styled.div`
  background: rgba(238,238,238,1);
  border-radius: 7px;
  display: inline-block;
  flex: 1;
  margin: 0.5em;
  min-width: 360px;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 0 0 10px transparent;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 149, 255, 0.36);
  }
  position: relative;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  ${({ promo }) => (promo ? `
    border: 1px solid ${colors.brand};
  ` : '')}
`

export const BundleBoxImage = styled.div`
  background: url(${({ bundleConfig }) => bundles[bundleConfig.slug].primary});
  background-size: 120%;
  background-position: center;
  border-radius: 1em;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  height: 100px;
  width: 100px;
  margin-right: 1em;
  border: 3px solid white;
`

BundleBoxImage.fragments = {
  bundleConfig: gql`
    fragment BundleBoxImage_bundleConfig on BundleConfig {
      slug
    }
  `,
}

export const BundleBoxHeaderText = styled.div`

`

export const BundleBoxHeaderTitle = styled.div`
  font-size: 200%;
  margin-bottom: 0.2em;
  font-weight: 600;
`

export const BundleBoxHeaderDescriptionWrapper = styled.div`
  font-weight: 300;
  margin-bottom: 0.5em;
`

export const BundleBoxHeaderDescription = ({ bundleConfig }) => (
  <BundleBoxHeaderDescriptionWrapper>
    Select {numToWords(bundleConfig.quantity)} blends &amp; save {bundleConfig.savingsPercent}
  </BundleBoxHeaderDescriptionWrapper>
)

BundleBoxHeaderDescription.fragments = {
  bundleConfig: gql`
    fragment BundleBoxHeaderDescription_bundleConfig on BundleConfig {
      quantity
      savingsPercent
    }
  `,
}

export const ListedPriceWrapper = styled.span`
  text-decoration: line-through;
  font-size: 90%;
`

export const BundleBoxDetailListContainer = styled.div`
  flex: 3;
`

export const BundleBoxDetailListItem = styled.div`
  padding: 0.3em;
  font-weight: 300;
  ${({ color }) => (color === 'orange' ? `
  background-color: #fd7801;
  color: white;
  font-weight: 500;
  ` : '')}
  &:first-child {
    border-bottom-left-radius: 0.3em;
  }
`

export const BundleBoxVariantWrapper = styled.div`
  margin-bottom: 1em;
  background: #dedede;
  display: flex;
  align-items: center;
`

export const BundleBoxVariantHeaderWrapper = styled.div`
  padding: 1em;
  flex: 1;
`

export const BundleBoxVariantTitle = styled.div`
  font-size: 120%;
`

export const BundleBoxVariantPrice = styled.div`
  font-weight: 300;
`

export const BundleBoxActionWrapper = styled.div`
  padding: 1em;
  background: #dedede;
  border-radius: 7px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

`

export const BundleBoxHeaderWrapper = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  padding: 1em 1em 0 1em;
  flex: 1;
`

export const BundleBoxHeader = ({ bundleConfig }) => (
  <BundleBoxHeaderWrapper>
    <BundleBoxImage bundleConfig={bundleConfig} />
    <BundleBoxHeaderText>
      <BundleBoxHeaderTitle>{bundleConfig.shortTitle}</BundleBoxHeaderTitle>
      <BundleBoxHeaderDescription bundleConfig={bundleConfig} />
      <div>
        <span>Price: </span>
        <span>{bundleConfig.price.formatted}</span>
        <ListedPriceWrapper> {bundleConfig.listedPrice.formatted} </ListedPriceWrapper>
        { bundleConfig.subscription ? <span> / Month</span> : null }
      </div>
    </BundleBoxHeaderText>
  </BundleBoxHeaderWrapper>
)

BundleBoxHeader.fragments = {
  bundleConfig: gql`
    fragment BundleBoxHeader_bundleConfig on BundleConfig {
      shortTitle
      description
      listedPrice(currency: USD) {
        formatted
      }
      price(currency: USD) {
        formatted
      }
      subscription
      ...BundleBoxImage_bundleConfig
      ...BundleBoxHeaderDescription_bundleConfig
    }
    ${BundleBoxImage.fragments.bundleConfig}
    ${BundleBoxHeaderDescription.fragments.bundleConfig}
  `,
}

export const SubscriptionTextBanner = styled.div`
  padding: 0.3em 0;
  text-align: center;
  background: ${colors.brandDark};
  color: white;
  font-weight: lighter;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-left: -1px;
  margin-right: -1px;
`

export const PromoTextBanner = styled.div`
  padding: 0.3em 0;
  text-align: center;
  background: ${colors.brand};
  color: white;
  font-weight: lighter;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-left: -1px;
  margin-right: -1px;
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
`
