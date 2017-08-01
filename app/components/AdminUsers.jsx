import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser } from '../reducers/users'
import UserItem from './AdminUserItem'

/* -----------------    COMPONENT     ------------------ */

class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
    }

    this.filterUser = this.filterUser.bind(this)
    this.renderUserSearch = this.renderUserSearch.bind(this)
    this.renderNewUserWidget = this.renderNewUserWidget.bind(this)
    this.submit = this.submit.bind(this)
  }

  render() {
    return (
      <div className="container">
        <div className="user-query">
          {this.renderUserSearch()}
          {this.renderNewUserWidget()}
        </div>
        <br />
        <br />
        <div className="user-list">
          {
            this.props.users && this.props.users
              .filter(this.filterUser)
              .map(user => <UserItem user={user} key={user.id} />)
          }
        </div>
      </div>
    )
  }

  renderUserSearch() {
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <span className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                type="text"
                placeholder="Jean Doe"
                className="form-like"
                onChange={evt => this.setState({ name: evt.target.value })}
              />
            </h4>
            <h5 className="tucked">
              <input
                type="email"
                placeholder="email@website.com"
                className="form-like"
                onChange={evt => this.setState({ email: evt.target.value })}
              />
            </h5>
          </div>
        </div>
      </div>
    )
  }

  filterUser(user) {
    const nameMatch = new RegExp(this.state.name, 'i')
    const emailMatch = new RegExp(this.state.email, 'i')

    return nameMatch.test(user.name) && emailMatch.test(user.email)
  }

  renderNewUserWidget() {
    return (
      <div className="list-group-item min-content user-item">
        <form className="media" onSubmit={this.submit}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="glyphicon glyphicon-plus clickable"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                name="name"
                type="text"
                required
                placeholder="Jean Doe"
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="email"
                type="email"
                required
                placeholder="email@website.com"
                className="form-like"
              />
            </h5>
          </div>
        </form>
      </div>
    )
  }

  submit(event) {
    event.preventDefault()
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
    }
    this.props.addUser(user)
    event.target.name.value = ''
    event.target.email.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users }) => ({ users })

const mapDispatch = { addUser }

export default connect(mapState, mapDispatch)(UserList)
