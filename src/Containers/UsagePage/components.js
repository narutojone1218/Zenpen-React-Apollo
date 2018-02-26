import styled from 'styled-components'
import colors from '../../util/styles/colors'

export const UsageWrapper = styled.div`
  padding: 0;
`

export const UsageHeader = styled.h1`
  text-align:center;
`

export const UsageStepsImages = styled.div`
  border-radius: 0.3em;
  width: 40em;
  margin: 0 auto;
  padding: 1em;
`

export const UsageStepImageWrapper = styled.div`
  flex: 1;
`

export const UsageStepImage = styled.img`
  height: 250px;
  margin-bottom: 0 2em 1em 2em;
`

export const UsageSteps = styled.div`
  display: flex;
  flex-direction: column;
`

export const UsageStep = styled.div`
  margin: 1em auto;
  padding: 1em;
  width: 75%;
`

export const UsageStepDesc = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0.5em;
  
  > p {
    flex: 1.3;
    padding: 1em;
  }
`

export const UsageStepTitle = styled.h2`
  color: ${colors.brandDark};
  font-size: 2.5em;
  text-transform: uppercase;
  text-align: center;
  width: 100%
`
