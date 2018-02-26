import React from 'react'

import gql from 'graphql-tag'
import Steps from '../Steps'
import Step from '../Step'
import { numToWords } from '../../util/numToWords'

const getStepStatus = (current, step) => {
  if (current === step) {
    return { active: true }
  }
  if (current > step) {
    return { complete: true }
  }
  return {}
}

const BundleSteps = ({ step, userBundle, bundleConfig }) => {
  let step2Description = 'Select some ZenPens and build your unique bundle'
  let step3Description = 'Add your finished bundle to your cart'

  if (bundleConfig) {
    step2Description = `Select ${numToWords(bundleConfig.quantity)} ZenPens to build your unique bundle`
    step3Description = `Add your personalized ${bundleConfig.shortTitle} bundle to your cart`
  }

  return (
    <Steps>

      <Step
        {...getStepStatus(step, 1)}
        first
        icon="fa fa-cube"
        title="Choose Bundle"
        description="Choose your desired bundle to get started"
      />

      <Step
        linkTo={(userBundle ? '/bundles/builder' : null)}
        {...getStepStatus(step, 2)}
        icon="fa fa-magic"
        title="Personalize"
        description={step2Description}
      />

      <Step
        linkTo={(userBundle ? '/bundles/builder' : null)}
        {...getStepStatus(step, 3)}
        last
        icon="fa fa-shopping-cart"
        title="Add to Cart"
        description={step3Description}
      />

    </Steps>
  )
}

BundleSteps.defaultProps = {
  userBundle: { remaining: 1 },
}

BundleSteps.fragments = {
  userBundle: gql`
    fragment BundleSteps_userBundle on UserBundle {
      id
    }
  `,
  bundleConfig: gql`
    fragment BundleSteps_bundleConfig on BundleConfig {
      shortTitle
      quantity
    }
  `,
}

export default BundleSteps
