import React, { Component } from 'react'
import Products from "../reducers/product"
import { fetchProducts } from "../reducers/product"
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import Search from "../reducers/search"

export class Main extends Component {
    constructor(props){
        super(props);
        this.state ={
            allProducts: props.products
        }
        this.compareSearchStoreToProductStore = this.compareSearchStoreToProductStore.bind(this)
    }

    componentWillMount(){
        this.props.fetchProducts()
    }
    compareSearchStoreToProductStore(){
        if(this.props.search.length)
            this.setState({allProducts: this.props.search});
    }
        
    
    render(){ 
           var displayItems = [];
           this.props.search.length > 0  ?  displayItems = this.props.search : displayItems = this.props.products;
           console.log(displayItems);

        return(     
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

                    }

                </div>

            </div>
        )

    }
}
   const mapStateToProps = function(state){
        return {
            products: state.products,
            search: state.search
        }
    }
}

const mapDispatchToProps = {
    fetchProducts
}



export default connect(mapStateToProps, mapDispatchToProps)(Main)
