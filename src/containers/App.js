import React, { Component } from 'react';
// import logo from './logo.svg';
import Name from '../components/Name';
import Experience from './Experience';
import '../styles/App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Name}/> 
        <Route path="/experience" component={Experience}/>
      </div>
    );
  }
}

export default App;
