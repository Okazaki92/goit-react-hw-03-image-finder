import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import "./App.css";

axios.defaults.baseURL = "https://pixabay.com/api/";

interface AppState {
  API_KEY: string;
  page: number;
  query: string;
  gallery: Array<object>;
  per_page: number;
  isLoading: boolean;
}

export class App extends Component<{}, AppState> {
  state = {
    API_KEY: "34864371-45b05fc4683b315c0d551fd9e",
    page: 1,
    query: "",
    gallery: [],
    per_page: 12,
    isLoading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const response: AxiosResponse<{ hits: Array<object> }> = await axios.get(
        `?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&${this.state.per_page}`
      );
      this.setState({ gallery: response.data.hits, isLoading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<AppState>
  ): void {
    if (this.state.query !== prevState.query) {
      this.componentDidMount();
    }
  }

  submitQuery = (query: string) => {
    this.setState({ query: query });
    this.componentDidMount();
  };
  render() {
    const { gallery, isLoading } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.submitQuery} />
        <div>{isLoading ? <Loader /> : <ImageGallery images={gallery} />}</div>
      </div>
    );
  }
}
