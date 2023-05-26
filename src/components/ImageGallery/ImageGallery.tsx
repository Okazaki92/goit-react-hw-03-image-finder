import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

interface Image {
  id: string;
  webformatURL: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export class ImageGallery extends Component<ImageGalleryProps> {
  render() {
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
      </>
    );
  }
}
