import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Experience.css';
import '../styles/Arrows.css';
import Organisation from '../components/Organisation'
import { Link } from 'react-router-dom';

class Experience extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOrganisation: 0,
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    setSelectedOrganisation(id) {
        this.setState({selectedOrganisation: id});
    }

    openModal(index) {
        this.setState({selectedOrganisation: index, modalIsOpen: true});
    }

    afterOpenModal() {
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div className="experience-container">
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
                            <text>अनुभव</text>
                        </div>
                    </div>
                </div>
                <div className="experience-desc row">
                    <div className="col-xs-offset-1 col-xs-10 desktop-invisible">
                        <p>I have done 2 internships during my undergraduate studies, and personally consider myself a software developer blah blah blah no Machine Learning basically. Duh. I have also worked on several organisations duh duh duh. Blah Blah Blah placeholder text. yolo. lots of love.</p>
                    </div>
                </div>
                <div className="experience-desc row">
                    <div className="col-md-offset-2 col-md-8 mobile-invisible">
                        <p>I have done 2 internships during my undergraduate studies, and personally consider myself a software developer blah blah blah no Machine Learning basically. Duh. I have also worked on several organisations duh duh duh. Blah Blah Blah placeholder text. yolo. lots of love.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-offset-2 col-md-8">
                        <div className="row exp-grid">
                            <div className="col-xs-12 col-md-4 box">
                                <div id="intuit-box" className="box-bg" onClick={() => this.openModal(0)}>
                                    <img className="org-logo" src={require('../images/logos/intuit.png')} alt="Intuit"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="ezdi-box" className="box-bg" onClick={() => this.openModal(1)}>
                                    <img className="org-logo" src={require('../images/logos/ezdi.png')} alt="EzDI"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="auv-box" className="box-bg" onClick={() => this.openModal(2)}>
                                    <img className="org-logo" src={require('../images/logos/auv.png')} alt="AUV, IIT Kharagpur"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="metakgp-box" className="box-bg" onClick={() => this.openModal(3)}>
                                    <img className="org-logo" src={require('../images/logos/metakgp.jpg')} alt="MetaKGP"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="iitkgp-box" className="box-bg" onClick={() => this.openModal(4)}>
                                    <img className="org-logo" src={require('../images/logos/iitkgp.png')} alt="IITKGP"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 box">
                                <div id="tls-box" className="box-bg" onClick={() => this.openModal(5)}>
                                    <img className="org-logo" src={require('../images/logos/tls.jpg')} alt="TLS"/>
                                    <img className="link-logo" src={require('../images/link.svg')} alt="link"/>
                                </div>
                            </div>                                                                                
                        </div>
                    </div>
                </div>
				<nav className="nav-fillpath mobile-invisible">
                    <Link className="prev" to="/about">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-left-1" d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z" /></svg></span>
                        <h3><strong>About</strong></h3>
                    </Link>
                    <Link className="next" to="/about">
                        <span className="icon-wrap"><svg className="icon" width="24" height="24" viewBox="0 0 16 16"><path id="arrow-right-1" d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z" /></svg></span>
                        <h3><strong>Projects</strong></h3>
                    </Link>
                </nav>
                <Organisation
                    selectedOrganisation={this.state.selectedOrganisation}
                    modalIsOpen={this.state.modalIsOpen}
                    openModal={this.openModal}
                    afterOpenModal={this.afterOpenModal}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default Experience;
