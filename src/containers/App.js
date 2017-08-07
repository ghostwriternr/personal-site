import React, { Component } from 'react';
// import logo from './logo.svg';
import Name from '../components/Name';
import Experience from './Experience';
import Navigation from '../components/Navigation';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <Name /> */}
        <Route exact path="/" component={Name}/> 
        <Route path="/experience" component={Experience}/>
        <Navigation /> 
        {/* <Experience /> */}
      </div>
    );
  }
}

export default App;
