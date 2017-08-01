import React from 'react'
import { NavLink } from 'react-router-dom'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name" style={{ color: 'orange' }}>
      Welcome {user && user.name}
    </span>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  { logout },
)(WhoAmI)
