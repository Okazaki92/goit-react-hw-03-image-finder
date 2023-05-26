import React, { Component } from "react";
import FsLightbox from "fslightbox-react";

interface ModalProp {
  toggler: boolean;
  largeImageURL: string ;
}

export class Modal extends Component<ModalProp> {
  state = {
    toggler: false,
  };
  handleToggle = () => {
    this.setState({
      toggler: !this.state.toggler,
    });
  };
  render() {
    const { toggler } = this.state;
    return (
      <>
        <FsLightbox
          toggler={toggler}
          sources={[<img src={this.props.largeImageURL} alt="" />]}
        />
      </>
    );
  }
}
