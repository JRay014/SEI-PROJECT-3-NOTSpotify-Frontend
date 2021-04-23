import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './css/App.css';
import logo from './css/images/logo.png'
import Home from "./UserHomepage"
import Login from "./Login"
import Register from "./Register"
import Landing from "./Landing"



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
            <Link className="Navbar-home" to='/'><img src={logo} alt="Not Spotify"/></Link>
            {this.state.isLoggedIn
              ? <div className="Navbar-loggedIn">
                <p className="Navbar-welcome">Welcome {this.state.currentUser.firstName} !</p>
                <Link to='/notspotify'>Home</Link>
                <Link to='/users/login' onClick={() => this.logOutHandle()}>Logout</Link>
              </div>

              : <div className="Navbar-links">
                <Link to='/users/login' > Login</Link>
                <Link to='/users/register' > Sign up </Link>
              </div>
            }

          </nav>
          <Switch>
            <Route exact path="/" render={() => <Landing />} />
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
