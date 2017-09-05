import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Experience.css';
import Modal from 'react-modal';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '20px',
        left                       : '20px',
        right                      : '20px',
        bottom                     : '20px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'
    
    }
};

class Organisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: this.props.modalIsOpen
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modalIsOpen: nextProps.modalIsOpen})
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.props.afterOpenModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Experience modal"
            >

                {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                <button onClick={this.props.closeModal}>close</button>
                <div>{this.props.selectedOrganisation}</div>
            </Modal>
        )
    }
}

export default Organisation;