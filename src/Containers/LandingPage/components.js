import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../../util/styles/colors'
import media from '../../util/styles/media'
import { sectionBackgrounds } from '../../assets/images'
import MiniProductBox from '../../Components/MiniProductBox'
import ButtonLink from '../../Components/ButtonLink'

export const PageWrapper = styled.div`
  padding: 0;
`

export const SectionWrapper = styled.div`
`

export const SectionDivider = styled.img`
  margin: 1em 0;
`

export const SectionInner = styled.div`
  font-weight: 300;
  padding: 4em 4em;
`

export const SectionHeader = styled.h2`
  color: ${colors.brand};
  font-size: 2.625em;
  font-weight: 300;
  margin:0;
`

export const SectionSubtext = styled.p`
  font-size: 1.4em;
  &.s2 {
    padding-left: 0.4em;
  }
  margin-bottom: 2em;
`

export const SectionAAOuter = styled.div`
  background: url(${sectionBackgrounds.secFiveBG}) center top no-repeat;
  background-color: white;
`

export const SectionOneOuter = styled.div`
  background: url(${sectionBackgrounds.secOneBG}) center top no-repeat;
  text-align: center;
  background-color: white;
  background-size: cover;
  background-position: center;
  ${media.tablet`
    background: white;
  `}
`

export const SectionTwoOuter = styled.div`
  background: url(${sectionBackgrounds.secTwoBG}) center top no-repeat;
  box-sizing: border-box;
  padding: 1.1em 0;
  text-align: left;
  ${media.phone`
    background: white;
    text-align: center;
  `}
`

export const SectionThreeOuter = styled.div`
  box-sizing: border-box;
  padding: 1.5em 0;
  text-align: center;
  ${media.phone`
    background: #f0f8f9;
  `}
`

export const SectionList = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-weight: 300;
  flex-wrap: wrap;
  margin: -1em;
  ${media.tablet`
    margin: -0.5em;
    flex-direction: column;
    margin: 0; 
  `}
  ${media.phone`
    font-size: 80%;
  `}
`

export const SectionListItem = styled.div`
  flex: 1;
  flex-basis: calc(33%);
  max-width: calc(33%);
  padding: 1em;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1em;
  box-sizing: border-box;
  ${media.tablet`
    padding: 0;
    margin: 0.5em;
    display: flex;
    flex-basis: 100%;
    max-width: 100%;
    text-align: left;
  `}
`

export const SectionOneListIcon = styled.img`
  margin: 0 auto 3px auto;
  display: block;
  height: 48px;
  width: 48px;
  ${media.tablet`
    margin: 0;
    margin-right: 0.5em;
  `}
`

export const SectionListItemContent = styled.div`
  span {
    font-size: 2.5em;
  }
  p {
    font-size: 1.1em;
    line-height: 1.5em;
  }
  ${media.tablet`
    text-align: left;
  `}
`

export const SectionTwoText = styled.div`
  font-size: 1.4em;
  margin: 75px 0 220px 0;
  
  & p {
    margin: 1em 0 2em;
    padding: 0.5em 0 0.5em 0.4em;
  }
  
  ${media.tablet`
    & p {
      margin: 0;
    }
    margin: 1em 0;
  `}
`

export const MiniProductBoxStyled = styled(MiniProductBox)``

export const MiniProductBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.phone`
    justify-content: center;
    flex-wrap: wrap;
    margin: -0.5em;
    ${MiniProductBoxStyled} {
      margin: 0.5em;
    }
  `}
`

export const DiscoverButton = styled(ButtonLink)`
  ${media.tablet`
    margin-bottom: 0.5em;
  `}
`

export const MiniProductBoxLinkWrapper = styled(Link)`
  padding: 0;
  margin: 0;
  text-decoration: none;
`

export const HowToSteps = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const HowToStep = styled.div`
  text-align: center;
  font-size: 1.2em;
`
export const HowToStepImage = styled.img`
  height: 150px;
  margin-bottom: 1em;
`

export const HowToStepTitle = styled.div`
  color: ${colors.brandDark};
`

export const StripOuter = styled.div`
    background: url(${sectionBackgrounds.strip}) center top no-repeat;
    height: 280px;
    overflow: auto;
    
    ${media.phone`
      height: unset;
    `}
`

export const StripBox = styled.div`
  background: url(${sectionBackgrounds.stripBox}) no-repeat;
  height: 237px;
  width: 801px;
  margin: 21px auto;
  overflow: auto;
  
  & div {
    margin: 34px 90px; 
    text-align: center;
    
    & p {
      font-size: 3em;
      font-weight: 300;
      color: white;
    }
  }
  
  ${media.phone`
    background: none;
    height: unset;
    width: unset;
    
    & div {
    margin: 1em 1.5em; 
        
    & p {
      font-size: 2em;
    }
  }
  `}
`
