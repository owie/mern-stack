import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Registration from './components/Registration';
import Inventory from './components/Inventory';

import { loadUser } from './actions/auth';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Navigation />
        <Registration />
        <Login />
        <Inventory />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUser())
});


export default connect(null, mapDispatchToProps)(App);

