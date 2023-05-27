import React, { Component } from "react";
import { Modal } from "../Modal/Modal";

interface ImageGalleryItemProps {
  smallImgURL: string;
  id: string;
  largeImgURL: string;
}

export class ImageGalleryItem extends Component<ImageGalleryItemProps> {
  state = {
    largeImageURL: "",
    modalIsOpen: false,
  };
  imageOnClick = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <>
        <li className="gallery-item" onClick={this.imageOnClick}>
          <img src={this.props.smallImgURL} alt={this.props.id} />
        </li>
        <Modal toggler={modalIsOpen} largeImageURL={this.props.largeImgURL} />
      </>
    );
  }
}
