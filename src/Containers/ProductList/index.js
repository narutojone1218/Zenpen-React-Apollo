import React from 'react'
import styled from 'styled-components'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import Section from '../../Components/Section'
import ProductBox from '../../Components/ProductBox'
import withData from './queries'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import media from '../../util/styles/media'

const ProductBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1em;
  ${media.desktop_lr`
    flex-direction: column;
    margin: -0.5em;
  `}
`

class ProductList extends React.Component {
  componentWillMount() {
    this.props.telemetry.emitPageView('My ZenPen Blends')
  }

  render() {
    const { data } = this.props
    return (
      <Section>
        <Helmet>
          <title>My ZenPen Blends</title>
        </Helmet>
        <Section.Header>
          <Section.Title>Blends & Benefits</Section.Title>
          <Section.SubTitle>With our proprietary blends, you’ll feel the difference</Section.SubTitle>
        </Section.Header>
        <Section.Sub paddingBottom={2}>
          <ProductBoxes>
            {data.viewer.products.edges.map(({ node: product }) => (<ProductBox key={product.id} product={product} />))}
          </ProductBoxes>
        </Section.Sub>
      </Section>
    )
  }
}


export default compose(
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(ProductList)
