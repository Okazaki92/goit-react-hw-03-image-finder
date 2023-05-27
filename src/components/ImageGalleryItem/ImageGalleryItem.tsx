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
        {this.state.modalIsOpen && (
          <Modal
            onClick={this.state.modalIsOpen}
            largeImageURL={this.props.largeImgURL}
            tags={`${this.state.modalIsOpen}`}
          />
        )}
      </>
    );
  }
}
