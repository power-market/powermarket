import React, { Component } from 'react'
import Products from '../reducers/product'
import { fetchProducts } from '../reducers/product'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Sidebar from './Sidebar'

export class Main extends Component {
  render() {
      var displayItems = []
      this.props.search.length > 0 ? displayItems = this.props.search : displayItems = this.props.products

      return (
            <div>
                <Sidebar />
                <div className="col-xs-10">
                    <h3>Powers</h3>
                    {
                        displayItems.map(eachProduct => (
                            <div className="col-xs-4" key={eachProduct.id}>
                                <NavLink className="thumbnail" to={`/products/${eachProduct.id}`}>
                                    <img src={eachProduct.imageUrl} className="img-thumbnail" style={{ height: '250px', width: '700px' }} />
                                    <div className="caption">
                                        <h5>
                                            <span>{eachProduct.name}</span>
                                        </h5>
                                    </div>
                                </NavLink>
                            </div>))
                    }
                </div>
            </div>

        )
    }
}

const mapStateToProps = function(state) {
  return {
      products: state.products,
      search: state.search
    }
}

export default withRouter(connect(mapStateToProps)(Main))
