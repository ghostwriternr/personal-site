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
                <div className="row visible-md visible-lg" id="aboutdescdesk">
                    <div className="col-xs-12 col-md-offset-7 col-md-4 text-center" id="intro">
                        <text>I am a developer, writer and designer, aiming to bring the best of these 3 worlds together through Computer Science. I enjoy programming and listening to music.</text>
                    </div>
                </div>
                <div className="row visible-xs visible-sm" id="aboutdescmob">
                    <div className="col-xs-12 col-md-offset-6 col-md-6 text-center" id="intro">
                        <text>I am a developer, writer and designer, aiming to bring the best of these 3 worlds together through Computer Science. I enjoy programming and listening to music.</text>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
