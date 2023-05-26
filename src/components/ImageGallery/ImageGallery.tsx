import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Modal } from "../Modal/Modal";

interface Image {
  id: string;
  webformatURL: string;
}

interface ImageGalleryProps {
  images: Image[];
}
interface ImageGalleryState {
  modalIsOpen: boolean;
  largeImageURL: string;
}
export class ImageGallery extends Component<
  ImageGalleryProps,
  {},
  ImageGalleryState
> {
  state = {
    modalIsOpen: false,
    largeImageURL: "",
  };

  render() {
    const { largeImageURL, modalIsOpen } = this.state;
    return (
      <>
        <ul className="gallery">
          {this.props.images.map((image) => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                id={image.id}
                smallImgURL={image.webformatURL}
              />
            );
          })}
        </ul>
        <Modal toggler={modalIsOpen} largeImageURL={largeImageURL} />
      </>
    );
  }
}
