'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Main from "./components/Main"
import SearchBar from "./components/SearchBar"


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
         <nav className="navbar navbar-inverse">
          <div className="container-fluid">
              <div className="navbar-header">
              <a className="navbar-brand" href = "/" style = {{color: "orange"}} >Power Market</a>
              </div>
              <ul className="nav navbar-nav">
              <li className="active"><a href="/">Your Cart</a></li>
              <li className ="col-xs-2 col-xs-offset-4">{user ? <WhoAmI/> : <Login/>}</li>
              </ul>
          </div>
          <SearchBar />
      </nav>
      <main>
        <Switch>
          <Route exact path = "/" component = {Main} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
)

render(
  <Provider store={store}>
    <Router>
      <ExampleApp />
    </Router>
  </Provider>,
  document.getElementById('main')
)
