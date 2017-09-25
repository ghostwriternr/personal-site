import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Resume.css';
import '../styles/Arrows.css';
import { Link } from 'react-router-dom';

class Resume extends Component {
    render() {
        return (
            <div className="resume-container">
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
                            <text>संविभाग</text>
                        </div>
                    </div>
                </div>
                <nav className="nav-fillpath mobile-invisible">
                    <Link className="prev" to="/projects">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-left-1" d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z" /></svg></span>
                        <h3><strong>Projects</strong></h3>
                    </Link>
                </nav>
            </div>
        );
    }
}

export default Resume;
