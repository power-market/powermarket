import React, { Component } from 'react'
import Review from './Review'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import _ from 'lodash'
import { } from '../store'

/* Displays all the information within the campus view page.
This includes deleting/updating campus info, adding a new student,
or adding an exisiting student from another campus. */

/* -----------------    COMPONENT     ------------------ */

class ProductView extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange(event) {

  }

  render() {
    const { product, reviews } = this.props
    const filteredReviews = reviews.filter(review => review.product_id === product.id)
    return (
      <div>
        <div>
          <h2 className="title">{product.name}</h2>
          <br />
          <div className="photoCard">
            <img width="200" height="200" src={product.imageUrl} />
          </div>
          <br />
          <h4>Product Description</h4>
          <div className="signin-container">
            <div className="buffer local">
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="bordered">
            <h3 style={{ marginLeft: 0.5 + 'em' }}>Reviews</h3>
            <br />
            <ul className="media-list" style={{ marginLeft: 1 + 'em' }}>
              {filteredReviews.map(review => <Review review={review} key={review.id} />)}
            </ul>
          </div>
          <br />
          <h4>Write a Review</h4>
          <NewReview />
          <br />
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products, reviews }, ownProps) => {
  const paramId = Number(ownProps.match.params.campusId)
  return {
    product: _.find(products, product => product.id === paramId),
    reviews: reviews
  }
};

const mapDispatch = {}

export default withRouter(connect(
  mapStateToProps, mapDispatch
)(ProductView))
