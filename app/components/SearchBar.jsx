
import React,{Component} from "react";
import {connect} from "react-redux";
import search, {unfilteredProducts, filterProducts} from "../reducers/search";

export class SearchBar extends Component{

constructor(props){
    super(props);
    this.state = {
        search: ""
    }
    this.searchHandleChange = this.searchHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

searchHandleChange(event){
    this.setState({search: event.target.value})
    this.props.filterProducts(this.state.search);

}

handleSubmit(event){
    event.preventDefault();
}

render(){
    return(
        <div>
              <form className="form-horizontal" onSubmit = {this.handleSubmit}>
             <fieldset>
                <legend>Search Bar</legend>
                <label > Search: </label>
                 <input className="form-control" value = {this.state.search} type = "text" onChange = {this.searchHandleChange} />
                     <button type = "submit" className = "btn btn-success" onSubmit = {this.handleSubmit}> Submit </button>
              </fieldset>
              </form>

        </div>
    )
}}

const mapStateToProps = (state) => {
    return {
        allProducts: state.allSearched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterProducts: function(whatUserTyped){
            var filteredThings = filterProducts(whatUserTyped);
            dispatch(filteredThings);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)


