import React, { Component } from 'react';
import './App.css';
import './Experience.css';

class Experience extends Component {
    render() {
        return (
            <div className="experience-container">
              <span className="experience-title">Experience</span>
                <div className="organisations row">
                    <div className="col-xs-12 col-md-4">
                        <div className="org-tab">
                            <img className="org-logo" src={require('./intuit.png')} alt="Intuit IDC"/>
                            <p className="org-position">Software Engineering Intern - Intuit IDC</p>
                            <p className="org-duration">Bangalore, Current</p>
                            <br />
                            <section className="link-scaleupbounce">
                                <p className="org-description">I am currently working with QuickBooks Online (QBO)'s Billing and Subscriptions Team.</p>
                            </section>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className="org-tab org-tab-mid">
                            <img className="org-logo" src={require('./EzDI.png')} alt="EzDI"/>
                            <p className="org-position">Software Engineering Intern - ezDI India</p>
                            <p className="org-duration">Ahmedabad, May '16 - June '16</p>
                            <br />
                            <section className="link-scaleupbounce">
                                <p className="org-description">I worked with <a href="http://www.ezdi.com/" target="_blank" rel="noopener noreferrer">ezDI's</a> database team last summer to help speed-up full table queries by an order of magnitude by diverting them to AWS Redshift and automating migration & replication of data from RDS to Redshift. I had also demonstrated multiple POCs to integrate a Business Intelligence solution into the platform, and set up base models in those to take advantage of reusable SQL views.</p>
                            </section>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className="org-tab">
                            <img className="org-logo" src={require('./auv.png')} alt="AUV"/>
                            <p className="org-position">Image Processing Core Team Member - AUV IITKGP</p>
                            <p className="org-duration">Kharagpur, Feb '15 - April '16</p>
                            <br />
                            <section className="link-scaleupbounce">
                                <p className="org-description">I was one of the tech leads in Image Processing at <a href="https://auviitkgp.github.io/" target="_blank" rel="noopener noreferrer">AUV</a>, IITKGP. My most significant contribution was improving the bot’s ability to adapt to changing lighting conditions underwater with Neural Network based adaptive image segmentation. I also implemented several algorithms using OpenCV and ROS for the bot to autonomously complete the tasks specified for <a href="https://higherlogicdownload.s3.amazonaws.com/AUVSI/fb9a8da0-2ac8-42d1-a11e-d58c1e158347/UploadedImages/2016%20RoboSub/Mission%20and%20Tasks/RoboSub_2016_PreliminaryMission%2012.12.15.pdf" target="_blank" rel="noopener noreferrer">RoboSub 2016</a>.</p>
                            </section>
                        </div>
                    </div>
              </div>
              <div className="row other-experience">
                <p>As maintainer at MetaKGP and Executive Editor at Technology Litewrary Society, IITKGP, I also take on organisational roles and blah blah blah. In the past, I have also worked with Google Students Club and CodeClub, IITKGP.</p>
              </div>
            </div>
        );
    }
}

export default Experience;
