import React from 'react'

import Steps from '../Steps'
import Step from '../Step'

const getStepStatus = (current, step) => {
  if (current === step) {
    return { active: true }
  }
  if (current > step) {
    return { complete: true }
  }
  return {}
}

const CartSteps = ({ step }) => (
  <Steps>

    <Step
      {...getStepStatus(step, 1)}
      first
      icon="fa fa-shopping-cart"
      title="Review"
      description="Ensure your shopping cart is perfect"
    />

    <Step
      {...getStepStatus(step, 2)}
      icon="fa fa-rocket"
      title="Shipping"
      description="Tell us where to ship your ZenPens"
    />

    <Step
      {...getStepStatus(step, 3)}
      icon="fa fa-credit-card"
      title="Payment"
      description="Unfortunately ZenPens are not free"
    />

    <Step
      {...getStepStatus(step, 4)}
      last
      icon="fa fa-check-square-o"
      title="Complete!"
      description="Review your order details"
    />

  </Steps>
)

export default CartSteps
