import React, { Component } from "react";

interface ButtonProps {
  onLoadMore: () => void;
}

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button type="button" onClick={this.props.onLoadMore} className="button">
        Load more
      </button>
    );
  }
}
