import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import * as C from './components'
import Button from '../Button'

import {
  withTelemetryOnVisible,
  withTelemetryOnClick,
} from '../Telemetry'

const BundleBox = ({ bundleConfig, onSelect }) => {
  let promoRibbon = null
  if (bundleConfig.ribbon) {
    promoRibbon = <C.SectionRibbonStyled>{bundleConfig.ribbon}</C.SectionRibbonStyled>
  }
  let subscribeAndSave = null
  if (bundleConfig.subscription) {
    subscribeAndSave = <C.SubscriptionTextBanner>Subscribe & Save</C.SubscriptionTextBanner>
  }
  let promoText = null
  if (bundleConfig.promoText) {
    promoText = <C.PromoTextBanner>{bundleConfig.promoText}</C.PromoTextBanner>
  }
  return (
    <C.BundleBoxWrapper promo={bundleConfig.promoText !==null} onClick={() => (onSelect(bundleConfig))}>
      {promoRibbon}
      <C.BundleBoxHeader bundleConfig={bundleConfig} />
      {subscribeAndSave}
      {promoText}
    </C.BundleBoxWrapper>
  )
}

BundleBox.defaultProps = {
  onSelect: (() => {}),
}

BundleBox.fragments = {
  bundleConfig: gql`
    fragment BundleBox_bundleConfig on BundleConfig {
    title
    ribbon
    subscription
    promoText
      ...BundleBoxHeader_bundleConfig
    }
    ${C.BundleBoxHeader.fragments.bundleConfig}
  `,
}

const telemetryEcommerceImpression = withTelemetryOnVisible(
  'emitEcommerceImpression',
  ({ bundleConfig }) => ({
    id: bundleConfig.id,
    name: bundleConfig.title,
  }),
)

const telemetryEcommerceClick = withTelemetryOnClick(
  'emitEcommerceClick',
  ({ bundleConfig }) => ({
    id: bundleConfig.id,
    name: bundleConfig.title,
  }),
)

export default compose(
  telemetryEcommerceImpression,
  telemetryEcommerceClick,
)(BundleBox)
