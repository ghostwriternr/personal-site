import React, { Component } from "react";
import "../styles/App.css";
import { Route, withRouter } from "react-router-dom";
import AppRoutes from "../routes";
import Particles from "react-particles-js";
import Shortcuts from "../components/Shortcuts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        particles: {
          number: {
            value: 10,
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
              speed: 2,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
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
              enable: false,
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
        position: "fixed",
        left: "0",
        top: "0"
      }
    };
  }

  render() {
    return (
      <div className="App">
        <canvas id="c" className="particle-canvas" />
        <Shortcuts history={this.props.history} />
        <Particles
          params={this.state.params}
          width={this.state.width}
          height={this.state.height}
          style={this.state.style}
        />
        <Route path="/" component={AppRoutes} />
      </div>
    );
  }
}

export default withRouter(App);
