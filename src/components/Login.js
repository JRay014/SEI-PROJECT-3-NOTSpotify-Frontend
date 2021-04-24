import React, { Component } from 'react'
import './css/Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: ""
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKENDURL}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      if (response.status === 200) {
        // console.log("Login Successful")
        const currentUser = await response.json()
        this.props.logInHandle(currentUser)
        this.props.history.push('/notspotify')
      }
      else if (response.status === 404) {
        // console.log("User Not Found")
        this.setState({
          error: 'Invalid Username or Password'
        })
      }
    }
    catch (err) {
      console.log('error:', err);
    }
  }


  render() {

    return (
      <div className="Login-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} className="Login-form">
          <div className="errorMsg">
            <p>{this.state.error}</p>
          </div>
          <label>Username </label>
          <input type='text' name='username' placeholder="Username" required onChange={this.handleChange} />
          <br></br>
          <label>Password </label>
          <input type='password' name='password' placeholder="Password" required onChange={this.handleChange} />
          <br></br>
          <button>Login</button>
        </form>

      </div>
    )
  }
}
