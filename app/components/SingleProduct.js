import React, { Component } from 'react'
import Review from './Review'
import { fetchProducts } from '../reducers/product'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import _ from 'lodash'

/* -----------------    COMPONENT     ------------------ */

class SingleProduct extends Component {
  render() {
    const { product, reviews } = this.props
    const filteredReviews = reviews.filter(review => review.product_id === product.id)
    const stars = () => {
      if (!filteredReviews.length) return 'No Reviews'
      let sum = 0
      filteredReviews.forEach(review => {
        sum += review.stars
      })
      return 'Rated' + sum / filteredReviews.length + 'out of 5'
    }
    return (
      <div>
        <div>
          <h2 className="title">{product.name}</h2>
          <h3 className="title">{product.price}</h3>
          <h4>{stars()}</h4>
          <br />
          <div className="photoCard">
            <img width="200" height="200" src={product.imageUrl} />
          </div>
          <br />
          <h4>Description</h4>
          <div className="signin-container">
            <div className="buffer local">
              <p>{product.description}</p>
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
          <ReviewForm />
          <br />
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products, reviews }, ownProps) => {
  const paramId = Number(ownProps.match.params.productId)
  return {
    product: _.find(products, product => product.id === paramId),
    reviews: reviews
  }
}

// const mapDispatch = {}

export default withRouter(connect(
  mapStateToProps
)(SingleProduct))
