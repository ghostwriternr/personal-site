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
        top                        : '0',
        left                       : '0',
        right                      : '0',
        bottom                     : '0',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '0px'
    
    }
};

const experienceInfo = {
    orgs: [
        {
            "key": "intuit",
            "name": "Intuit IDC",
            "role": "Software Engineer Intern",
            "headerImage": require('../images/organisations/intuit/one-crop.jpg'),
            "description": [
                "After my summer at Intuit IDC this summer, blah blah blah.1",
                "After my summer at Intuit IDC this summer, blah blah blah.2",
                "After my summer at Intuit IDC this summer, blah blah blah.3"
            ],
            "images": [
                require('../images/organisations/intuit/bull.jpg'),
                require('../images/organisations/intuit/code.jpg'),
                require('../images/organisations/intuit/glasses.jpg'),
                require('../images/organisations/intuit/hackathon.JPG'),
                require('../images/organisations/intuit/last.JPG'),
                require('../images/organisations/intuit/office.JPG'),
                require('../images/organisations/intuit/seminar.jpg'),
                require('../images/organisations/intuit/social.jpg')
            ]
        },
        {
            "key": "ezdi",
            "name": "ezDI, India",
            "role": "Software Engineer Intern",
            "headerImage": require('../images/organisations/ezdi/jump.png'),
            "description": [
                "After my summer at ezDI this summer, blah blah blah.1",
                "After my summer at ezDI this summer, blah blah blah.2",
                "After my summer at ezDI this summer, blah blah blah.3"
            ],
            "images": [
                require('../images/organisations/ezdi/office.jpg'),
                require('../images/organisations/ezdi/bombay.jpg'),
                require('../images/organisations/ezdi/desk.jpg'),
                require('../images/organisations/ezdi/diu.png'),
                require('../images/organisations/ezdi/treat.jpg')
            ]
        },
        {
            "key": "auv",
            "name": "AUV, IIT Kharagpur",
            "role": "Image Processing Developer",
            "headerImage": require('../images/organisations/auv/team.jpg'),
            "description": [
                "After my summer at AUV this summer, blah blah blah.1",
                "After my summer at AUV this summer, blah blah blah.2",
                "After my summer at AUV this summer, blah blah blah.3"
            ],
            "images": [
                require('../images/organisations/auv/bot3.jpg'),
                require('../images/organisations/auv/bot2.jpg'),
                require('../images/organisations/auv/demo.jpg'),
                require('../images/organisations/auv/pool.jpg'),
                require('../images/organisations/auv/sparton.jpg')
            ]
        },
        {
            "key": "metakgp",
            "name": "MetaKGP",
            "role": "Organisation Maintainer",
            "headerImage": require('../images/organisations/metakgp/aaron.jpg'),
            "description": [
                "After my summer at ezDI this summer, blah blah blah.1",
                "After my summer at ezDI this summer, blah blah blah.2",
                "After my summer at ezDI this summer, blah blah blah.3"
            ],
            "images": []
        },
        {
            "key": "iitkgp",
            "name": "Indian Institute of Technology, Kharagpur",
            "role": "",
            "headerImage": require('../images/organisations/iitkgp/illu.jpg'),
            "description": [
                "After my summer at ezDI this summer, blah blah blah.1",
                "After my summer at ezDI this summer, blah blah blah.2",
                "After my summer at ezDI this summer, blah blah blah.3"
            ],
            "images": [
                require('../images/organisations/iitkgp/interiit.jpg'),
                require('../images/organisations/iitkgp/prize.jpg'),
                require('../images/organisations/iitkgp/bitwise.png'),
                require('../images/organisations/iitkgp/drams.jpg'),
                require('../images/organisations/iitkgp/robotix.jpg')
            ]
        },
        {
            "key": "tls",
            "name": "Technology Literary Society, IITKGP",
            "role": "Executive editor",
            "headerImage": require('../images/organisations/tls/sf.jpg'),
            "description": [
                "After my summer at ezDI this summer, blah blah blah.1",
                "After my summer at ezDI this summer, blah blah blah.2",
                "After my summer at ezDI this summer, blah blah blah.3"
            ],
            "images": [
                require('../images/organisations/tls/sfgroup.jpg'),
                require('../images/organisations/tls/shivani.jpg'),
                require('../images/organisations/tls/host.jpg'),
                require('../images/organisations/tls/flavors.jpg'),
                require('../images/organisations/tls/kalidas.jpg'),
                require('../images/organisations/tls/govs.png'),
                require('../images/organisations/tls/tp.jpg'),
                require('../images/organisations/tls/duddu.png'),
                require('../images/organisations/tls/shibani.png')
            ]
        }
    ]
}

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
                        <img src={experienceInfo.orgs[this.props.selectedOrganisation].headerImage} className="modal-header-image" alt="Header"/>
                        <div className="modal-header-title mobile-invisible">
                            <h1 className={'header-title ' + experienceInfo.orgs[this.props.selectedOrganisation].key + '-color'}>{experienceInfo.orgs[this.props.selectedOrganisation].name}</h1>
                            <h2 className="header-subtitle">{experienceInfo.orgs[this.props.selectedOrganisation].role}</h2>
                        </div>
                    </div>
                    <div className="modal-text">
                        <div className="modal-mobile-header-title desktop-invisible">
                            <h1 className={'header-title ' + experienceInfo.orgs[this.props.selectedOrganisation].key + '-color'}>{experienceInfo.orgs[this.props.selectedOrganisation].name}</h1>
                            <h2 className="header-subtitle">{experienceInfo.orgs[this.props.selectedOrganisation].role}</h2>
                        </div>                        
                        <i className="modal-close fa fa-close" onClick={this.props.closeModal}></i>
                        <div className={'row ' + experienceInfo.orgs[this.props.selectedOrganisation].key + '-text'}>
                            <div className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">
                                {
                                    experienceInfo.orgs[this.props.selectedOrganisation].description.map(function(paragraph, index){
                                        return <p key={index}>{paragraph}</p>
                                    })
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-offset-1 col-md-10">
                                <section id="photos">
                                    {
                                        experienceInfo.orgs[this.props.selectedOrganisation].images.map(function(image, index){
                                            return <img key={index} src={image} alt="grid"/>
                                        })
                                    }
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