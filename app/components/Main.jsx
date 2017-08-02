import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
// import Sidebar from './Sidebar'

export class Main extends Component {
  constructor() {
      super()
      this.state = {
          displayItems: [],
          sortingtype: ''
        }
    }
  render() {
      this.state.displayItems.length > 0 ? this.state.displayItems : this.state.displayItems = this.props.products
      this.props.search.length > 0 ? this.state.displayItems = this.props.search : this.state.displayItems
      return (
            <div>
                <sidebar className='col-xs-2 sidebar-nav'>
                    <div className="sidebar-brand">
                        <label href="/">
                            <div>Categories</div>
                        </label>
                    </div>
                    <div>
                        <h5>
                            <a className='clearfix' onClick={this.onElementalClick.bind(this)}>Elemental</a>
                            <a className='clearfix' onClick={this.onAdaptationClick.bind(this)}>Adaptation</a>
                            <a className='clearfix' onClick={this.onMentalClick.bind(this)}>Mental</a>
                        </h5>

                    </div>

                    <div>
                        <label>Sort by</label>
                        <select style={{ color: '#263238' }}>
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                            <option>Oldest to Newest</option>
                            <option>Newest to Oldest</option>
                            <option>Best Selling</option>
                        </select>
                    </div>
                </sidebar>
                <div className="col-xs-10">
                    <h3>Powers</h3>
                    {
                        this.state.displayItems.map(eachProduct => (
                            <div className="col-xs-4" key={eachProduct.id}>
                                <NavLink className="thumbnail" to={`/products/${eachProduct.id}`}>
                                    <img src={eachProduct.imageUrl} className="img-thumbnail" style={{ height: '250px', width: '700px' }} />
                                    <div className="caption">
                                        <h5>
                                            <span>{eachProduct.name}</span>
                                        </h5>
                                        <h5>
                                            <span>${eachProduct.price.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                                        </h5>
                                    </div>
                                </NavLink>
                            </div>))
                    }
                </div>
            </div>

        )
    }

  onElementalClick() {
      this.setState({
          displayItems: this.props.products.filter(product => product.category === 'elemental')
        })
    }
  onMentalClick() {
      this.setState({
          displayItems: this.props.products.filter(product => product.category === 'mental')
        })
    }
  onAdaptationClick() {
      this.setState({
          displayItems: this.props.products.filter(product => product.category === 'adaptation')
        })
    }
}

const mapStateToProps = function(state) {
  return {
      products: state.products,
      search: state.search
    }
}

export default withRouter(connect(mapStateToProps)(Main))
