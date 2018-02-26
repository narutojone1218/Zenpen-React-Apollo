import React from 'react'
import { compose } from 'react-apollo'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import ProgressiveImage from 'react-progressive-image'
import { withLastLocation } from 'react-router-last-location'
import { ShareButtons } from 'react-share'
import Section from '../../Components/Section'
import withData from './queries'
import InsetRail from '../../Components/InsetRail'
import ProductIngredientsDetail from '../../Components/ProductIngredientsDetail'
import ProductReviews from '../../Components/ProductReviews'
import { withTelemetry } from '../../Components/Telemetry'
import ProductHeader from '../../Components/ProductHeader'
import { product } from '../../assets/images'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import media from '../../util/styles/media'
import colors from '../../util/styles/colors'
import { hexToRgb } from '../../util/styles/mixins'
import ProductReviewButton from '../../Components/ProductReviewButton'
import ImageLightbox from '../../Components/ImageLightbox'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton,
} = ShareButtons;

const ProductLink = styled.a`
  cursor: pointer;
`

const ProductPhoto = styled.img`
  border-radius: 0.3em;
  flex: 1;
  object-fit: cover;
  object-position: center;
  width: 100%;
  transition: all .2s;
  opacity: 0.5;
  ${({ loading }) => (loading ? `
    opacity: 0.5;
  ` : `
    opacity: 1;
  `)}
`

const ProductPhotoWrapper = styled.div`
  margin: 0.5em;
  display: flex;
  flex: 1;
  border: 2px solid white;
  border-radius: 0.3em;
  overflow: hidden;
  > img {
    object-fit: cover;
    object-position: center;
    width: 100%;
  }
`

const ProductPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${ProductPhotoWrapper} {
    height: ${({ count }) => Math.floor((1070 / count) - 50)}px;
    max-width: ${({ count }) => Math.floor((100 / count) * 2)}%;
    min-width: ${({ count }) => Math.floor((1070 / count) - 50)}px;
  }
  ${media.phone`
    ${ProductPhotoWrapper} {
      max-width: ${({ count }) => Math.floor((100 / count) * 3)}%;
    }
  `}
  margin: -0.5em;
`

const ProductDetailsWrapper = styled.div`
  position: relative;
`

const ReturnButton = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  font-size: 1.6em;
  letter-spacing: 0.03;
  color: ${colors.blackish};
  text-decoration: none;
  cursor: pointer;
  z-index: 10;
  ${media.tablet`
    padding: 0.5em;
  `}
  ${media.phone`
    display: none;
  `}
`

const SocialShareIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 140%;
  flex-wrap: wrap;
  > div {
    padding: 20px;
    margin: -20px;
    cursor: pointer;
    transition: all .2s;
    color: ${colors.gray};
    &:hover {
      color: ${({ product }) => product.primaryColor};
      text-shadow: 0 0 7px ${({ product }) => hexToRgb(product.primaryColor, 0.3)};
    }
    text-align: center;
  }
  ${media.phone`
    > div {
      padding: 10px;
      margin: 0;
      flex-basis: 20%;
      max-width: 20%;
    }
  `}
