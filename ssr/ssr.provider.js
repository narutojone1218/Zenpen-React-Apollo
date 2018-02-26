import React from 'react'
import { StaticRouter } from 'react-router'
import { IntrospectionFragmentMatcher } from 'apollo-client'
import { ApolloClient, createNetworkInterface, ApolloProvider, getDataFromTree } from 'react-apollo'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as responsiveReducer, setMobileDetect, mobileParser } from 'react-responsive-redux'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import introspectionQueryResultData from '../src/fragmentTypes.json'
import authReducer from '../src/Components/Auth/reducer'
import modalReducer from '../src/Components/Modal/reducer'
import alertsReducer from '../src/Components/Alerts/reducer'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const makeClientWithToken = (uri, token) => (
  new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri,
      opts: {
        credentials: 'same-origin',
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        },
      },
    }),
    fragmentMatcher,
  })
)

export default (ctx) => {
  const apiUrl = `${ctx.getApiServerBase()}/graphql`
  const client = makeClientWithToken(apiUrl, ctx.token)
  const sheet = new ServerStyleSheet()
  const routeContext = {}

  const store = createStore(
    combineReducers({
      apollo: client.reducer(),
      auth: authReducer,
      modal: modalReducer,
      form: formReducer,
      responsive: responsiveReducer,
      alerts: alertsReducer,
    }),
    {
      alerts: alertsReducer.initialState,
      apollo: {},
      modal: { isOpen: false },
      auth: { token: ctx.token },
    },
    compose(applyMiddleware.apply({}, [client.middleware()])),
  )

  store.dispatch(setMobileDetect(mobileParser(ctx.req)))

  const component = (
    <StyleSheetManager sheet={sheet.instance}>
      <ApolloProvider store={store} client={client}>
        <StaticRouter location={ctx.getRequestUrl()} context={routeContext}>
          <ctx.ModuleCollector>
            <ctx.RenderComponent />
          </ctx.ModuleCollector>
        </StaticRouter>
      </ApolloProvider>
    </StyleSheetManager>
  )

  return getDataFromTree(component)
    .then(_ => ctx.setComponent(component)
      .setStyles(sheet.getStyleElement())
      .setRouterContext(routeContext)
      .setInitialState(store.getState()))
}

