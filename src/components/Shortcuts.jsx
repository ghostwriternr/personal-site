import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Shortcuts.css';
import { Link } from 'react-router-dom';

class Shortcuts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "/",
            keys: [
                {"1": "/about"},
                {"2": "/experience"},
                {"3": "/projects"},
                {"4": "/resume"}
            ]
        }
        this.updateShortcuts = this.updateShortcuts.bind(this);
        this.isRoot = this.isRoot.bind(this);
        this.props.history.listen((location, action) => {
            this.setState({location: location.pathname}, () => {
                this.updateShortcuts();
            });
        });
    }

    updateShortcuts() {
        switch (this.state.location) {
            case "/":
                this.setState({keys: [
                    {"1": "/about"},
                    {"2": "/experience"},
                    {"3": "/projects"},
                    {"4": "/resume"}
                ]});
                break;
            case "/about":
                this.setState({keys: [
                    {"Esc": "/"},
                    {"1": "/about"},
                    {"2": "/experience"},
                    {"3": "/projects"},
                    {"4": "/resume"},
                    {"->": "/experience"}
                ]});
                break;
            case "/experience":
                this.setState({keys: [
                    {"Esc": "/"},
                    {"Shift + ": "/experience"},
                    {"1": "/about"},
                    {"2": "/experience"},
                    {"3": "/projects"},
                    {"4": "/resume"},
                    {"<-": "/about"},
                    {"->": "/projects"}
                ]});
                break;
            case "/experience/intuit":
                this.setState({keys: [
                    {"Esc": "/experience"}
                ]});
                break;
            case "/experience/ezdi":
                this.setState({keys: [
                    {"Esc": "/experience"}
                ]});
                break;
            case "/experience/auv":
                this.setState({keys: [
                    {"Esc": "/experience"}
                ]});
                break;
            case "/experience/metakgp":
                this.setState({keys: [
                    {"Esc": "/experience"}
                ]});
                break;
            case "/experience/tls":
                this.setState({keys: [
                    {"Esc": "/experience"}
                ]});
                break;
            case "/experience/iitkgp":
                this.setState({keys: [
                    {"Esc": "/experience"}
                ]});
                break;                                                                        
            case "/projects":
                this.setState({keys: [
                    {"Esc": "/"},
                    {"1": "/about"},
                    {"2": "/experience"},
                    {"3": "/projects"},
                    {"4": "/resume"},
                    {"<-": "/experience"},
                    {"->": "/resume"}
                ]});
                break;
            case "/resume":
                this.setState({keys: [
                    {"Esc": "/"},
                    {"1": "/about"},
                    {"2": "/experience"},
                    {"3": "/projects"},
                    {"4": "/resume"},
                    {"<-": "/projects"}
                ]});
                break;
            default:
                this.setState({keys: [
                    {"Esc": "/"}
                ]})
                break;
        }
    }

    isRoot() {
        return this.state.location === "/"? 'shortcut-light': '';
    }

    render() {
        return (
            <div>
                <div id="placeholder-buttons" className="shortcuts mobile-invisible">
                    <div className={'shortcut ' + this.isRoot() + ' placeholder-button'}>
                        Shortcuts
                    </div>
                </div>
                <div id="actual-buttons" className="shortcuts mobile-invisible">
                    {
                        this.state.keys.map(function(key, index) {
                            return (
                                <Link to={key[Object.keys(key)[0]]} key={index} className={'shortcut ' + this.isRoot()}>
                                    {Object.keys(key)[0]}
                                </Link>)
                        }, this)
                    }
                </div>
            </div>
        );
    }
}

export default Shortcuts;
