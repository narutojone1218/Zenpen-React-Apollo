import React from 'react'
import styled from 'styled-components'
import { compose } from 'react-apollo'
import withData from './queries'
import BundleBox from '../../Components/BundleBox'
import apolloDataLoaderAnimationHOC from '../SectionLoader/apolloDataLoaderAnimationHOC'

const BundleSelectorWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: -0.5em;
`

const BundleSelector = ({ data, initialProductIds, onSelect }) => (
  <BundleSelectorWrapper>
    {data.viewer.bundleConfigs.edges.map(({ node: bundleConfig }) => (
      <BundleBox
        key={bundleConfig.id}
        bundleConfig={bundleConfig}
        onSelect={() => onSelect(bundleConfig, initialProductIds)}
      />
      ))}
  </BundleSelectorWrapper>
)

BundleSelector.defaultProps = {
  onSelect: (() => {}),
  initialProductIds: [],
}

export default compose(
  withData,
  apolloDataLoaderAnimationHOC(),
)(BundleSelector)
