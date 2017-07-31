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
    this.searchHandleChange = this.searchHandleChange.bind(this)
  }

  searchHandleChange(event) {
    this.setState({ search: event.target.value })
    this.props.filterProducts(this.state.search)
  }

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
    allProducts: state.allSearched
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
