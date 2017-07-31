import axios from 'axios'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const ProductsInOrder = props => {

  const { order } = props
  return (
    <div className="order-image">
      <div>
        <p className="order-date">Date: {order.date}</p>
        <p className="order-status">Status: {order.status}</p>
        <p className="order-id">Order {order.id}</p>
      </div>
      <div className="row">
        {
          order ? order.map(product => (
          <div key={product.id} className="">
            { (() => {
              totalCost += product.order.subtotal
            })()  }
            <div className="">
              <img className="" src={`${product.imageUrl}`} />
              <div>
                <h2 className="product-name"><Link to={`products/${product.id}`}>{product.name}</Link></h2>
                <p className="product-quantity">Quantity: {product.order.quantity}</p>
                <p className="product-price">Price: $ {product.order.price}
                </p>
                <p className="product-subtotal">Subtotal: ${product.order.subtotal}</p>
              </div>
            </div>
          </div>
        )) : null
        }
      </div>
      <div className="total-cost"><h1>Total Cost: ${total}</h1></div>
    </div>
  )
}