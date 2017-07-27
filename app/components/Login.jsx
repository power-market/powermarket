import React, {Component} from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export class Login extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }
   onSignupSubmit = evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
   } 
   
  render(){
    return(
        <form onSubmit={}>
          <input name="username" onChange = {changeUsername} />
          <input name="password" type="password" onChange = {changePassword} />
          <input type="submit" value="Login" onSubmit={onSignupSubmit}/>
        </form>
    )
}
}

export default connect(state => ({}),{login})(Login)



