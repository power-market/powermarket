import React, { Component } from 'react'
import Products from "../reducers/product"
import { fetchProducts } from "../reducers/product"
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

export class Main extends Component {

    render() {

        return (
            <div>

                <div className="row">
                    <div className="col-xs-6">
                        <h3>Powers</h3>
                    </div>
                    <div className="col-xs-2 col-xs-offset-4">
                        <button type="button" className="btn btn-primary"> Add a Super Power </button>
                    </div>
                </div>

                <div className="row">

                    {
                        this.props.products.map(eachProduct => {
                            return (
                                <div className="col-xs-4" key={eachProduct.id}>
                                    <Link className="thumbnail" to={`/products/${eachProduct.id}`}>
                                        <img src={eachProduct.imageUrl} className="img-thumbnail" style={{ height: '250px', width: '700px' }} />
                                        <div className="caption">
                                            <h5>
                                                <span>{eachProduct.name}</span>
                                            </h5>
                                        </div>
                                    </Link>
                                </div>)
                        })

                    }

                </div>

            </div>
        )

    }
}
const mapStateToProps = function (state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Main)
