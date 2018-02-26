import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import colors from '../../util/styles/colors'

export const CheckoutWrapper = styled.div`
  background: white;
  padding: 1.5em;
  border-radius: 0.3em;
  box-shadow: 0 3px 50px rgba(0,0,0,.15);
  max-width: 550px;
  margin: 0 auto;
`

export const CheckoutInner = styled.div`

`

export const CheckoutHeader = styled.div`
  margin: -1.5em;
  padding: 1.5em 3em 1.5em 3em;
  background: #f2f7f0;
  border-radius: 0.3em;
  margin-bottom: 1.5em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

export const PriceTitleWrapper = styled.span`
  color: ${colors.darkGray};
  font-size: 90%;
`

export const PriceWrapper = styled.span`
  font-size: 120%;
  color: ${colors.red};
`

export const ListedPriceWrapper = styled.span`
  text-decoration: line-through;
  font-size: 90%;
`

export const SavingsWrapper = styled.span`
  font-size: 90%;
`

export const CheckoutPricingWrapper = styled.span`
  ${PriceTitleWrapper},
  ${PriceWrapper},
  ${ListedPriceWrapper} {
    margin-right: 0.6em;
  }
  margin-bottom: 0.5em;
`

export const InStockWrapper = styled.div`
  color: ${colors.darkGreen};
`

export const CheckoutOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em 0;
  border-radius: 0.2em;
  background: transparent;
  transition: all .2s;
  &:hover {
    background: ${colors.lightGray};
  }
  cursor: pointer;
`

export const CheckoutOptionsWrapper = styled.div`
  margin-bottom: 1.5em;
`

export const CheckoutOptionRadioWrapper = styled.div`
  display: flex;
  font-size: 2em;
  margin-right: 1.1em;
  padding-left: 0.6em;
  flex-direction: row;
  align-items: center;
`

export const CheckoutOptionRadio = styled.div`

`

export const CheckoutOptionDescriptionWrapper = styled.div`
 > p:last-child {
  margin-bottom: 0;
 }
`

export const CheckoutOptionTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.2em;
  letter-spacing: 0.03em;
`

export const CheckoutOptionPrice = styled.p`
  ${PriceTitleWrapper},
  ${PriceWrapper},
  ${ListedPriceWrapper} {
    font-size:100%;
    font-weight: 300;
  }
  ${CheckoutPricingWrapper} {
    margin-bottom: 0;
  }
  margin-bottom: 0.2em;
`

export const CheckoutOptionDescription = styled.p`
  font-weight: 300;
  margin-bottom: 0.2em;
  letter-spacing: 0.03em;
`

export const PromoTextWrapper = styled.p`
  color: ${colors.brand};
  margin-bottom: 0.2em;
`

export const FirstDeliveryWrapper = styled.p`
  font-size: 90%;
  font-weight: 300;
  color: ${colors.darkGreen};
`

export const CheckoutActionsWrapper = styled.div`

`

export const CheckoutPricing = ({ bundleConfig }) => (
  <CheckoutPricingWrapper>
    <PriceTitleWrapper>Price (as selected):</PriceTitleWrapper>
    <PriceWrapper>{bundleConfig.price.formatted}</PriceWrapper>
    <ListedPriceWrapper>{bundleConfig.listedPrice.formatted}</ListedPriceWrapper>
    <SavingsWrapper>(Save {bundleConfig.savingsPercent})</SavingsWrapper>
  </CheckoutPricingWrapper>
)

CheckoutPricing.fragments = {
  bundleConfig: gql`
    fragment CheckoutPricing_bundleConfig on BundleConfig {
      price(currency: USD) {
        formatted
      }
      listedPrice(currency: USD) {
        formatted
      }
      savingsPercent
    }
  `,
}

export class CheckoutOptions extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheckoutOptionClick = this.handleCheckoutOptionClick.bind(this)
    this.state = { value: this.props.value }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleCheckoutOptionClick(value, bundleConfig) {
    this.setState({ value })
    this.props.onChange(value, bundleConfig)
  }

  render() {
    return (
      <CheckoutOptionsWrapper>
        {this.props.bundleConfigs.map(bundleConfig => (
          <CheckoutOption
            key={bundleConfig.id}
            onClick={this.handleCheckoutOptionClick}
            selected={bundleConfig.value === this.state.value}
            bundleConfig={bundleConfig}
          />
        ))}
      </CheckoutOptionsWrapper>
    )
  }
}

CheckoutOptions.defaultProps = {
  onChange: (() => {}),
}

export const CheckoutOption = ({ selected, onClick, bundleConfig }) => (
  <CheckoutOptionWrapper onClick={() => (onClick(bundleConfig.id, bundleConfig))}>
    <CheckoutOptionRadioWrapper>
      <CheckoutOptionRadio><i className={`fa ${selected ? 'fa-dot-circle-o' : 'fa-circle-o'}`} /></CheckoutOptionRadio>
    </CheckoutOptionRadioWrapper>
    <CheckoutOptionDescriptionWrapper>
      <CheckoutOptionTitle>{bundleConfig.addToCartTitle}</CheckoutOptionTitle>
      <CheckoutOptionPrice>
        <CheckoutPricingWrapper>
          <PriceWrapper>{bundleConfig.price.formatted}</PriceWrapper>
          <ListedPriceWrapper>{bundleConfig.listedPrice.formatted}</ListedPriceWrapper>
          <SavingsWrapper>(Save {bundleConfig.savingsPercent})</SavingsWrapper>
        </CheckoutPricingWrapper>
      </CheckoutOptionPrice>
      <PromoTextWrapper>
        {bundleConfig.promoText}
      </PromoTextWrapper>
      <CheckoutOptionDescription>
        {bundleConfig.addToCartDescription}
      </CheckoutOptionDescription>
      <FirstDeliveryWrapper>
        {bundleConfig.addToCartPromoText}
      </FirstDeliveryWrapper>
    </CheckoutOptionDescriptionWrapper>
  </CheckoutOptionWrapper>
)

CheckoutOption.fragments = {
  bundleConfig: gql`
    fragment CheckoutOption_bundleConfig on BundleConfig {
      id
      value: id
      addToCartTitle
      addToCartDescription
      addToCartPromoText
      promoText
      price(currency: USD) {
        formatted
      }
      listedPrice(currency: USD) {
        formatted
      }
      savingsPercent
      ...CheckoutPricing_bundleConfig
    }
    ${CheckoutPricing.fragments.bundleConfig}
  `,
}
