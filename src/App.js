import React, { Component } from 'react';
// import logo from './logo.svg';
import Name from './Name';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header Aligner">
          <Name />
        </div>
      </div>
    );
  }
}

export default App;
