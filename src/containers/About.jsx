import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/About.css';
import { Link } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <div className="namaste-container">
                    <div className="row desktop-invisible">
                        <div className="col-xs-12">
                            <Link to="/"><i className="back-arrow icon ion-ios-arrow-up"></i></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mobile-invisible">
                            <div className="col-xs-12">
                                <Link to="/"><i className="back-arrow back-arrow-desktop icon ion-ios-arrow-up"></i></Link>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-2 text-center" id="namaste">
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
                        <text>I am a developer, writer and designer, aiming to bring the best of these 3 worlds together through Computer Science. I enjoy programming and listening to music.</text>
                    </div>
                </div>
                <div className="row mobile-invisible text-center" id="aboutimg">
                    <div className="col-xs-12 col-md-offset-7 col-md-4 text-center" id="profileimg">
                        <img className="about-image img-thumbnail" src={require('../images/about-bw.jpeg')} alt="Me!" />
                    </div>
                </div>
                <div className="stick-bottom">
                <div className="row desktop-invisible" id="aboutdescmob">
                    <div className="col-xs-12 col-md-offset-6 col-md-6 text-center" id="intro">
                        <text>I am a developer, writer and designer, aiming to bring the best of these 3 worlds together through Computer Science. I enjoy programming and listening to music.</text>
                    </div>
                </div>
                <div className="row" id="iconlinks">
                    <div className="col-xs-12 col-md-offset-7 col-md-4 text-center">
                        <a href='https://github.com/ghostwriternr/' target="_blank" rel="noopener noreferrer"><i id="githubicon" className="icon ion-social-github link-icons"></i></a>
                        <a href='https://www.linkedin.com/in/naresh-r-464a8b8b' target="_blank" rel="noopener noreferrer"><i id="linkedinicon" className="icon ion-social-linkedin link-icons"></i></a>
                        <a href='https://www.facebook.com/naresh.ramesh' target="_blank" rel="noopener noreferrer"><i id="facebookicon" className="icon ion-social-facebook link-icons"></i></a>
                        <a href='http://blog.ghostwriternr.me/' target="_blank" rel="noopener noreferrer"><i id="blogicon" className="icon ion-edit link-icons"></i></a>
                        <a href='https://www.instagram.com/naresh_r/' target="_blank" rel="noopener noreferrer"><i id="instaicon" className="icon ion-social-instagram-outline link-icons"></i></a>
                        <a href='mailto:nareshmdu@gmail.com' target="_blank" rel="noopener noreferrer"><i id="mailicon" className="icon ion-ios-email link-icons"></i></a>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default About;
