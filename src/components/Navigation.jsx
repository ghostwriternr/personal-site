import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Navigation.css';

class Navigation extends Component {
    componentDidMount() {
        [].slice.call(document.querySelectorAll('.nav')).forEach(function(nav) {
            var navItems = [].slice.call(nav.querySelectorAll('.nav__item')),
                // itemsTotal = navItems.length,
                setCurrent = function(item) {
                    // return if already current
                    if( item.classList.contains('nav__item--current') ) {
                        return false;
                    }
                    // remove current
                    var currentItem = nav.querySelector('.nav__item--current');
                    currentItem.classList.remove('nav__item--current');

                    // set current
                    item.classList.add('nav__item--current');
                };

            navItems.forEach(function(item) {
                item.addEventListener('click', function() { setCurrent(item); });
            });
        });
    }

    render() {
        return (
            <div className="Navigation-position">
                <div className="section section--nav" id="Ubax">
                    <nav className="nav nav--ubax">
                        <button className="nav__item nav__item--current" aria-label="Home"><span className="nav__item-title">Home</span></button>
                        <button className="nav__item" aria-label="Experience"><span className="nav__item-title">Experience</span></button>
                        <button className="nav__item" aria-label="Experience"><span className="nav__item-title">Projects</span></button>
                        <button className="nav__item" aria-label="Experience"><span className="nav__item-title">About Me</span></button>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Navigation;
