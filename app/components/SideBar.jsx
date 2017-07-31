import React, {Component} from "react"
import {connect} from "react-redux"
import allProducts from "../reducers/product"

export class SideBar extends Component{

  constructor(props){
    super(props)
    this.filteredCategories = this.filteredCategories.bind(this);
  }

  filteredCategories(){
      console.log(this.props.products);
  }

  render(){
      {this.filteredCategories()}
    return(
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-lg-2">
                  <nav className="navbar navbar-default  navbar-fixed-side"> </nav>
            </div>
            <div className="col-sm-9 col-lg-10">
        }
        }
        </div>
      </div>
  </div>
    </div>
      )
  }

}

function mapStateToProps(state){
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, null)(SideBar)


