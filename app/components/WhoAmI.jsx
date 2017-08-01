import React from 'react'
import { NavLink } from 'react-router-dom'
export const WhoAmI = ({ user, logout }) => (
  <div className="whoami" style={{ marginLeft: 67 + 'em' }}>
    <NavLink className="whoami-user-name" style={{ color: 'orange' }} to={`/users/${user.id}`}>
      <a>Welcome {user && user.name}</a>
    </NavLink>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  { logout },
)(WhoAmI)
