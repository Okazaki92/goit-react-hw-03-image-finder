import React, { Component } from "react";

interface ImageGalleryItemProps {
  smallImgURL: string;
  id: string;
}

export class ImageGalleryItem extends Component<ImageGalleryItemProps> {
  render() {
    return (
      <li className="gallery-item">
        <img src={this.props.smallImgURL} alt={this.props.id} />
      </li>
    );
  }
}
