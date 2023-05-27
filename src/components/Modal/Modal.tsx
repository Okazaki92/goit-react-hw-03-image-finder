import React, { Component } from "react";

interface ModalProp {
  largeImageURL: string;
  tags: string;
}

export class Modal extends Component<ModalProp> {
  state = {
    modalIsOpen: false,
  };
  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };
  render() {
    return (
      <>
        <div className="overlay">
          <div className="modal">
            <img src={this.props.largeImageURL} alt={this.props.tags} />
          </div>
        </div>
      </>
    );
  }
}
