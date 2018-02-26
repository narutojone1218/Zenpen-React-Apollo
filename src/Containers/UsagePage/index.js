import React, { Component } from 'react'
import { compose } from 'react-apollo'
import styled from 'styled-components'
import * as C from './components'
import Section from '../../Components/Section'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import { howToSteps } from '../../assets/images'

const StepWrapper = styled.div`
  background-color: #fbf8ff;
  border-radius: 50%;
  height: 30em;
  width: 30em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 3px solid white;
  z-index: 1;
  box-shadow: inset 0 0 10px #00000026;
`

const StepRowWrapper = styled(Section.Sub)`
  display: flex;
  align-items: center;
`

const StepTitleWrapper = styled.div`
  background: #efefef;
  padding: 1em;
  border-radius: 0.3rem;
  margin-top: -50px;
  z-index: 2;
`

const StepTitle = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.4em;
`

const StepSubTitle = styled.div`
  font-size: 1em;
  font-weight: lighter;
`

class UsagePage extends Component {
  constructor(props) {
    super(props)
    this.setTitle = false
  }

  render() {
    return (
      <Section>
        <Section.Header>
          <Section.Title>How Does ZenPen Work?</Section.Title>
          <Section.SubTitle>Scroll down and learn how to experience the benefits of your ZenPen</Section.SubTitle>
        </Section.Header>
        <StepRowWrapper>
          <StepWrapper>
            <C.UsageStepImage src={howToSteps.step1} />
          </StepWrapper>
          <StepTitleWrapper>
            <StepTitle>1. Place the ZenPen on your lips</StepTitle>
            <StepSubTitle>Find and place the end opposite of the crystal firmly on your lips.</StepSubTitle>
          </StepTitleWrapper>
        </StepRowWrapper>
        <StepRowWrapper>
          <StepWrapper>
            <C.UsageStepImage src={howToSteps.step2} />
          </StepWrapper>
          <StepTitleWrapper>
            <StepTitle>2. Gently draw vapor in to your mouth</StepTitle>
            <StepSubTitle>Similar to sipping on a straw, gently draw the vapor in to your mouth, not your lungs.</StepSubTitle>
          </StepTitleWrapper>
        </StepRowWrapper>
        <StepRowWrapper paddingBottom={true}>
          <StepWrapper>
            <C.UsageStepImage src={howToSteps.step3a} />
          </StepWrapper>
          <StepTitleWrapper>
            <StepTitle>3. Exhale vapor through your nose</StepTitle>
            <StepSubTitle>This will stimulate your senses and provide the desired effects.</StepSubTitle>
          </StepTitleWrapper>
        </StepRowWrapper>
      </Section>
    )
  }
}

export default compose(
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(UsagePage)
