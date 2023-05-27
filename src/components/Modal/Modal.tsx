import React, { Component } from "react";
import FsLightbox from "fslightbox-react";

interface ModalProp {
  largeImageURL: string;
  toggler: boolean;
}

export class Modal extends Component<ModalProp> {
  render() {
    return (
      <>
        <FsLightbox
          toggler={this.props.toggler}
          sources={[`${this.props.largeImageURL}`]}
        />
      </>
    );
  }
}
