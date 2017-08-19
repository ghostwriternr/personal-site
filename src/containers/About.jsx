import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/About.css';
import { Link } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <div className="row">
                    <div className="col-xs-12">
                        <Link to="/"><i className="back-arrow icon ion-ios-arrow-up"></i></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
