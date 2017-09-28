import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Name.css';
import '../styles/Navigation.css';
import { Link } from 'react-router-dom';

class Name extends Component {
    constructor(props) {
      super(props);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        switch (e.key) {
            case '1':
                this.props.history.push('/about');
                break;
            case '2':
                this.props.history.push('/experience');
                break;
            case '3':
                this.props.history.push('/projects');
                break;
            case '4':
                this.props.history.push('/resume');
                break;                      
            default:
                break;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    render() {
        return (
            <div className="App-header Aligner">
              <div>
                  <p className="subtitle">Hi, I am</p>
                  <a className="link link--name">Naresh R<span data-letters="Naresh R"></span><span data-letters="Naresh R"></span></a>
                  <p className="subtitle">I study Computer Science at IIT Kharagpur</p>
                  <div className="row navbuttons cl-effect-5">
                    <div className="col-xs-12 col-md-3">
                      <Link to="/about"><span data-hover="About Me">About Me</span></Link>
                    </div>
                    <div className="col-xs-12 col-md-3">
                      <Link to="/experience"><span data-hover="Experience">Experience</span></Link>
                    </div>
                    <div className="col-xs-12 col-md-3">
                      <Link to="/projects"><span data-hover="Projects">Projects</span></Link>
                    </div>
                    <div className="col-xs-12 col-md-3">
                      <Link to="/resume"><span data-hover="Resume">Resume</span></Link>
                    </div>
				          </div>
              </div>
            </div>
        );
    }
}

export default Name;
