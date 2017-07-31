import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import search, { unfilteredProducts, filterProducts } from '../reducers/search'

export class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.searchHandleChange = this.searchHandleChange.bind(this)  // KH/ET: Look into using an arrow function in class definition so you don't have to bind.
  }

  /* KH/ET: Look into using an arrow function in class definition so you don't have to bind */

  /* KH/ET: Don't need to maintain local state with your search string if all you're doing is passing that straight into filterProducts. */
  searchHandleChange(event) {
    this.setState({ search: event.target.value })
    this.props.filterProducts(this.state.search)
  }

  //KH/ET: Remove dead code? What is this onSubmit doing?
  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <label ><h3 style={{ color: 'orange' }}> Search:</h3> </label>
            <input className="form-control" value={this.state.search} type="text" onChange={this.searchHandleChange} />
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.allSearched // KH/ET: state.allSearched doesn't work -- need to call the right property from your root reducer, which thinks it's called state.search. You also don't need this at all -- the content of that reducer is only used in Main.jsx, not here.
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    filterProducts: function (whatUserTyped) {
      var filteredThings = filterProducts(whatUserTyped)
      dispatch(filteredThings)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
