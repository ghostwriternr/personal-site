import React, { Component } from "react";
import "../styles/App.css";
import "../styles/Projects.css";
import "../styles/Arrows.css";
import { Link } from "react-router-dom";
// import LazyLoad from "react-lazyload";

const projects = [
  {
    title: "Automated Entity Comparison for Wikipedia text corpora",
    gist:
      "A novel comparative text mining task using relational tuples to model and measure semantic commonality for two given documents and tabulating them.",
    category: "Natural Language Processing",
    categorykey: "nlp"
  },
  {
    title: "DigiCon",
    gist:
      "A fully automated parser that can digitize scanned photos of digital prescriptions through OCR and extract useful metadata like prescriptions and doctor's information.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "Lyrics generator using neural networks",
    gist:
      "Lyrics generator that generates a new song in an artists' style using Long Short Term Memory (LSTM) Neural Networks.",
    category: "Machine Learning",
    categorykey: "ml"
  },
  {
    title: "Data Extractor for 2D plots",
    gist:
      "Graph extractor that detects multi-variable graphs in any given PDF and tabulates them autonomously taking into consideration features like axis values, scales and legends.",
    category: "Image Processing",
    categorykey: "ip"
  },
  {
    title: "Selene",
    gist:
      "Social music-recommendation Android app based on YouTube that analyzes usage data from friends and nearby users and recommends the most popular tracks.",
    category: "Android",
    categorykey: "android"
  },
  {
    title: "Retrieving salient sentences from Reddit AMAs",
    gist:
      "A summariser that provides summaries from /r/iAMA clustered by topics, using k-mean clustering and Lexrank.",
    category: "Natural Language Processing",
    categorykey: "nlp"
  },
  {
    title: "StoI (SMS to Internet)",
    gist:
      "Android application for basic internet access like Google Maps navigation, Duckduckgo quick search, Zomato reviews, etc. without a data connection. Communication with the server was done using Twilio’s SMS APIs.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "Lowpolify (Low-poly art generator)",
    gist:
      "An algorithm that generates a low-poly art version of a given image that is based on Delaunay Triangulation of points, with special optimizations made perfectly modelling human portraits.",
    category: "Image Processing",
    categorykey: "ip"
  },
  {
    title: "MetaKGP Dashboard",
    gist:
      "NUS-Mods style dashboard built with a NodeJS backend with several useful utilities for the student community including smart timetable, newsaggregator, question paper portal and professor finder to name a few.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "EthPhoto",
    gist:
      "A one of it's kind decentralized photo sharing application built using the Ethereum platform. Unique features include fast searching by tag/location and distributed file storage for fail-safe image access in the blockchain network.",
    category: "Blockchains",
    categorykey: "blockchain"
  },
  {
    title: "Hermes",
    gist:
      "IITKGP has a lot of internal and public noticeboards that most students are not aware of, but will definitely benefit from. Hermes solves this by monitoring the noticeboards and sending updates to students by email.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "Studious",
    gist:
      "Course management system that supported authentication & authorization, User Access Control for 4 different types of users, real-time messaging with notifications (using socket.io), calendar support, etc.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title:
      "Data extraction from biomedical literature for automating systematic reviews",
    gist:
      "Feature detection of a particular class of text (specifically, inclusion and exclusion criteria for patients) from a huge collection of biomedical literature using NLP Techniques with high precision and recall.",
    category: "Natural Language Processing",
    categorykey: "nlp"
  },
  {
    title: "YouTube Music Metadata",
    gist:
      "Python package to extract music metadata for any given YouTube link by removing all fluff from video titles and passing them through music APIs.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "Classy Collab",
    gist:
      "Windows Universal app that enables students to take notes simultaneously in class and combines them to create a master copy with highlights, summaries and links for further reading.",
    category: "Natural Language Processing",
    categorykey: "nlp"
  },
  {
    title: "Medical Lab Automation System (MLAS)",
    gist:
      "Java Swing application for a MLAS that handles and automates the requests of the management and patients, including inventory management and authentication control.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "Campus Connexions",
    gist:
      "Intra-college social networking app with real time feed from registered users that would serve as a platform for official and unofficial announcements within the college.",
    category: "Software Engineering",
    categorykey: "se"
  },
  {
    title: "Object Follower Robot",
    gist:
      "Wrote image detection algorithms for an object follower robot that uses an overhead camera for generating the directives to pass on the controller as movement instructions.",
    category: "Image Processing",
    categorykey: "ip"
  }
];

class Projects extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    switch (e.key) {
      case "1":
        this.props.history.push("/about");
        break;
      case "2":
        this.props.history.push("/experience");
        break;
      case "3":
        this.props.history.push("/projects");
        break;
      case "4":
        this.props.history.push("/resume");
        break;
      case "ArrowLeft":
        this.props.history.push("/experience");
        break;
      case "ArrowRight":
        this.props.history.push("/resume");
        break;
      case "Escape":
        this.props.history.push("/");
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
      <div className="projects-container">
        <div className="header-container">
          <div className="row tablet-landscape-invisible desktop-invisible">
            <div className="col-xs-12">
              <Link to="/"><i className="back-arrow fa fa-angle-up" /></Link>
            </div>
          </div>
          <div className="row">
            <div className="mobile-invisible tablet-invisible">
              <div className="col-xs-12">
                <Link to="/">
                  <i className="back-arrow back-arrow-desktop fa fa-angle-up" />
                </Link>
              </div>
            </div>
            <div className="col-xs-12 col-md-2 text-center" id="header-text">
              <text>काम</text>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-10">
            <div className="row project-boxes">
              {projects.map(function(project, index) {
                return (
                  <div
                    key={index}
                    className="col-xs-12 col-sm-6 col-md-4 box-container"
                  >
                    {/* <LazyLoad height={200} once> */}
                    <div className="project-box">
                      <div className="project-type" />
                      <div className="project-contents">
                        <h2 className="project-title">{project.title}</h2>
                        <h5
                          className={
                            "project-category project-" + project.categorykey
                          }
                        >
                          {project.category}
                        </h5>
                        <p classname="project-gist">{project.gist}</p>
                      </div>
                    </div>
                    {/* </LazyLoad> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <nav className="nav-fillpath mobile-invisible tablet-invisible">
          <Link className="prev" to="/experience">
            <span className="icon-wrap">
              <svg className="icon" width="24" height="24" viewBox="0 0 16 16">
                <path
                  id="arrow-left-1"
                  d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z"
                />
              </svg>
            </span>
            <h3><strong>Experience</strong></h3>
          </Link>
          <Link className="next" to="/resume">
            <span className="icon-wrap">
              <svg className="icon" width="24" height="24" viewBox="0 0 16 16">
                <path
                  id="arrow-right-1"
                  d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z"
                />
              </svg>
            </span>
            <h3><strong>Resume</strong></h3>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Projects;
