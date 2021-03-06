'use strict'

import 'babel-polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Router } from 'react-router'
import { BrowserRouter, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom'
import history from './history'
import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Main from './components/Main'
import User from './components/User'
import AdminUsers from './components/AdminUsers.jsx'
import SingleProduct from './components/SingleProduct'
import SearchBar from './components/SearchBar'
import ProductsInOrder from './components/ProductsInOrder'
import Orders from './components/Orders'
import { fetchProducts } from './reducers/product.jsx'
import { fetchOrders } from './reducers/order.jsx'
import { fetchUsers } from './reducers/users.jsx'
import Signup from './components/Signup.jsx'
import Cart from './components/Cart.jsx'

class App extends Component {
  componentWillMount() {
    this.props.fetchInitialData()
    this.props.fetchOrderData()
  }

  render() {
    const { user, children } = this.props
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1><a href="/" className="text-left" style={{ color: 'orange' }} >Power Market</a></h1>

            </div>
            <ul className="nav col-xs-2 navbar-nav pull-right" style={{ marginRight: 5 + 'em' }}>
              <li className="col-xs-2 col-xs-offset-4 pull-right">{user ? <WhoAmI /> : <Login />}</li>
              <li className="col-xs-4">{user && user.admin ? <Link to='/users'><h4 style={{ color: 'orange' }}>Manage Users</h4></Link> : <div></div>}</li>
            </ul>
            <ul>
              <li className="nav col-xs-2 navbar-nav pull-right">{user ? <div></div> : <Link to='/signup' style={{ color: 'orange', marginTop: 2 + 'em' }}>Sign up</Link>}</li>
            </ul>
          </div>
          <div className="container-fluid">
            <SearchBar />
            <a href="/cart" className="btn btn-info btn-sm col-xs-1">
              <span className="glyphicon glyphicon-shopping-cart"></span> Shopping Cart
            </a>
          </div>
        </nav>
        <main>
          <Switch>
            <Route path='/products/:productId' component={SingleProduct} />
            <Route exact path='/cart' component={Cart} />
            <Route path='/orders/:orderId' component={ProductsInOrder} />
            <Route path='/orders' component={Orders} />
            <Route path='/users/:usersId' component={User} />
            <Route path='/users' component={AdminUsers} />
            <Route path="/signup" component={Signup} />
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
    dispatch(fetchUsers())
  },
  fetchOrderData: () => {
    dispatch(fetchOrders())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatch)(App))
