import React, { Component } from 'react'
import "./css/Register.css"

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
    // console.log(user)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKENDURL}/users/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        console.log('account created')
        console.log(await response.json())
        this.props.history.push('/notspotify')
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
