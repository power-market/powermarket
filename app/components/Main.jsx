import React, { Component } from 'react'
import Products from "../reducers/product"
import { fetchProducts } from "../reducers/product"
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"
import { withRouter } from 'react-router'


import Search from "../reducers/search"

render() {
    var displayItems = []
    this.props.search.length > 0 ? displayItems = this.props.search : displayItems = this.props.products

    componentWillMount(){
        this.props.fetchProducts()
    }
    compareSearchStoreToProductStore(){
        if (this.props.search.length)
            this.setState({ allProducts: this.props.search });
    }


    render(){
        var displayItems = [];
        this.props.search.length > 0 ? displayItems = this.props.search : displayItems = this.props.products;
        console.log(displayItems);

        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <h3>Powers</h3>
                    </div>
                </div>
                <div className="row">
<<<<<<< HEAD
                {
                    displayItems.map(eachProduct => {
                        return (
                            <div className="col-xs-4" key={eachProduct.id}>
                                <NavLink className="thumbnail" to={`/products/${eachProduct.id}`}>
                                    <img src={eachProduct.imageUrl} className="img-thumbnail" style={{ height: '250px', width: '700px' }} />
                                    <div className="caption">
                                        <h5>
                                            <span>{eachProduct.name}</span>
                                        </h5>
                                    </div>
                                </NavLink>
                            </div>)
                    })
=======
           {
            displayItems.map(eachProduct => {
            return (
            <div className="col-xs-4" key={ eachProduct.id }>
                <Link className = "thumbnail" to = {`/`}>
                <img src={ eachProduct.imageUrl } className = "img-thumbnail" style = {{height: '250px', width: '700px'}}/>
                <div className="caption">
                  <h5>
                    <span>{ eachProduct.name }</span>
                  </h5>
                </div>
                </Link>
            </div>)
           })
>>>>>>> master
                }
            </div>
            </div >
        )
    }
}
<<<<<<< HEAD

const mapStateToProps = function (state) {
    return {
        products: state.products,
        search: state.search
=======
   const mapStateToProps = function(state){
        return {
            products: state.products,
            search: state.search
        }
>>>>>>> master
    }

    export default withRouter(connect(mapStateToProps)(Main))
