import { Component } from 'react';
import { createPortal } from 'react-dom';
const modal = document.querySelector('#modal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey);
  }

  handleOverlayclick = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };

  handleEscKey = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayclick}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modal,
    );
  }
}
