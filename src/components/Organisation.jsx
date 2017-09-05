import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Organisation.css';
import '../styles/PhotoGrid.css';
import Modal from 'react-modal';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '2vw',
        left                       : '2vw',
        right                      : '2vw',
        bottom                     : '2vw',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '0px'
    
    }
};

class Organisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: this.props.modalIsOpen
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modalIsOpen: nextProps.modalIsOpen})
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.props.afterOpenModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Experience modal"
            >
                <div className="modal-content">
                    {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                    <div className="modal-header-container">
                        <img src={require('../images/organisations/intuit/one-crop.jpg')} className="modal-header-image" alt="Header"/>
                        <div className="modal-header-title mobile-invisible">
                            <h1 className="header-title">Intuit IDC</h1>
                            <h2 className="header-subtitle">Software Engineer Intern</h2>
                        </div>
                    </div>
                    <div className="modal-text">
                        <i className="modal-close fa fa-close" onClick={this.props.closeModal}></i>
                        {/* <div>{this.props.selectedOrganisation}</div> */}
                        <div className="row">
                            <div className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">
                                <p>After my summer at Intuit IDC this summer, blah blah blah.</p>
                                <p>After my summer at Intuit IDC this summer, blah blah blah.</p>
                                <p>After my summer at Intuit IDC this summer, blah blah blah.</p>
                                <p>After my summer at Intuit IDC this summer, blah blah blah.</p>
                                <p>After my summer at Intuit IDC this summer, blah blah blah.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-offset-1 col-md-10">
                                <section id="photos">
                                    <img src={require('../images/organisations/intuit/bull.jpg')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/code.jpg')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/glasses.jpg')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/hackathon.JPG')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/last.JPG')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/office.JPG')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/seminar.jpg')} alt="yolo"/>
                                    <img src={require('../images/organisations/intuit/social.jpg')} alt="yolo"/>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default Organisation;