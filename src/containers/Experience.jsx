import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Experience.css';

class Experience extends Component {
    render() {
        return (
            <div className="experience-container">
                <div className="row">
                    <div className="col-xs-12 col-md-offset-2 col-md-8">
                        <div className="row exp-grid">
                            <div className="col-xs-12 col-md-4 box">
                                <div id="intuit-box" className="box-bg">
                                    <img className="org-logo" src={require('../images/intuit.png')} alt="Intuit"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="ezdi-box" className="box-bg">
                                    <img className="org-logo" src={require('../images/ezdi.png')} alt="EzDI"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="auv-box" className="box-bg">
                                    <img className="org-logo" src={require('../images/auv.png')} alt="AUV, IIT Kharagpur"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="metakgp-box" className="box-bg">
                                    <img className="org-logo" src={require('../images/metakgp.jpg')} alt="MetaKGP"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="iitkgp-box" className="box-bg">
                                    <img className="org-logo" src={require('../images/iitkgp.png')} alt="IITKGP"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="tls-box" className="box-bg">
                                    <img className="org-logo" src={require('../images/tls.jpg')} alt="TLS"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>                                                                                
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Experience;
