import React, { Component } from 'react';
// import logo from './logo.svg';
import Name from '../components/Name';
import Experience from './Experience';
import Navigation from '../components/Navigation';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header Aligner">
          <Name />
        </div>
        <Navigation />
        <Experience />
      </div>
    );
  }
}

export default App;
