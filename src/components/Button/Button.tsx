import React, { Component } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onLoadMore: any;
}

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.onLoadMore}
        className={styles.Button}
      >
        Load more
      </button>
    );
  }
}
