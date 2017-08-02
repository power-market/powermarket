'use strict'

import 'babel-polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Main from './components/Main'
import SingleProduct from './components/SingleProduct'
import SearchBar from './components/SearchBar'
import Orders from './components/orders'
import ProductsInOrder from './components/ProductsInOrder'
import { fetchProducts } from './reducers/product.jsx'
import { fetchOrders, fetchOrder } from './reducers/order'

class App extends Component {
  componentWillMount() {
    this.props.fetchInitialData()
  }

  render() {
    const { user, children } = this.props
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/" style={{ color: "orange" }} >Power Market</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="/">Your Cart</a></li>
              <li className="col-xs-2 col-xs-offset-4">{user ? <WhoAmI /> : <Login />}</li>
            </ul>
          </div>
          <SearchBar />
        </nav>
        <main>
          <Switch>
            <Route path='/products/:productId' component={SingleProduct} />
            <Route path='/orders/:orderId' component={ProductsInOrder} />
            <Route path='/orders' component={Orders} />
            <Route exact path="/" component={Main} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, products }) => ({ user: auth, products })

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchProducts())
    dispatch(fetchOrders())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatch)(App))
