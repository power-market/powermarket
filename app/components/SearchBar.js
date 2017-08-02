import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import search, { unfilteredProducts, filterProducts } from '../reducers/search'

export class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.searchHandleChange = this.searchHandleChange.bind(this)
  }

  searchHandleChange(event) {
    this.props.filterProducts(event.target.value)
  }

  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <label ><h3 style={{ color: 'orange' }}> Search: </h3> </label>
            <input className="form-control"  type="text" onChange={this.searchHandleChange} />
          </fieldset>
        </form>
    </div>
    )
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

export default connect(null, mapDispatchToProps)(SearchBar)
