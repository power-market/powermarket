import React, { Component } from 'react'
import Review from './Review'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {addProduct} from "../reducers/cart"

/* -----------------    COMPONENT     ------------------ */

class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      quant: 1
    }
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({quant: event.target.value})
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({quant: event.target.value})
    var filteredProductId = this.props.products.filter(product => product.id === this.props.paramId)[0].id
    console.log("FILTERED PRODUCT ID: ", filteredProductId);
    console.log(this.state.quant);
    this.props.createNewProduct(this.state.quant, filteredProductId);
  }

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
            <label ><h3 style={{ color: 'orange' }}> Quantity:</h3> 


                       <select style={{ color: '#263238' }} onChange = {this.handleChange}>
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                            <option value = "4">4</option>
                            <option value = "5">5</option>
                            <option value = "6">6</option>
                            <option value = "7">7</option>
                            <option value = "8">8</option>
                            <option value = "9">9</option>
                            <option value = "10">10</option> 
                        </select>

            </label>
               <button type = "submit" className = "btn btn-success" onClick = {this.handleClick}> Add to Cart</button>
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
const mapDispatchToProps = (dispatch) => {
  return {
    createNewProduct: function(quantity, itemId){
      dispatch(addProduct(quantity, itemId))
    }
  }
}

export default withRouter(connect(
  mapStateToProps,mapDispatchToProps
)(SingleProduct))