`

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.setTitle = false
    this.state = {
      imageboxOpen: false,
      photoIndex: 0
    };
  } 

  componentDidMount() {
    this.props.telemetry.emitPageView(`My ZenPen Blend - ${this.props.data.product.title}`)
  }

  render() {
    const { data, lastLocation } = this.props
    const shareUrl = `${process.env.PUBLIC_URL_BASE}/blends/${data.product.slug}`

    let returnButtonComponent = null

    

    if (lastLocation && lastLocation.pathname === '/bundles/builder') {
      returnButtonComponent = (
        <ReturnButton to="/bundles/builder">
          <i className="fa fa-arrow-circle-left" /> Return to Bundle
        </ReturnButton>
      )
    }

    return (      
      <ProductDetailsWrapper>
        <Helmet>
          <html prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# product: http://ogp.me/ns/product#" />
          <title>My ZenPen Blend - {data.product.title}</title>
          <meta property="og:type" content="product" />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:title" content={`My ZenPen Blend - ${this.props.data.product.title}`} />
          <meta property="og:image" content={`${process.env.PUBLIC_URL_BASE}${product[data.product.slug].photos[0].src}`} />
        </Helmet>
        {returnButtonComponent}
        <Section wide>
          <InsetRail>
            <ProductHeader data={data} viewer={data.viewer} product={data.product} />
          </InsetRail>
        </Section>
        <Section>
          <Section.Sub>
            <SocialShareIcons product={data.product}>
              <FacebookShareButton url={shareUrl}>
                <i className="fa fa-facebook-square" />
              </FacebookShareButton>
              <GooglePlusShareButton url={shareUrl}>
                <i className="fa fa-google-plus-circle" />
              </GooglePlusShareButton>
              <TwitterShareButton url={shareUrl}>
                <i className="fa fa-twitter" />
              </TwitterShareButton>
              <TelegramShareButton url={shareUrl}>
                <i className="fa fa-telegram" />
              </TelegramShareButton>
              <WhatsappShareButton url={shareUrl}>
                <i className="fa fa-whatsapp" />
              </WhatsappShareButton>
              <PinterestShareButton url={shareUrl}>
                <i className="fa fa-pinterest" />
              </PinterestShareButton>
              <RedditShareButton url={shareUrl}>
                <i className="fa fa-reddit" />
              </RedditShareButton>
              <TumblrShareButton url={shareUrl}>
                <i className="fa fa-tumblr-square" />
              </TumblrShareButton>
              <VKShareButton url={shareUrl}>
                <i className="fa fa-vk" />
              </VKShareButton>
              <EmailShareButton url={shareUrl}>
                <i className="fa fa-envelope-o" />
              </EmailShareButton>
            </SocialShareIcons>
          </Section.Sub>
          <Section.Sub>
            <ProductIngredientsDetail product={data.product} />
          </Section.Sub>
          <Section.Sub>
            <ProductPhotoContainer count={product[data.product.slug].photos.length}>
              {product[data.product.slug].photos.map((photo, i) => (
                <ProductPhotoWrapper key={i}>
                  <ProgressiveImage {...photo}>
                      {(src, loading) => 
                        <ProductLink onClick={() => this.setState({ imageboxOpen: true, photoIndex: i })}>
                           <ProductPhoto loading={loading} src={src} alt="" />
                        </ProductLink>
                      }                    
                  </ProgressiveImage>
                </ProductPhotoWrapper>
              ))}
            </ProductPhotoContainer>
            <ImageLightbox photos={product[data.product.slug].photos} open={this.state.imageboxOpen} photoIndex = {this.state.photoIndex}/>
          </Section.Sub>
          <Section.Sub paddingBottom={2}>
            <ProductReviewButton product={data.product}>Send us your awesome photos of {data.product.title}</ProductReviewButton>
          </Section.Sub>
        </Section>
        <Section wide color="lightGray">
          <Section>
            <Section.Header>
              <Section.Title>Real People, Real Results</Section.Title>
              <Section.SubTitle>What people are saying and feeling using {data.product.title}</Section.SubTitle>
            </Section.Header>
            <Section.Sub paddingBottom={2}>
              <ProductReviews product={data.product} />
            </Section.Sub>
          </Section>
        </Section>
        <Section>
          <Section.Header>
            <Section.Title>Already own {data.product.title}?</Section.Title>
          </Section.Header>
          <Section.Sub paddingBottom={2}>
            <ProductReviewButton product={data.product}>Leave a review for {data.product.title}</ProductReviewButton>
          </Section.Sub>
        </Section>
      </ProductDetailsWrapper>
    )
  }
}

export default compose(
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
  withLastLocation,
)(ProductDetails)
