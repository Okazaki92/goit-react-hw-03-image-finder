import React, { ChangeEvent, Component, FormEvent } from "react";
import styles from "./Searchbar.module.css";
interface SearchbarProps {
  onSubmit: (query: string) => void;
}
interface SearchbarState {
  query: string;
}

export class Searchbar extends Component<SearchbarProps, SearchbarState> {
  state = {
    query: "",
  };

  handleQueryChange = (evt: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: evt.target.value.toLowerCase() });
  };
  handleQuerySubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleQuerySubmit}>
          <button type="submit" className={styles[`SearchForm-button`]}>
            <span className={styles[`SearchForm-button-label`]}>Search</span>
          </button>

          <input
            onChange={this.handleQueryChange}
            className={styles[`SearchForm-input`]}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
