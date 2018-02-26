import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import withData from './queries'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import Section from '../../Components/Section'
import BlogPosts from '../../Components/BlogPosts'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.setTitle = false
  }

  render() {
    const { data } = this.props
    return (
      <Section>
        <Helmet>
          <title>My ZenPen Blog</title>
        </Helmet>
        <Section.Header>
          <Section.Title>My ZenPen Blog</Section.Title>
          <Section.SubTitle>Here you'll find tips, tricks, and updates from our awesome team</Section.SubTitle>
        </Section.Header>
        <Section.Sub>
          <BlogPosts posts={data.viewer.posts} />
        </Section.Sub>
      </Section>
    )
  }
}

Posts.propTypes = {
  match: PropTypes.object.isRequired,
}

export default compose(
  withRouter,
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(Posts)
