import React from "react"
import ReactDOM from "react-dom"

// containers
import App from "./containers/App"

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware, routerReducer, push } from 'react-router-redux'
import { createBrowserHistory } from "history"
import thunk from "redux-thunk"
// modules
import * as reducers from "./modules/reducers"


const history = createBrowserHistory({
  basename: window.__BASENAME__ || '/',
})
const middlewares = [
  routerMiddleware(history),
  thunk,
  // MoveToMiddleware,
]

// const initialState = undefined
const initialState = {
  assetsPath: window.__ASSETS__,
  routes: window.__ROUTES__,
}

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  initialState,
  applyMiddleware(...middlewares)
)


export default class AppContainer extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}
