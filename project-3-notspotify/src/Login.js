import React, { Component } from 'react'
import './Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    username: "",
    password: ""
  }


  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    try {
      const response = await fetch('http://localhost:3003/users/login', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      if (response.status === 200) {
        console.log("Login Successful")
        const currentUser = await response.json()
        console.log(currentUser)
        this.props.logInHandle(currentUser)
        this.props.history.push('/notspotify')
      }
      else if (response.status === 404) {
        console.log("User Not Found");
      }
    }
    catch (err) {
      console.log('error:', err);
    }
  }






  componentDidMount() {

  }

  render() {

    return (
      <div className="Login-container">
        <div className="Login-sidebar"></div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} className="Login-form">
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
