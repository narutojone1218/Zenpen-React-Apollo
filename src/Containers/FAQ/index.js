import React, { Component } from 'react'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import withData from './queries'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import Accordians from '../../Components/Accordians'

import * as C from './components'

import Section from '../../Components/Section'

class FAQ extends Component {
  constructor(props) {
    super(props)
    this.setTitle = false
  }

  componentWillMount() {
    this.props.telemetry.emitPageView('My ZenPen FAQ')
  }

  render() {
    const { data } = this.props
    return (
      <Section>
        <Helmet>
          <title>My ZenPen FAQ</title>
        </Helmet>
        <Section.Header>
          <Section.Title>
            Frequently Asked Questions
          </Section.Title>
        </Section.Header>
        <Section.Sub>
          <C.Answer>
            Summary: My ZenPens are portable, personal diffusers for essential oils that create customized aromatherapy vapor. These organic, natural, essential oil blends are mixed together soy-based with vegetable glycerin to create a custom diffused aromatic water vapor. All Zen Pen ingredients are 100% natural and organic, derived from this soy-based vegetable glycerin and whole plant extract essential oils. These sustainable, non-GMO ingredients are grown and harvested in the United States. Our ingredients are contained inside a high quality stainless steel pen with a small lithium battery that heats up to diffuse the essential oils during use.
          </C.Answer>
        </Section.Sub>
        <Section.Sub>
          <C.Answer>
            Click on a question to see the answer!
          </C.Answer>
        </Section.Sub>
        <Section.Sub paddingBottom={true}>
          <C.FAQWrapper>
            <Accordians faqs={data.viewer.faqs} />
          </C.FAQWrapper>
        </Section.Sub>
      </Section>
    )
  }
}

export default compose(
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(FAQ)
