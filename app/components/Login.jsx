import React, { Component } from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }
  onSignupSubmit = evt => {
    evt.preventDefault()
    this.props.login(evt.target.username.value, evt.target.password.value)
  }

  render() {
    return (
      <div style={{ marginLeft: 50 + 'em' }}>
        <form className="form-horizontal" onSubmit={this.onSignupSubmit}>
          <input name="username" />
          <input name="password" type="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default connect(state => ({}), { login })(Login)
