import React from 'react'
import { compose } from 'react-apollo'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Loadable from 'react-loadable'
import { ToastContainer, toast } from 'react-toastify'
import withData from './queries'
import NavBar from '../../Components/NavBar'
import colors from '../../util/styles/colors'
import Footer from '../../Components/Footer'
import LandingPage from '../LandingPage'
import ProductList from '../ProductList'
import ProductDetails from '../ProductDetails'
import SectionLoader from '../../Components/SectionLoader'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import {
  TelemetryProvider,
} from '../../Components/Telemetry'
import media from '../../util/styles/media'
import GoogleTagManager from '../../Components/GoogleTagManager'

import '../../assets/images/favicons/apple-touch-icon.png'
import '../../assets/images/favicons/favicon-32x32.png'
import '../../assets/images/favicons/favicon-16x16.png'
import '../../assets/images/favicons/safari-pinned-tab.svg'
import '../../assets/images/favicons/favicon.ico'

let googleTagManagerComponent = null

if (__CLIENT__) {
  require('../../assets/css/reset.css')
  require('../../../node_modules/font-awesome/scss/font-awesome.scss')
  require('../../../node_modules/react-toastify/dist/ReactToastify.min.css')
  require('../../../node_modules/rc-tooltip/assets/bootstrap_white.css')
  require('../../../node_modules/react-credit-cards/lib/styles.scss')
  require('../../assets/globalStyles.scss')
}

const LoadableCheckout = Loadable({
  loader: () => import('../Checkout'),
  loading() {
    return <SectionLoader isVisible />
  }
})

const LoadableBlog = Loadable({
  loader: () => import('../Blog'),
  loading() {
    return <SectionLoader isVisible />
  }
})

const LoadableFAQ = Loadable({
  loader: () => import('../FAQ'),
  loading() {
    return <SectionLoader isVisible />
  }
})

const LoadableCart = Loadable({
  loader: () => import('../CartPage'),
  loading() {
    return <SectionLoader isVisible />
  }
})

const LoadableBundle = Loadable({
  loader: () => import('../Bundle'),
  loading() {
    return <SectionLoader isVisible />
  }
})

const LoadableUsagePage = Loadable({
  loader: () => import('../UsagePage'),
  loading() {
    return <SectionLoader isVisible />
  }
})

