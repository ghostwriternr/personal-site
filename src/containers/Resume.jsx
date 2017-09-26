import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Resume.css';
import '../styles/Arrows.css';
import { Link } from 'react-router-dom';

class Resume extends Component {
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
                this.props.history.push('/projects');
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
                <div className="resume-desc row">
                    <div className="col-xs-offset-1 col-xs-10 desktop-invisible">
                        <p>The PDF version of my resume can be downloaded <a href="https://github.com/ghostwriternr/resume/raw/master/O/Resume.pdf">from here</a></p>
                    </div>
                </div>
                <div className="resume-desc row">
                    <div className="col-md-offset-2 col-md-8 mobile-invisible">
                        <p>The PDF version of my resume can be downloaded <a href="https://github.com/ghostwriternr/resume/raw/master/O/Resume.pdf">from here</a></p>
                    </div>
                </div>
                <div className="resume-img">
                    <img src={require('../images/resume.png')} alt="Resume" />
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
