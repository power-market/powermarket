import React, { Component } from 'react'
import Review from './Review'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

/* -----------------    COMPONENT     ------------------ */

class SingleProduct extends Component {
  render() {
    const { products, reviews, paramId } = this.props
    const filteredProduct = products.filter(product => product.id === paramId)
    const filteredReviews = reviews.filter(review => review.product_id === filteredProduct.id)
    const stars = () => {
      if (!filteredReviews.length) return 'No Reviews'
      let sum = 0
      filteredReviews.forEach(review => {
        sum += review.stars
      })
      return 'Rated' + sum / filteredReviews.length + 'out of 5'
    }
    return (
      <div style={{ marginLeft: 5 + 'em' }}>
        <div>
          <h1 className="title">{filteredProduct[0] && filteredProduct[0].name}</h1>
          

          <form className="form-inline">
          <fieldset>
            <label ><h3 style={{ color: 'orange' }}> Quantity:</h3> </label>
            <input className="form-control" type="text"/>
            <button type = "submit" className = "btn btn-success">Add to Cart</button>
          </fieldset>
          </form>

          <h3 className="title">${filteredProduct[0] && filteredProduct[0].price}</h3>
          <h4>{stars()}</h4>
          <br />
          <div className="photoCard">
            <img width="200" height="200" src={filteredProduct[0] && filteredProduct[0].imageUrl} />
          </div>
          <br />
          <h4>Description</h4>
          <div className="signin-container">
            <div className="buffer local">
              <p>{filteredProduct[0] && filteredProduct[0].description}</p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="bordered">
            <h3>Reviews</h3>
            <br />
            <ul className="media-list" style={{ marginLeft: 1 + 'em' }}>
              {filteredReviews.map(review => <Review review={review} key={review.id} />)}
            </ul>
          </div>
          <br />
          <h4>Write a Review</h4>
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
    products,
    reviews,
    paramId
  }
}

export default withRouter(connect(
  mapStateToProps
)(SingleProduct))
