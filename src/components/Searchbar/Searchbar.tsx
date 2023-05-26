import React, { ChangeEvent, Component, FormEvent } from "react";

interface SearchbarProps {
  onSubmit: (query: string) => void;
}
interface SearchbarState {
  query: string;
}

export class Searchbar extends Component<SearchbarProps, SearchbarState> {
  state: SearchbarState = {
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
      <header className="searchbar">
        <form className="form" onSubmit={this.handleQuerySubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onInput={this.handleQueryChange}
            className="input"
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
