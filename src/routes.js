import React from "react";
import { TransitionGroup, Transition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import { TweenLite, TweenMax } from "gsap";
// import components
import Name from "./components/Name";
import About from "./containers/About";
import Experience from "./containers/Experience";
import Projects from "./containers/Projects";
import Resume from "./containers/Resume";
import Organisation from "./components/Organisation";

const completeCall = target => {
  TweenLite.set(target, { clearProps: "position, width" });
};

const AppRoutes = props =>
  <TransitionGroup>
    <Transition
      key={props.location.pathname}
      timeout={0}
      mountOnEnter={true}
      unmountOnExit={true}
      onEnter={node => {
        // first kill all tweens of the target
        TweenMax.killTweensOf(node);
        TweenLite.set(node, {
          position: "fixed",
          y: 50,
          autoAlpha: 0
        });
        TweenLite.to(node, 0.5, {
          autoAlpha: 1,
          y: 0,
          onComplete: completeCall,
          onCompleteParams: [node]
        });
      }}
    >
      <Switch location={props.location}>
        <Route exact path="/" component={Name}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/experience" component={Experience}/>
        <Route exact path="/experience/:orgId" component={Organisation}/>
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/resume" component={Resume}/>
      </Switch>
    </Transition>
  </TransitionGroup>;

export default AppRoutes;