const THIRD_PARTY_JAVASCRIPTS = {
  'app.google.places': {
    src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API_KEY}&libraries=places`,
  },
}

if (!__DEVELOPMENT__) {
  googleTagManagerComponent = <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID} scriptId="gtm-c" dataLayerName="__gdl" />
}

const ToastContainerStyled = styled(ToastContainer)`
  z-index: 1000 !important;
  > .toastify-content {
    background: ${colors.brandDark};
    color: white;
    padding: 15px;
    border-radius: 0.3em;
    border: 1px solid white;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    min-height: 0 !important;
    > .toastify__body {
      min-height: 0 !important;
    }
    > .toastify__progress--default {
      background: white;
      opacity: 0.8;
      bottom: -1px;
      border-top-right-radius: 0.3em;
      border-bottom-left-radius: 0.3em;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${media.phone`
    width: 100%;
    bottom: 2.3em;
    > .toastify-content {
      border-radius: 0;
      border: none;
    }
  `}
`

export const AppWrapper = styled.div`
  color: ${colors.blackish};
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: 0.2s filter ease;
  filter: blur(0);
  ${({ modalIsOpen }) => (modalIsOpen ? `
    overflow: hidden;
    filter: blur(10px);
  ` : '')}
`

export const Content = styled.section`
  flex: 1 0 auto;
  ${({ navbarEnabled }) => (navbarEnabled ? `
    padding-top: 6.2187rem;
  ` : `
    padding-top: 4.5rem;
  `)}
  ${media.tablet`
    padding-top: 4.9rem;
  `}
  ${media.phone`
    padding-top: 4.2rem;
  `}
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.enableNavBar = this.enableNavBar.bind(this)
    this.disableNavBar = this.disableNavBar.bind(this)
    this.state = {
      navbarEnabled: true,
      hasSession: true,
      thirdPartyJavascripts: {},
    }
    this.setModalPortalContainerDOMElement = this.setModalPortalContainerDOMElement.bind(this)
    this.getModalPortalContainerDOMElement = this.getModalPortalContainerDOMElement.bind(this)
    this.ensureExternalJavascriptLibrary = this.ensureExternalJavascriptLibrary.bind(this)
    this.modalPortalContainerDOMElement = null
  }

  enableNavBar() {
    this.setState({ navbarEnabled: true })
  }

  disableNavBar() {
    this.setState({ navbarEnabled: false })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.hasSession !== true) {
      if (nextProps.data && nextProps.data.loading === false) {
        this.setState({ hasSession: true })
      }
    }
  }

  getChildContext() {
    return {
      enableNavBar: this.enableNavBar,
      disableNavBar: this.disableNavBar,
      getModalPortalContainerDOMElement: this.getModalPortalContainerDOMElement,
      ensureExternalJavascriptLibrary: this.ensureExternalJavascriptLibrary,
    }
  }

  getModalPortalContainerDOMElement() {
    return this.modalPortalContainerDOMElement
  }

  setModalPortalContainerDOMElement(el) {
    this.modalPortalContainerDOMElement = el
  }

  ensureExternalJavascriptLibrary(name) {
    if (__SERVER__) {
      return
    }
    if (!THIRD_PARTY_JAVASCRIPTS[name]) {
      throw new Error(`Attempted to load unknown third party javascript "${name}"`)
    }
    if (this.state.thirdPartyJavascripts[name]) {
      return
    }
    this.setState({
      thirdPartyJavascripts: {
        ...this.state.thirdPartyJavascripts,
        [name]: {
          id: name,
          ...THIRD_PARTY_JAVASCRIPTS[name],
        },
      },
    })
  }

  renderThirdPartyJavascripts() {
    return Object.values(this.state.thirdPartyJavascripts).map(({ id, src, props = {} }) => (
      <script key={`__third_party_javascripts__${id}`} type="text/javascript" src={src} {...props} />
    ))
  }

  render() {
    const { data, modalIsOpen } = this.props
    if (this.state.hasSession === false) {
      return null
    }
    return (
      <TelemetryProvider ssr={__SERVER__}>
        <React.Fragment>
          <AppWrapper modalIsOpen={modalIsOpen}>
            <Helmet>
              <title>My ZenPen</title>
              {this.renderThirdPartyJavascripts()}
              <meta property="fb:app_id" content={process.env.FACEBOOK_APP_ID} />
            </Helmet>
            {googleTagManagerComponent}
            <NavBar enabled={this.state.navbarEnabled} viewer={data.viewer} />
            <Content navbarEnabled={this.state.navbarEnabled}>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/bundles" component={LoadableBundle} />
                <Route path="/blends/:slug" component={ProductDetails} />
                <Route path="/blends" component={ProductList} />
                <Route path="/cart" component={LoadableCart} />
                <Route path="/checkout" component={LoadableCheckout} />
                <Route path="/faq" component={LoadableFAQ} />
                <Route path="/blog" component={LoadableBlog} />
                <Route path="/how-it-works" component={LoadableUsagePage} />
              </Switch>
            </Content>
            <ToastContainerStyled
              position={toast.POSITION.BOTTOM_RIGHT}
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />
            <Footer />
          </AppWrapper>
          <div ref={this.setModalPortalContainerDOMElement} />
        </React.Fragment>
      </TelemetryProvider>
    )
  }
}

App.childContextTypes = {
  enableNavBar: PropTypes.func.isRequired,
  disableNavBar: PropTypes.func.isRequired,
  getModalPortalContainerDOMElement: PropTypes.func.isRequired,
  ensureExternalJavascriptLibrary: PropTypes.func.isRequired,
}

const mapStateToProps = ({ modal }) => ({ modalIsOpen: modal.isOpen })

export default compose(
  withData,
  apolloDataLoaderAnimationHOC(),
  withRouter,
  connect(mapStateToProps),
)(App)
