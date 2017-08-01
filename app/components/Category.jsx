import React, { Component } from 'react'
import Products, { fetchProducts } from '../reducers/product'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Category extends Component {
  componentDidMount() {

    }
  render() {
      return (
            <div>
                <h2>{this.props.categories.length && this.props.product.filter((selectedCategory) => (selectedCategory === this.props.product.category)).map(eachProduct => (
                    <div className="col-xs-4" key={eachProduct.id}>
                        <Link className="thumbnail" to={`/`}>
                            <img src={eachProduct.imageUrl} className="img-thumbnail" style={{ height: '250px', width: '700px' }} />
                            <div className="caption">
                                <h5>
                                    <span>{eachProduct.name}</span>
                                </h5>
                            </div>
                        </Link>
                    </div>))}</h2>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ product: state.product })
const mapDispatchToProps = (dispatch) => {
  fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
