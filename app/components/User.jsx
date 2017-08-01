import React, { Component } from 'react'
import Review from './Review'
import { connect } from 'react-redux'
import { ReviewForm } from './ReviewForm'

class User extends Component {
    /*
    Account management
    View past order list
    View order detail
    Current order status
    Items with quantity and subtotal
    Link to the original product detail page
    Date/time order was created
    Product reviews
    Leave a review (with text and a 5-star rating) for a product
    */
  render() {
      return (
            <div>
                <h1>Account Management</h1>
                <h2>View Past Order</h2>
                <h2>Product Reviews</h2>
                {/* <ReviewForm /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(User)
