/* eslint-disable no-underscore-dangle */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createInjectStore } from 'redux-reducers-injector'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import { IntrospectionFragmentMatcher } from 'apollo-client'
import { applyMiddleware, compose } from 'redux'
import { reducer as responsiveReducer } from 'react-responsive-redux'
import Loadable from 'react-loadable'
import introspectionQueryResultData from './fragmentTypes.json'
import App from './Containers/App'
import { getToken } from './util/session'
import {
  registerTelemetryStoreEvents,
  telemetryMiddleware,
  telemetryReducer,
} from './Components/Telemetry'
import {
  alertsReducer,
} from './Components/Alerts'
import authReducer from './Components/Auth/reducer'
import modalReducer from './Components/Modal/reducer'

getToken()

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const networkInterface = createNetworkInterface({
  uri: '/graphql',
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = getToken()
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  },
}])

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher,
})

const getInitialState = () => {
  if (!window.__INITIAL_STATE__) {
    return {}
  }

  return window.__INITIAL_STATE__
}

const reducers = {
  telemetry: telemetryReducer,
  apollo: client.reducer(),
  auth: authReducer,
  modal: modalReducer,
  responsive: responsiveReducer,
  alerts: alertsReducer,
};

const store = createInjectStore(
  reducers,
  {
    alerts: alertsReducer.initialState,
    telemetry: telemetryReducer.initialState,
    apollo: {},
    modal: {},
    ...getInitialState(),
  },
  compose(
    applyMiddleware.apply({}, [
      client.middleware(),
      ...telemetryMiddleware,
    ]),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
)

registerTelemetryStoreEvents(store)

const rootEl = document.getElementById('root')

const renderApp = (Component) => {
  ReactDOM.hydrate(
    <ApolloProvider warnings={false} store={store} client={client}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </ApolloProvider>,
    rootEl,
  );
}

window.main = () => {
  Loadable.preloadReady().then(_ => renderApp(App))
}

if (module.hot) {
  module.hot.accept('./Containers/App/index.js', () => {
    // eslint-disable-next-line global-require
    const nextApp = require('./Containers/App/index.js').default;
    renderApp(nextApp);
  });
}