import React, { Component } from 'react';
import { Overlay, ModalWrapp } from './Modal.module';

export default class Modal extends Component {
  handleKeyDown = element => {
    if (element.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWrapp>
          <img src={this.props.largeImageURL} alt="" />
        </ModalWrapp>
      </Overlay>
    );
  }
}