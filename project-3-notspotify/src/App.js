import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Home from "./UserHomepage"
import Login from "./Login"
import Register from "./Register"
import Navbar from "./Navbar"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      currentUser: {}
    }

  }

  logInHandle = (currentUser) => {
    this.setState({
      isLoggedIn: true,
      currentUser: currentUser
    })
  }

  logOutHandle = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: {}
    })
  }


  render() {

    return (
      <>
        <BrowserRouter>
          {/* <Navbar /> */}
          <nav className="Navbar">
            <h3>Not Spotify</h3>
            {this.state.isLoggedIn
              ? <div className="Navbar-loggedIn">
                <p className="Navbar-welcome">Welcome {this.state.currentUser.username}!</p>
                <Link to='/users/login' onClick={() => this.logOutHandle()}>Logout</Link>
              </div>

              : <div className="Navbar-links">
                <Link to='/users/login' > Login</Link>
                <Link to='/users/register' > Sign up </Link>
              </div>
            }

          </nav>
          <Switch>
            <Route exact path="/users/login" render={(routeProps) => <Login {...routeProps} logInHandle={this.logInHandle} />} />
            <Route exact path="/users/register" render={(routeProps) => <Register {...routeProps} />} logInHandle={this.logInHandle} />
            <Route exact path="/notspotify" render={(routeProps) => this.state.isLoggedIn ? <Home currentUser={this.state.currentUser} /> : <Login {...routeProps} logInHandle={this.logInHandle} />} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


export default App;
