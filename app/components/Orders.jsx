import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../reducers/order'


export class Orders extends Component {
  componentWillMount () {
    this.props.changeCurrentOrder()
  }
  
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = dispatch => ({
  changeCurrentOrder: () => {
    dispatch(fetchOrders())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)