import React, { Component } from 'react';
// import logo from './logo.svg';
import Name from '../components/Name';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Resume from './Resume';
import '../styles/App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Name}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/experience" component={Experience}/>
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/resume" component={Resume}/>
      </div>
    );
  }
}

export default App;
