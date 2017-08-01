import React from 'react'
import { NavLink } from 'react-router-dom'
export const WhoAmI = ({ user, logout }) => (
  <div>
    <div className='whoami pull-right'>
      <NavLink className="whoami-user-name" style={{ color: 'orange' }} to={`/users/${user.id}`}>
        <h4>Welcome {user && user.name}</h4>
      </NavLink>
    </div>
    <button className="logout pull-right" onClick={logout}>Logout</button>
  </div>
)
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  { logout },
)(WhoAmI)
