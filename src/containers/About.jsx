import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/About.css';
import { Link } from 'react-router-dom';

class About extends Component {
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
            case 'ArrowRight':
                this.props.history.push('/experience');
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
            <div className="about-container">
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
                            <text>नमस्ते</text>
                        </div>
                    </div>
                </div>
                <div className="row" id="abouttitle">
                    <div className="col-xs-12 col-md-offset-7 col-md-4 text-center" id="intro">
                        <text id="about-hi">Hi, I'm Naresh</text>
                    </div>
                </div>
                <div className="row mobile-invisible text-center" id="aboutdescdesk">
                    <div className="col-xs-12 col-md-offset-7 col-md-4 text-center" id="intro">
                        <p>I am a developer, writer and designer, aiming to bring the best of these 3 worlds together through Computer Science. I enjoy programming and listening to music.</p>
                    </div>
                </div>
                <div className="row mobile-invisible text-center" id="aboutimg">
                    <div className="col-xs-12 col-md-offset-7 col-md-4 text-center" id="profileimg">
                        <img className="about-image img-thumbnail" src={require('../images/about.JPG')} alt="Me!" />
                    </div>
                </div>
                <div className="stick-bottom">
                    <div className="row desktop-invisible" id="aboutdescmob">
                        <div className="col-xs-12 col-md-offset-6 col-md-6 text-center" id="intro">
                            <p>I am a developer, writer and designer, aiming to bring the best of these 3 worlds together through Computer Science. I enjoy programming and listening to music.</p>
                        </div>
                    </div>
                    <div className="row" id="iconlinks">
                        <div className="col-xs-12 col-md-offset-7 col-md-4 text-center">
                            <a href='https://github.com/ghostwriternr/' target="_blank" rel="noopener noreferrer"><i id="githubicon" className="fa fa-github link-icons"></i></a>
                            <a href='https://www.linkedin.com/in/naresh-ramesh/' target="_blank" rel="noopener noreferrer"><i id="linkedinicon" className="fa fa-linkedin link-icons"></i></a>
                            <a href='https://www.facebook.com/naresh.ramesh' target="_blank" rel="noopener noreferrer"><i id="facebookicon" className="fa fa-facebook-square link-icons"></i></a>
                            <a href='http://blog.ghostwriternr.me/' target="_blank" rel="noopener noreferrer"><i id="blogicon" className="fa fa-pencil link-icons"></i></a>
                            <a href='https://www.instagram.com/noresh.romesh/' target="_blank" rel="noopener noreferrer"><i id="instaicon" className="fa fa-instagram link-icons"></i></a>
                            <a href='mailto:ghostwriternr@gmail.com' target="_blank" rel="noopener noreferrer"><i id="mailicon" className="fa fa-envelope link-icons"></i></a>
                        </div>
                    </div>
                </div>
                <nav className="nav-fillpath mobile-invisible">
                    <Link className="next" to="/experience">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-right-1" d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z" /></svg></span>
                        <h3><strong>Experience</strong></h3>
                    </Link>
                </nav>
            </div>
        );
    }
}

export default About;
