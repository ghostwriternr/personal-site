import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Name.css';
import '../styles/Navigation.css';
import Particles from 'react-particles-js';
import anime from 'animejs';
import { Link } from 'react-router-dom';

class Name extends Component {
    constructor(props) {
      super(props);
      this.mobileAndTabletcheck = this.mobileAndTabletcheck.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      if (this.mobileAndTabletcheck() === true) {
        this.state = {
          params: {
                particles: {
                  number: {
                    value: 30,
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
      } else {
          this.state = {
            params: {
                  particles: {
                    number: {
                      value: 100,
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
    }

    mobileAndTabletcheck() {
      var check = false;
      // eslint-disable-next-line
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    handleKeyPress(e) {
        switch (e.key) {
            case '1':
                this.props.history.push('/about');
                break;
            case '2':
                this.props.history.push('/experience');
                break;
            case '3':
                this.props.history.push('/projects');
                break;
            case '4':
                this.props.history.push('/resume');
                break;                      
            default:
                break;
        }
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);

      var c = document.getElementById("c");
      var ctx = c.getContext("2d");
      var cH;
      var cW;
      var bgColor = "#e5632b";
      var animations = [];
      var circles = [];
      console.log(circles);

      var vis = (function () {
        var stateKey, eventKey, keys = {
          hidden: "visibilitychange",
          webkitHidden: "webkitvisibilitychange",
          mozHidden: "mozvisibilitychange",
          msHidden: "msvisibilitychange"
        };
        for (stateKey in keys) {
          if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
          }
        }
        return function (c) {
          if (c) document.addEventListener(eventKey, c);
          return !document[stateKey];
        }
      })();

      vis(function () {
        if (vis()) {
          clearAllTimeouts();
          setInterval(function () {
            fauxClick(cW / 2, cH / 2);
          }, 6000);
        } else {
          clearAllTimeouts();
        }
      });

      var colorPicker = (function() {
        var colors = ["#e5632b", "#873260", "#883e9b", "#b65063"];
        var index = 0;
        function next() {
          index = index++ < colors.length-1 ? index : 0;
          return colors[index];
        }
        function current() {
          return colors[index]
        }
        return {
          next: next,
          current: current
        }
      })();

      function removeAnimation(animation) {
        var index = animations.indexOf(animation);
        if (index > -1) animations.splice(index, 1);
      }

      function calcPageFillRadius(x, y) {
        var l = Math.max(x - 0, cW - x);
        var h = Math.max(y - 0, cH - y);
        return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
      }

      function addClickListeners() {
        document.addEventListener("touchstart", handleEvent);
        document.addEventListener("mousedown", handleEvent);
      };

      function handleEvent(e) {
          clearAllTimeouts();
          setInterval(function(){
            fauxClick(cW/2, cH/2);
          }, 6000);
          if (e.touches) { 
            e.preventDefault();
            e = e.touches[0];
          }
          var currentColor = colorPicker.current();
          var nextColor = colorPicker.next();
          var targetR = calcPageFillRadius(e.pageX, e.pageY);
          var rippleSize = Math.min(200, (cW * .4));
          var minCoverDuration = 750;
          
          var pageFill = new Circle({
            x: e.pageX,
            y: e.pageY,
            r: 0,
            fill: nextColor
          });
          var fillAnimation = anime({
            targets: pageFill,
            r: targetR,
            duration:  Math.max(targetR / 2 , minCoverDuration ),
            easing: "easeOutQuart",
            complete: function(){
              bgColor = pageFill.fill;
              removeAnimation(fillAnimation);
            }
          });
          
          var ripple = new Circle({
            x: e.pageX,
            y: e.pageY,
            r: 0,
            fill: currentColor,
            stroke: {
              width: 3,
              color: currentColor
            },
            opacity: 1
          });
          var rippleAnimation = anime({
            targets: ripple,
            r: rippleSize,
            opacity: 0,
            easing: "easeOutExpo",
            duration: 900,
            complete: removeAnimation
          });
          
          var particles = [];
          for (var i=0; i<32; i++) {
            var particle = new Circle({
              x: e.pageX,
              y: e.pageY,
              fill: currentColor,
              r: anime.random(24, 48)
            })
            particles.push(particle);
          }
          var particlesAnimation = anime({
            targets: particles,
            x: function(particle){
              return particle.x + anime.random(rippleSize, -rippleSize);
            },
            y: function(particle){
              return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
            },
            r: 0,
            easing: "easeOutExpo",
            duration: anime.random(1000,1300),
            complete: removeAnimation
          });
          animations.push(fillAnimation, rippleAnimation, particlesAnimation);
      }

      function extend(a, b){
        for(var key in b) {
          if(b.hasOwnProperty(key)) {
            a[key] = b[key];
          }
        }
        return a;
      }

      var Circle = function(opts) {
        extend(this, opts);
      }

      Circle.prototype.draw = function() {
        ctx.globalAlpha = this.opacity || 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        if (this.stroke) {
          ctx.strokeStyle = this.stroke.color;
          ctx.lineWidth = this.stroke.width;
          ctx.stroke();
        }
        if (this.fill) {
          var newGradient = ctx.createLinearGradient(0, 0, cW, cH);
          newGradient.addColorStop(0, this.fill);
          newGradient.addColorStop(1, "#e52b50");
          ctx.fillStyle = newGradient;
          ctx.fill();
        }
        ctx.closePath();
        ctx.globalAlpha = 1;
      }

      var animate = anime({
        duration: Infinity,
        update: function() {
          var newGradient = ctx.createLinearGradient(0, 0, cW, cH);
          newGradient.addColorStop(0, bgColor);
          newGradient.addColorStop(1, "#e52b50");
          ctx.fillStyle = newGradient;
          ctx.fillRect(0, 0, cW, cH);
          animations.forEach(function(anim) {
            anim.animatables.forEach(function(animatable) {
              animatable.target.draw();
            });
          });
        }
      });

      console.log(animate);

      var resizeCanvas = function() {
        cW = window.innerWidth;
        cH = window.innerHeight;
        c.width = cW * devicePixelRatio;
        c.height = cH * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      };

      if (this.mobileAndTabletcheck() === false) {
        (function init() {
          resizeCanvas();
          if (window.CP) {
            // CodePen's loop detection was causin' problems
            // and I have no idea why, so...
            window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
          }
          window.addEventListener("resize", resizeCanvas);
          addClickListeners();
          if (!!window.location.pathname.match(/fullcpgrid/)) {
            startFauxClicking();
          }
          handleInactiveUser();
        })();
      } else {
        (function init() {
          resizeCanvas();
        })();        
      }

      function clearAllTimeouts() {
        for(var index=0; index<=1000; ++index) {
          clearTimeout(index);
        }
      }

      function handleInactiveUser() {
        clearAllTimeouts();
        setInterval(function(){
          fauxClick(cW/2, cH/2);
        }, 6000);
        
        function clearInactiveTimeout() {
          // clearTimeout(inactive);
          document.removeEventListener("mousedown", clearInactiveTimeout);
          document.removeEventListener("touchstart", clearInactiveTimeout);
        }
        
        document.addEventListener("mousedown", clearInactiveTimeout);
        document.addEventListener("touchstart", clearInactiveTimeout);
      }

      function startFauxClicking() {
        setTimeout(function(){
          fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
          startFauxClicking();
        }, anime.random(200, 900));
      }

      function fauxClick(x, y) {
        var fauxClick = new Event("mousedown");
        fauxClick.pageX = x;
        fauxClick.pageY = y;
        document.dispatchEvent(fauxClick);
      }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
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
                  <div className="row navbuttons cl-effect-5">
                    <div className="col-xs-12 col-md-3">
                      <Link to="/about"><span data-hover="About Me">About Me</span></Link>
                    </div>
                    <div className="col-xs-12 col-md-3">
                      <Link to="/experience"><span data-hover="Experience">Experience</span></Link>
                    </div>
                    <div className="col-xs-12 col-md-3">
                      <Link to="/projects"><span data-hover="Projects">Projects</span></Link>
                    </div>
                    <div className="col-xs-12 col-md-3">
                    <Link to="/resume"><span data-hover="Resume">Resume</span></Link>
                    </div>
				          </div>
              </div>
            </div>
        );
    }
}

export default Name;
