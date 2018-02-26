import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../util/styles/colors'
import media from '../../util/styles/media'

const StepWrapper = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const StepWrapperLink = styled(Link)`
  margin: 0;
  display: flex;
  flex-direction: column;
  color: inherit;
  text-decoration: inherit;
  flex: 1;
`

const StepBoxWrapper = styled.div`
  padding-right: 1em;
  padding-left: 0.7em;
  box-sizing: border-box;
  margin-bottom: 1em;
  flex: 1;
  display: flex;
  pointer-events: none;
  ${media.tablet`
    margin-bottom: 0;
  `}
  
  ${media.small_phone`
    padding-right: 0.5em;
  `}
`

const StepBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all .2s;
  flex: 1;
  ${({ active }) => (active ? 'box-shadow: 0 3px 20px rgba(0,0,0,.15);' : '')}
  border-left: 3px solid ${({ complete, active }) => (complete ? colors.green : (active ? colors.brandDark : colors.blackish))};
  background: ${({ active }) => (active ? colors.brand : '#ffffff')};
  border-radius: 0.3em;
  position: relative;
  
  ${media.tablet`
    border: none;
    background: none;
    box-shadow: none;
  `}
`

const StepBoxIconWrapper = styled.div`
  padding-left: 0.6em;
  margin-right: 0.3em;
  font-size: 2em;
  transition: all .2s;
  color: ${({ complete, active }) => (complete ? colors.gray : (active ? '#ffffff' : colors.blackish))};
  text-align: center;
  
  ${media.tablet`
    display: none;
  `}
`

const StepBoxIconStyled = styled.i`
  line-height: 1.5em;
`

const StepBoxInnerWrapper = styled.div`
  padding: 1em;
  
  ${media.tablet`
    width: 100%;
    text-align: center;
    padding: 0 0.5em;
  `}
  
  ${media.small_phone`
    padding: 0;
  `}
`

const StepBoxTitleWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.3em;
  transition: all .2s;
  white-space: nowrap;
  color: ${({ complete, active }) => (complete ? colors.gray : (active ? '#ffffff' : colors.blackish))};
  
  ${media.tablet`
    font-size: 1em;
    margin-bottom: 1em;
    color: ${({ complete, active }) => (complete ? colors.gray : (active ? colors.blackish : colors.blackish))};
  `}
`

const StepBoxDescriptionWrapper = styled.div`
  font-size: 85%;
  font-weight: 300;
  transition: all .2s;
  color: ${({ complete, active }) => (complete ? colors.gray : (active ? '#ffffff' : colors.blackish))};
  
  ${media.tablet`
    display: none;
  `}
`

const StepPositionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StepPositionLeftBar = styled.div`
  flex: 1 0 0;
  height: 0.3em;
  transition: all .2s;
  background: ${({ complete, active, first }) => (first ? 'transparent' : (complete ? colors.green : (active ? colors.brand : colors.gray)))};
`

const StepPositionMiddleWrapper = styled.div``

const StepPositionIndicatorContainer = styled.div`
  height: 3em;
  width: 3em;
  &:after {
    content: "";
    display: block;
    width: 100%;
    height:0;
    padding-bottom: 100%;
    transition: all .2s;
    background: ${({ complete, active }) => (complete ? colors.green : (active ? colors.brand : colors.gray))}; 
    border-radius: 50%;
    ${({ active }) => (active ? `
    box-shadow: 0 0 0 rgba(35, 163, 221, 1);
    animation: pulse 2s infinite;
    ` : '')}
  }
`

const StepPosititionIndicator = styled.div`
  float:left;
  width:100%;
  padding-top:50%;
  line-height:1em;
  margin-top:-0.5em;
  text-align:center;
  color: white;
  font-size: 2em;
  color: rgba(255, 255, 255, 0.88);
`

const StepPosititionRightBar = styled.div`
  flex: 1;
  height: 0.3em;
  transition: all .2s;
  background: ${({ complete, active, last }) => (last ? 'transparent' : (complete ? colors.green : (active ? colors.brand : colors.gray)))};
`

const Step = ({
  linkTo, icon, title, description, active, complete, first, last,
}) => {
  let WrapperComponent = StepWrapper
  let wrapperComponentProps = {}
  if (linkTo !== null) {
    WrapperComponent = StepWrapperLink
    wrapperComponentProps = { to: linkTo }
  }
  return (
    <WrapperComponent {...wrapperComponentProps}>
      <StepBoxWrapper>
        <StepBoxContainer active={active} complete={complete}>
          <StepBoxIconWrapper active={active} complete={complete}>
            <StepBoxIconStyled className={icon} />
          </StepBoxIconWrapper>
          <StepBoxInnerWrapper>
            <StepBoxTitleWrapper active={active} complete={complete}>
              <span>{title}</span>
            </StepBoxTitleWrapper>
            <StepBoxDescriptionWrapper active={active} complete={complete}>
              <span>{description}</span>
            </StepBoxDescriptionWrapper>
          </StepBoxInnerWrapper>
        </StepBoxContainer>
      </StepBoxWrapper>
      <StepPositionWrapper>
        <StepPositionLeftBar active={active} complete={complete} first={first} />
        <StepPositionMiddleWrapper>
          <StepPositionIndicatorContainer active={active} complete={complete} first={first}>
            <StepPosititionIndicator>
              <i className={`fa ${(complete ? 'fa-check-circle-o' : (active ? 'fa-dot-circle-o' : 'fa-circle-o'))}`} />
            </StepPosititionIndicator>
          </StepPositionIndicatorContainer>
        </StepPositionMiddleWrapper>
        <StepPosititionRightBar active={active} complete={complete} last={last} />
      </StepPositionWrapper>
    </WrapperComponent>
  )
}

Step.defaultProps = {
  linkTo: null,
  first: false,
  last: false,
  icon: '',
  title: '',
  description: '',
  active: false,
  complete: false,
}

export default Step

