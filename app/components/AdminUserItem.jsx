import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeUser } from '../reducers/users'

/* -----------------    COMPONENT     ------------------ */

class UserItem extends React.Component {
  constructor(props) {
    super(props)
    this.removeUserCallback = this.removeUserCallback.bind(this)
  }

  render() {
    const { user } = this.props
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="Jean Doe">{user.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
            <h5 className="tucked">
              <span>{user.status}</span>
            </h5>
          </NavLink>
          <div className="media-right media-middle">
            <button
              className="btn btn-default"
              onClick={this.removeUserCallback}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  removeUserCallback(event) {
    const { removeUser, user } = this.props
    event.stopPropagation()
    removeUser(user.id)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({})

const mapDispatch = { removeUser }

export default connect(mapState, mapDispatch)(UserItem)
