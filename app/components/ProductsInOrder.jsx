import axios from 'axios'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrder, fetchOrderPoducts, removeOrder } from '../reducers/order'

class ProductsInOrder extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.getOrder(this.props.match.params.orderId)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.removeOrder(this.props.selectedOrder[0].order.id)
  }



  render() {
    const currentOrder = this.props.selectedOrder[0]
    let total = 0
    return (

      <div className="order-image">
        {
          currentOrder &&
          <div>
            <div>
              <h4 className="order-date col-lg-12">Date: {currentOrder.order.date}</h4>
              <h4 className="order-status col-lg-12">Status: {currentOrder.order.status}</h4>
              <h4 className="order-id col-lg-12">Order No: {currentOrder.order.id}</h4>
              <hr />
              <div>
                {this.props.selectedOrder.map(product => {
                  return (
                    <div key={product.product_id} className="">
                      { (() => {
                        total += product.unitPrice * product.unitQuantity
                      })() }
                      <div className="">
                        <div>
                          <h2 className="product-name col-lg-12"><Link to={`/products/${product.product_id}`}>{product.product.name}</Link></h2>
                          <img className="col-lg-12" src={`${product.product.imageUrl}`} height="75" />
                          <p className="product-quantity col-lg-12">Quantity: {product.unitQuantity}</p>
                          <p className="product-price col-lg-12">Price: $ {product.unitPrice}
                          </p>
                          <p className="product-subtotal col-lg-12">Subtotal: ${(product.unitPrice * product.unitQuantity).toFixed(2)}</p>
                        </div>
                        <br></br>
                      </div>
                    </div>

                  )
                })}
              </div>
            </div>
            <div className="row"></div>
            <div className="total-cost col-lg-12">
              <h1>Total Cost: ${total.toFixed(2)}</h1>
              {currentOrder.order.status === 'processing' ?
                <div className="col-lg-12" >
                  <button type="submit" onClick={this.handleSubmit}> Cancel Order </button>
                </div>
                : null
              }
            </div>
            <br></br>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedOrder: state.order.selectedOrder

})

const mapDispatchToProps = dispatch => ({
  getOrder: (orderId) => {
    dispatch(fetchOrderPoducts(orderId))
  },
  removeOrder: (orderId) => {
    dispatch(removeOrder(orderId))
    dispatch(fetchOrderPoducts(orderId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsInOrder)
