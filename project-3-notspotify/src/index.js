import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Nav from './Navbar'
import Login from './Login'
import Register from './Register'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Route exact path="/sessions/new" component={Login} />
      <Route exact path="/users/register" component={Register} />
      <Route exact path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
