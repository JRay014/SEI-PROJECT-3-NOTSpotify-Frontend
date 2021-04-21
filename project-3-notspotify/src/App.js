import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from "./UserHomepage"
import Login from "./Login"
import Register from "./Register"
import Nav from "./Navbar"


class App extends Component{
  render() {

    return (
      <>
      <Nav />
        <BrowserRouter>
          <Switch>
            <Route exact path="/users/login" render={(routeProps)=><Login {...routeProps}/>} />
            <Route exact path="/users/register" component={Register} />
            <Route exact path="/notspotify" render={()=><Home />}/>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}


export default App;
