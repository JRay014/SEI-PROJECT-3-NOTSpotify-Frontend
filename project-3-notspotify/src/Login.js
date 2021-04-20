import React, { Component } from 'react'

export default class Login extends Component{
  state={
    username: "",
    password: ""
  }


  handleChange = (event) =>{
    const {name, value} = event.target
    this.setState({[name]:value})
  }

  handleSubmit = async(event)=>{
    event.preventDefault()
    const user ={
      username: this.state.username,
      password: this.state.password,
    }
    try{
      const response = await fetch('http://localhost:3003/users',{
        method: "POST",
        body:JSON.stringify(user),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if (response.status ===200){
        return(
          console.log(response.ok)//Showing that the status is okay
        )
      }
    }
    catch(err){
      console.log('error:', err);
    }
  }
  componentDidMount(){
    console.log(this.state);
  }

  render(){
    return(
      <div>
        <h2>Log In Here</h2>
        <form onSubmit= {this.handlesubmit}>
          <input type= 'text' name='username' placeholder="Username" required onChange={this.handleChange}/>
          <input type= 'password' name='password' placeholder="Password" required onChange={this.handleChange}/>
          <button onSubmit={this.handleSubmit}>Login</button>
        </form>

      </div>
    )
  }
}
