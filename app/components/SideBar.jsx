import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchProducts} from "../reducers/product"


export class SideBar extends Component{

  constructor(props){
    super(props)
    this.state = {
      categories: []
    }
    this.filteredCategories = this.filteredCategories.bind(this);
  }
  componentDidMount(){
      this.props.fetchProducts();
  }

  filteredCategories(){
    this.props.products.forEach((eachProduct) => {
      if(!this.state.categories.includes(eachProduct.category)){
            this.state.categories.push(eachProduct.category)
      }})
  }

  render(){
      this.filteredCategories();
      console.log("just put shit into store", this.state.categories)
    return(

        <div>

                {/* <button type="button" className="navbar-toggle" data-toggle="sidebar" data-target=".sidebar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
               </button> */}
                {/* <div className="col-xs-7 col-sm-3 col-md-3 sidebar sidebar-left sidebar-animate sidebar-md-show">
                    YOOOOOOOOOOOOOOOOOO
                </div> */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-lg-2">
                  <nav className="navbar navbar-default  navbar-fixed-side"> </nav>
            </div>
            <div className="col-sm-9 col-lg-10">
              <div>{this.state.categories}</div>
        </div>
      </div>
  </div>
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
  fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)


