import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Name.css';
import Particles from 'react-particles-js';

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                  particles: {
                    number: {
                      value: 150,
                      density: {
                        enable: true,
                        value_area: 800
                      }
                    },
                    color: {
                      value: "#ffffff"
                    },
                    shape: {
                      type: "circle",
                      stroke: {
                        width: 0,
                        color: "#000000"
                      },
                      polygon: {
                        nb_sides: 5
                      },
                      image: {
                        src: "img/github.svg",
                        width: 100,
                        height: 100
                      }
                    },
                    opacity: {
                      value: 0.5,
                      random: false,
                      anim: {
                        enable: false,
                        speed: 1.6241544246026902,
                        opacity_min: 0.1,
                        sync: false
                      }
                    },
                    size: {
                      value: 3,
                      random: true,
                      anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                      }
                    },
                    line_linked: {
                      enable: false,
                      distance: 150,
                      color: "#ffffff",
                      opacity: 0.4,
                      width: 1
                    },
                    move: {
                      enable: true,
                      speed: 1.5,
                      direction: "none",
                      random: false,
                      straight: false,
                      out_mode: "out",
                      bounce: false,
                      attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                      }
                    }
                  },
                  interactivity: {
                    detect_on: "canvas",
                    events: {
                      onhover: {
                        enable: false,
                        mode: "grab"
                      },
                      onclick: {
                        enable: true,
                        mode: "push"
                      },
                      resize: true
                    },
                    modes: {
                      grab: {
                        distance: 400,
                        line_linked: {
                          opacity: 1
                        }
                      },
                      bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                      },
                      repulse: {
                        distance: 200,
                        duration: 0.4
                      },
                      push: {
                        particles_nb: 4
                      },
                      remove: {
                        particles_nb: 2
                      }
                    }
                  },
                  retina_detect: true
                },
            width: "100vw",
            height: "100vh",
            style: {
                position: "absolute",
                left: "0",
                top: "0"
            }
      };
    }
    render() {
        return (
            <div className="App-header Aligner">
              <div>
                  <Particles
                      params={this.state.params}
                      width={this.state.width}
                      height={this.state.height}
                      style={this.state.style}
                  />
                  <p className="subtitle">Hi, I am</p>
                  <a className="link link--name">Naresh R<span data-letters="Naresh R"></span><span data-letters="Naresh R"></span></a>
                  <p className="subtitle">I study Computer Science at IIT Kharagpur</p>
              </div>
            </div>
        );
    }
}

export default Name;
