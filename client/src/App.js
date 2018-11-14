import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/common/Dashboard'

import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decode = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decode));

  const currentTime = Date.now() / 1000;

  console.log(decode.exp);
  console.log(currentTime);

  if(decode.exp < currentTime) {
    localStorage.removeItem('jwtToken');
    store.dispatch(logoutUser);
    window.location.href = '/login';
  }
} 

class App extends Component {
  render() {
    return (
        <Provider store={ store }>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Landing} />
              <Footer />
            </div>
          </Router> 
        </Provider>
    );
  }
}

export default App;
