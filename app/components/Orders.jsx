import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrders, fetchOrder } from '../reducers/order'
// import ProductsInOrder from './ProductsInOrder'

export class Orders extends Component {
  // componentDidMount() {
  //   this.props.getAllOrdersOrder()
  // }

  render() {

    return (
      <div>
        <h2>My Orders</h2>
        <div>
          {
            this.props.allOrders.length && this.props.allOrders.map(order =>
            <div key={order.id}>
              <h3>Order #:
                <Link to={`/orders/${order.id}`}>
                  {order.id}
                </Link>

              </h3>
              <h5>Date: {order.date}</h5>
              <h4>
                Order Status: {order.status}
              </h4>

              <br />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allOrders: state.order.allOrders,
})
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   getAllOrders: () => {
//     ownProps.orders.forEach(order => {
//       dispatch(fetchOrder(order.id))
//     })
//   }
// })

export default connect(mapStateToProps)(Orders)
