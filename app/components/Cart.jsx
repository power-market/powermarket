import React, { Component } from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { allProductsInCart } from "../reducers/cart"
export class Cart extends Component {
  componentDidMount() {
    this.props.getAllItems();
  }
  constructor(props) {
    super(props)
  }
  render() {
    console.log("ALL MY ITEMS", this.props.allItems)
    return (
      <div className="col-xs-10">
        <h3>Your Cart</h3>
        {
          this.props.allItems.map(eachProduct => (
            <div className="col-xs-4" key={eachProduct.id}>
              <img src={eachProduct.product.imageUrl} className="img-thumbnail" style={{ height: '250px', width: '700px' }} />
              <div className="caption">
                <h5>
                  <span>{eachProduct.product.name}</span>
                </h5>
                <h5>
                  <span>Quantity: {eachProduct.quantity}</span>
                </h5>
                <h5>
                  <span>${eachProduct.product.price.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                </h5>
              </div>
            </div>))
        }
      </div>
      //    <div> {this.props.allItems.map((eachProduct) => (<div key = {eachProduct.id}> NAME: {eachProduct.product.name} </div>))}
    )
  }
}
const mapStateToProps = (state) => {
  return {
    allItems: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: function () {
      var products = allProductsInCart();
      dispatch(products);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
