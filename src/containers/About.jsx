import React, {Component} from 'react';
import '../styles/App.css';
import '../styles/About.css';
import {Link} from 'react-router-dom';

class About extends Component {
  constructor (props) {
    super (props);
    this.handleKeyPress = this.handleKeyPress.bind (this);
  }

  handleKeyPress (e) {
    switch (e.key) {
      case '1':
        this.props.history.push ('/about');
        break;
      case '2':
        this.props.history.push ('/experience');
        break;
      case '3':
        this.props.history.push ('/projects');
        break;
      case '4':
        this.props.history.push ('/resume');
        break;
      case 'ArrowRight':
        this.props.history.push ('/experience');
        break;
      case 'Escape':
        this.props.history.push ('/');
        break;
      default:
        break;
    }
  }

  componentDidMount () {
    document.addEventListener ('keydown', this.handleKeyPress);
  }

  componentWillUnmount () {
    document.removeEventListener ('keydown', this.handleKeyPress);
  }

  render () {
    return (
      <div className="about-container">
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
              <text>नमस्ते</text>
            </div>
          </div>
        </div>
        <div className="row" id="abouttitle">
          <div
            className="col-xs-12 col-md-offset-1 col-md-4 text-center"
            id="profileimg"
          >
            <img
              className="about-image img-thumbnail"
              src={require ('../images/about.jpg')}
              alt="Me!"
            />
          </div>
          <div className="col-xs-12 col-md-6 text-center" id="intro">
            <text id="about-hi">
              <span role="img" aria-label="waving-emoji">👋</span>
              &nbsp;Hi, I am
              <span className="name-gradient">
                &nbsp;Naresh
              </span>
            </text>
            <div id="aboutdescdesk">
              <p>
                I study Computer Science at IIT Kharagpur, India. I am madly
                passionate about working on large scale systems and love
                solving challenging problems.
              </p>
              <p>
                I'm currently working with gRPC as a Google Summer of
                Code student.
              </p>
            </div>
            <div className="row" id="iconlinks">
              <div className="col-xs-12 text-center">
                <a
                  href="https://github.com/ghostwriternr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i id="githubicon" className="fa fa-github link-icons" />
                </a>
                <a
                  href="https://www.linkedin.com/in/naresh-ramesh/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i id="linkedinicon" className="fa fa-linkedin link-icons" />
                </a>
                <a
                  href="https://www.facebook.com/naresh.ramesh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    id="facebookicon"
                    className="fa fa-facebook-square link-icons"
                  />
                </a>
                <a
                  href="http://blog.ghostwriternr.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i id="blogicon" className="fa fa-pencil link-icons" />
                </a>
                <a
                  href="https://www.instagram.com/noresh.romesh/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i id="instaicon" className="fa fa-instagram link-icons" />
                </a>
                <a
                  href="mailto:ghostwriternr@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    id="mailicon"
                    className="fa fa-envelope-square link-icons"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav className="nav-fillpath mobile-invisible tablet-invisible">
          <Link className="next" to="/experience">
            <span className="icon-wrap">
              <svg className="icon" width="24" height="24" viewBox="0 0 16 16">
                <path
                  id="arrow-right-1"
                  d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z"
                />
              </svg>
            </span>
            <h3><strong>Experience</strong></h3>
          </Link>
        </nav>
      </div>
    );
  }
}

export default About;
