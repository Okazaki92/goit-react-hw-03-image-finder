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
    modalIsOpen: true,
  };
  imageOnClick = () => {
    this.setState({
      largeImageURL: this.props.largeImgURL,
      modalIsOpen: !this.state.modalIsOpen,
    });
  };
  render() {
    return (
      <>
        <li className="gallery-item" onClick={this.imageOnClick}>
          <img src={this.props.smallImgURL} alt={this.props.id} />
        </li>
        <Modal largeImageURL={this.props.largeImgURL} tags="lol" />
      </>
    );
  }
}
