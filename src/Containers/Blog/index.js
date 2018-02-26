import React, { Component } from 'react'
import { compose } from 'react-apollo';
import { Route } from 'react-router-dom'
import Section from '../../Components/Section'
import { withTelemetry } from '../../Components/Telemetry'
import Post from '../Post'
import Posts from '../Posts'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.setTitle = false
  }

  render() {
    const { match, slug } = this.props
    return (
      <Section>
        <Route path={`${match.url}/:slug`} component={Post} />
        <Route exact path={match.url} component={Posts} />
      </Section>
    )
  }
}

export default compose(
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(Blog)
