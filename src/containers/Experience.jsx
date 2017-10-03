import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Experience.css';
import '../styles/Arrows.css';
import { Link } from 'react-router-dom';

class Experience extends Component {
    constructor(props){
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
                this.props.history.push('/about');
                break;
            case 'ArrowRight':
                this.props.history.push('/projects');
                break;
            case 'Escape':
                this.props.history.push('/');
                break;
            case '!':
                this.props.history.push('/experience/intuit');
                break;   
            case '@':
                this.props.history.push('/experience/ezdi');
                break;   
            case '#':
                this.props.history.push('/experience/auv');
                break;   
            case '$':
                this.props.history.push('/experience/metakgp');
                break;   
            case '%':
                this.props.history.push('/experience/tls');
                break;   
            case '^':
                this.props.history.push('/experience/iitkgp');
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
            <div className="experience-container">
                <div className="header-container">
                    <div className="row tablet-landscape-invisible desktop-invisible">
                        <div className="col-xs-12">
                            <Link to="/"><i className="back-arrow fa fa-angle-up"></i></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mobile-invisible tablet-invisible">
                            <div className="col-xs-12">
                                <Link to="/"><i className="back-arrow back-arrow-desktop fa fa-angle-up"></i></Link>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-2 text-center" id="header-text">
                            <text>अनुभव</text>
                        </div>
                    </div>
                </div>
                <div className="experience-desc row">
                    <div className="col-xs-offset-1 col-xs-10 tablet-landscape-invisible desktop-invisible">
                        <p>I have done 2 internships during my undergraduate studies and have taken up several other technical and managerial roles.</p>
                    </div>
                </div>
                <div className="experience-desc row">
                    <div className="col-md-offset-2 col-md-8 mobile-invisible tablet-invisible">
                        <p>I have done 2 internships during my undergraduate studies and have taken up several other technical and managerial roles.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-offset-2 col-md-8">
                        <div className="row exp-grid">
                            <div className="col-xs-12 col-sm-6 col-md-4 box">
                                <Link id="intuit-box" className="box-bg" to={`${this.props.match.url}/intuit`}>
                                    <img className="org-logo" src={require('../images/logos/intuit.png')} alt="Intuit"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 box">
                                <Link id="ezdi-box" className="box-bg" to={`${this.props.match.url}/ezdi`}>
                                    <img className="org-logo" src={require('../images/logos/ezdi.png')} alt="EzDI"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 box">
                                <Link id="auv-box" className="box-bg" to={`${this.props.match.url}/auv`}>
                                    <img className="org-logo" src={require('../images/logos/auv.png')} alt="AUV, IIT Kharagpur"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 box">
                                <Link id="metakgp-box" className="box-bg" to={`${this.props.match.url}/metakgp`}>
                                    <img className="org-logo" src={require('../images/logos/metakgp.jpg')} alt="MetaKGP"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 box">
                                <Link id="tls-box" className="box-bg" to={`${this.props.match.url}/tls`}>
                                    <img className="org-logo" src={require('../images/logos/tls.jpg')} alt="TLS"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 box">
                                <Link id="iitkgp-box" className="box-bg" to={`${this.props.match.url}/iitkgp`}>
                                    <img className="org-logo" src={require('../images/logos/iitkgp.png')} alt="IITKGP"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
				<nav className="nav-fillpath mobile-invisible tablet-invisible">
                    <Link className="prev" to="/about">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-left-1" d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z" /></svg></span>
                        <h3><strong>About</strong></h3>
                    </Link>
                    <Link className="next" to="/projects">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-right-1" d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z" /></svg></span>
                        <h3><strong>Projects</strong></h3>
                    </Link>
                </nav>
            </div>
        );
    }
}

export default Experience;
