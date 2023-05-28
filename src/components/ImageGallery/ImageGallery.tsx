import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
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
  openModal = (image: Image) => {
    this.setState({
      modalIsOpen: true,
      largeImageURL: image.largeImageURL,
    });
  };

  render() {
    return (
      <>
        <ul className={styles.ImageGallery}>
          {this.props.images.map((image) => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                id={image.id}
                smallImgURL={image.webformatURL}
                largeImgURL={image.largeImageURL}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
