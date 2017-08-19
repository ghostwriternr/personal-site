import React, { Component } from 'react';
// import logo from './logo.svg';
import Name from '../components/Name';
import About from './About';
import Experience from './Experience';
import '../styles/App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Name}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/experience" component={Experience}/>
      </div>
    );
  }
}

export default App;
