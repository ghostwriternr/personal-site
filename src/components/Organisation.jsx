import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Organisation.css';
import '../styles/Masonry.css';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const experienceInfo = {
    orgs: {
        "intuit": {
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
        "ezdi": {
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
                require('../images/organisations/ezdi/desk.jpg'),
                require('../images/organisations/ezdi/diu.png')
            ]
        },
        "auv": {
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
        "metakgp": {
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
        "iitkgp": {
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
        "tls": {
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
    }
}

const PlaceholderComponent = () => (<div className="placeholder-element"></div>);

class Organisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrganisation: this.props.match.params.orgId
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        switch (e.key) {
            case 'Escape':
                this.props.history.push('/experience');
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
            <div className="modal-content">
                <LazyLoad resize once height={500}>
                    <div className="modal-header-container">
                        <img src={experienceInfo.orgs[this.state.selectedOrganisation].headerImage} className="modal-header-image" alt="Header"/>
                        <div className="modal-header-title mobile-invisible tablet-invisible">
                            <h1 className={'header-title ' + experienceInfo.orgs[this.state.selectedOrganisation].key + '-color'}>{experienceInfo.orgs[this.state.selectedOrganisation].name}</h1>
                            <h2 className="header-subtitle">{experienceInfo.orgs[this.state.selectedOrganisation].role}</h2>
                        </div>
                    </div>
                </LazyLoad>
                <div className="modal-text">
                    <div className="modal-mobile-header-title tablet-landscape-invisible desktop-invisible">
                        <h1 className={'header-title ' + experienceInfo.orgs[this.state.selectedOrganisation].key + '-color'}>{experienceInfo.orgs[this.state.selectedOrganisation].name}</h1>
                        <h2 className="header-subtitle">{experienceInfo.orgs[this.state.selectedOrganisation].role}</h2>
                    </div>
                    <Link to="/experience" className="modal-close">
                        <i className="fa fa-close"></i>
                    </Link>
                    <div className={'row ' + experienceInfo.orgs[this.state.selectedOrganisation].key + '-text'}>
                        <div className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">
                            {
                                experienceInfo.orgs[this.state.selectedOrganisation].description.map(function(paragraph, index){
                                    return <p key={index}>{paragraph}</p>
                                })
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-offset-1 col-md-10">
                            <div className="masonry gutterless">
                                {
                                    experienceInfo.orgs[this.state.selectedOrganisation].images.map(function(image, index){
                                        return(
                                            <LazyLoad key={index} resize once height={300} placeholder={<PlaceholderComponent />}>
                                                <div className="brick">
                                                    <img src={image} alt="grid" className="orgImage"/>
                                                </div>
                                            </LazyLoad>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Organisation;