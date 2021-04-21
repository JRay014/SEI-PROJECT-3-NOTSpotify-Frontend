import React, { Component } from 'react'
import "./Register.css"

export default class Register extends Component {
  state = {
    firstName: "",
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
      firstName: this.state.firstName,
      username: this.state.username,
      password: this.state.password,
    }
    try {
      const response = await fetch('http://localhost:3003/users/register', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        return (
          console.log(response.ok),//Showing that the status is okay
          Response.redirect('http://localhost:3003/sessions/new')
        )
      }
    }
    catch (err) {
      console.log('error:', err);
    }
  }
  componentDidMount() {
    this.setState({
      firstName: " ",
      username: "",
      password: "",
    })
  }

  render() {
    return (
      <div className="Register-container">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type='text' name='firstName' placeholder="First Name" required onChange={this.handleChange} />
          <br></br>
          <label>Username</label>
          <input type='text' name='username' placeholder="Username" required onChange={this.handleChange} />
          <br></br>
          <label>Password</label>
          <input type='password' name='password' placeholder="Password" required onChange={this.handleChange} />
          <button onSubmit={this.handleSubmit}> Sign Up </button>
        </form>
      </div>
    )
  }
}
