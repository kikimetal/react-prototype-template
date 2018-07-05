// polyfill
import "babel-polyfill"
import "es6-promise/auto"
import "isomorphic-fetch"

import React from "react"
import ReactDOM from "react-dom"
import AppContainer from "./AppContainer"

ReactDOM.render(
  <AppContainer />,
  document.getElementById("app")
)
