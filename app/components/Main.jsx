import React, { Component } from 'react'
import Products from "../reducers/product";
import {getThings} from "../reducers/product";
import {connect} from 'react-redux'

export class Main extends Component {
    componentWillMount(){
        this.props.getThings()
    }
    render(){
        console.log(this.props.products)
        return(
            <div className= 'random products'>
               <h2> {this.props.products.map(item => {
                        return (<div key = {item.id}> {item.name}</div>)
                   })   
                }
                </h2>
            </div>
            
        )
    }
}
   const mapStateToProps = function(state){
        return {
            products: state.products
        }
    }

    const mapDispatchToProps = {
        getThings
    }


 
export default connect(mapStateToProps, mapDispatchToProps)(Main)