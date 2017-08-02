import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../reducers/auth'

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
  }

  render() {
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                name="name"
                type="name"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/login/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Login with Google</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/api/auth/login/github"
              className="btn btn-social btn-github">
              <i className="fa fa-github" />
              <span>Login with GitHub</span>
            </a>
          </p>
          <p>
            <a
              target="_self"
              href="/api/auth/login/facebook"
              className="btn btn-social btn-twitter">
              <i className="fa fa-twitter" />
              <span>Login with Facebook</span>
            </a>
          </p>
        </div>
      </div>
    )
  }

  onSignupSubmit(event) {
    event.preventDefault()
    const credentials = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    this.props.signup(credentials)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({})

export default connect(mapState, { signup })(Signup)
