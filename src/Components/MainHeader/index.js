import React from 'react'
import styled from 'styled-components'
import style from './style'
import Section from '../Section'
import ButtonLink from '../ButtonLink'
import media from '../../util/styles/media'

const MainHeaderContent = styled.div`
  padding: 3em;
  > * {
    margin: 0 auto 3em auto;
    display: table;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${media.tablet`
    padding: 2em;
    > * {
      margin-bottom: 2em;
    }
  `}
  ${media.tablet`
    padding-left: 0;
    padding-right: 0;
    > * {
      margin-bottom: 1em;
    }
  `}
`

const MainHeader = ({ className, children }) => (
  <div className={className}>
    <Section>
      <Section.Sub paddingTop={0} grid>
        <Section.Row>
          <Section.Col>
            <MainHeaderContent>
              <div className="header-text">
                <div className="t2">
                  <p className="b1">aromatherapy</p>
                  <p className="b2">Personal Essential Oil Diffuser</p>
                </div>
              </div>
              <div className="p-caller-list">
                <div className="p-caller relax">
                  <div className="icon" />
                  <p className="title">relax</p>
                  <p className="desc">Reduces Stress & Anxiety</p>
                </div>
                <div className="p-caller focus">
                  <div className="icon" />
                  <p className="title">focus</p>
                  <p className="desc">Boosts Mental Clarity</p>
                </div>
                <div className="p-caller rejuvenate">
                  <div className="icon" />
                  <p className="title">rejuvenate</p>
                  <p className="desc">Enhances Overall Wellness</p>
                </div>
              </div>
              <div className="header-action">
                <ButtonLink to="/blends">Discover Yours Now!</ButtonLink>
              </div>
            </MainHeaderContent>
          </Section.Col>
          <Section.Col flex={1} />
        </Section.Row>
      </Section.Sub>
    </Section>
  </div>
)

export default style(MainHeader)
