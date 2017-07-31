import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchProducts} from "../reducers/product"
import Sidebar from "react-side-bar";


export class SideBar extends Component{

  constructor(props){
    super(props)
    this.state = {
      categories: [],
    }
    this.sidebarProps = {
        bar: (<div>Amazing Sidebar</div>),
        size: 1000,
    };
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
    return(
    <sidebar>
        <div className="sidebar-header" style = {{color: "black"}}>
          <h4 href="#">
            <a href="/">
              <div className="mainhead" style={{ color: 'black' }}> Category Side Bar </div>
            </a>
          </h4>
        </div>
    </sidebar>
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


