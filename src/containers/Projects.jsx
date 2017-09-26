import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Projects.css';
import '../styles/Arrows.css';
import { Link } from 'react-router-dom';

class Projects extends Component {
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
            case 'ArrowLeft':
                this.props.history.push('/experience');
                break;
            case 'ArrowRight':
                this.props.history.push('/resume');
                break;
            case 'Escape':
                this.props.history.push('/');
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
            <div className="projects-container">
                <div className="header-container">
                    <div className="row desktop-invisible">
                        <div className="col-xs-12">
                            <Link to="/"><i className="back-arrow fa fa-chevron-up"></i></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mobile-invisible">
                            <div className="col-xs-12">
                                <Link to="/"><i className="back-arrow back-arrow-desktop fa fa-chevron-up"></i></Link>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-2 text-center" id="header-text">
                            <text>काम</text>
                        </div>
                    </div>
                </div>
                <nav className="nav-fillpath mobile-invisible">
                    <Link className="prev" to="/experience">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-left-1" d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z" /></svg></span>
                        <h3><strong>Experience</strong></h3>
                    </Link>
                    <Link className="next" to="/resume">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-right-1" d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z" /></svg></span>
                        <h3><strong>Resume</strong></h3>
                    </Link>
                </nav>
            </div>
        );
    }
}

export default Projects;
