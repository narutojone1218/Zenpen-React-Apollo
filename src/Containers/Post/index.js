import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import withData from './queries'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import Section from '../../Components/Section'
import BlogPost from '../../Components/BlogPost'
import { blog as blogImages } from '../../assets/images'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.setTitle = false
  }

  render() {
    const { data } = this.props
    let shareUrl = null

    if (__DEVELOPMENT__) {
      shareUrl = `https://myzenpen.fermi.io/blog/${data.post.slug}`
    } else if (__CLIENT__) {
      shareUrl = window.location.href
    }

    return (
      <Section>
        <Helmet>
          <html prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#" />
          <title>My ZenPen Blog - {data.post.title}</title>
          <meta property="og:type" content="article" />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:title" content={`My ZenPen Blog - ${data.post.title}`} />
          <meta property="og:image" content={`${process.env.PUBLIC_URL_BASE}${blogImages[data.post.slug].primary}`} />
        </Helmet>
        <Section.Header>
          <Section.Title>{data.post.title}</Section.Title>
          <Section.SubTitle>Posted on {data.post.createdAt}</Section.SubTitle>
        </Section.Header>
        <Section.Sub>
          <BlogPost post={data.post} />
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
