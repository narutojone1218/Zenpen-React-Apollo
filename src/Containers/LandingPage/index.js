import React from 'react'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import * as C from './components'
import MainHeader from '../../Components/MainHeader'
import Section from '../../Components/Section'
import withData from './queries'
import { sectionListIcons, bundles } from '../../assets/images'
import InsetRail from '../../Components/InsetRail'
import LanderReviews from '../../Components/LanderReviews'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'

const LandingPage = ({ data }) => {
  return (
    <React.Fragment>
      <Helmet>
        <html prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#" />
        <title>My ZenPen</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.PUBLIC_URL_BASE} />
        <meta property="og:title" content={'My ZenPen'} />
        <meta property="og:image" content={`${process.env.PUBLIC_URL_BASE}${bundles['four-pack'].primary}`} />
      </Helmet>
      <MainHeader />
      <C.PageWrapper>
        <Section wide>
          <C.SectionOneOuter>
            <InsetRail>
              <Section>
                <Section.Sub paddingBottom={2}>
                  <C.SectionList>
                    <C.SectionListItem>
                      <C.SectionOneListIcon src={sectionListIcons.s1icon2} />
                      <C.SectionListItemContent>
                        <span>Effortless</span>
                        <p>Experience natural Zen with ease. Simply breathe in and exhale through your nose.</p>
                      </C.SectionListItemContent>
                    </C.SectionListItem>
                    <C.SectionListItem>
                      <C.SectionOneListIcon src={sectionListIcons.s1icon1} />
                      <C.SectionListItemContent>
                        <span>No Chemicals</span>
                        <p>Unlike competitors, our blends are created with zero additives and only pure, high-quality, natural ingredients.</p>
                      </C.SectionListItemContent>
                    </C.SectionListItem>
                    <C.SectionListItem>
                      <C.SectionOneListIcon src={sectionListIcons.s1icon3} />
                      <C.SectionListItemContent>
                        <span>Powerful</span>
                        <p>Involve your senses in a personalized aromatherapy experience. Simply breathe and exhale through your nose.</p>
                      </C.SectionListItemContent>
                    </C.SectionListItem>
                    <C.SectionListItem>
                      <C.SectionOneListIcon src={sectionListIcons.s1icon1} />
                      <C.SectionListItemContent>
                        <span>No Nicotine</span>
                        <p>All of our blends contain zero nicotine, including nicotine byproducts.</p>
                      </C.SectionListItemContent>
                    </C.SectionListItem>
                    <C.SectionListItem>
                      <C.SectionOneListIcon src={sectionListIcons.s1icon3} />
                      <C.SectionListItemContent>
                        <span>Portable</span>
                        <p>Enjoy the convenience and freedom of your personal aromatherapy diffuser anywhere.</p>
                      </C.SectionListItemContent>
                    </C.SectionListItem>
                    <C.SectionListItem>
                      <C.SectionOneListIcon src={sectionListIcons.s1icon2} />
                      <C.SectionListItemContent>
                        <span>No Tobacco</span>
                        <p>Involve your senses in a personalized aromatherapy experience. Simply breathe and exhale through your nose.</p>
                      </C.SectionListItemContent>
                    </C.SectionListItem>
                  </C.SectionList>
                </Section.Sub>
              </Section>
            </InsetRail>
          </C.SectionOneOuter>
        </Section>
        <Section>
          <Section.Header>
            <Section.Title>A ZenPen For Any Mood</Section.Title>
            <Section.SubTitle>With seven blends, you'll find a ZenPen to enhance any mood.</Section.SubTitle>
          </Section.Header>
          <Section.Sub>
            <C.MiniProductBoxes>
              {data.viewer.products.edges.map(({ node }) => (
                <C.MiniProductBoxLinkWrapper to={`/blends/${node.slug}`}>
                  <C.MiniProductBoxStyled key={node.id} product={node} />
                </C.MiniProductBoxLinkWrapper>
              ))}
            </C.MiniProductBoxes>
          </Section.Sub>
          <Section.Sub paddingBottom={2} grid>
            <Section.Row>
              <Section.Col flex={1}>
                <C.DiscoverButton color="white" to="/bundles">Discover Bundles</C.DiscoverButton>
              </Section.Col>
              <Section.Col flex={1}>
                <C.DiscoverButton color="blue" to="/blends">Discover All Blends</C.DiscoverButton>
              </Section.Col>
              <Section.Col flex={1}>
                <C.DiscoverButton color="white" to="/bundles">Personalize a Bundle</C.DiscoverButton>
              </Section.Col>
            </Section.Row>
          </Section.Sub>
        </Section>
        <Section wide color="lightGray">
          <Section>
            <Section.Header>
              <Section.Title>Real People, Real Results</Section.Title>
              <Section.SubTitle>What people are saying and feeling using My ZenPen</Section.SubTitle>
            </Section.Header>
            <Section.Sub paddingBottom={2}>
              <LanderReviews viewer={data.viewer} />
            </Section.Sub>
          </Section>
        </Section>
      </C.PageWrapper>
    </React.Fragment>
  )
}

export default compose(
  withData,
  apolloDataLoaderAnimationHOC(),
)(LandingPage)
