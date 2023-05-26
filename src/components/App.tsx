import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import "./App.css";

axios.defaults.baseURL = "https://pixabay.com/api/";

interface Gallery {
  id: number;
  // Add other properties here based on the actual response data structure
}

interface AppState {
  API_KEY: string;
  page: number;
  query: string;
  gallery: Gallery[];
}

export class App extends Component<{}, AppState> {
  state = {
    API_KEY: "34864371-45b05fc4683b315c0d551fd9e",
    page: 1,
    query: "",
    gallery: [],
  };

  async componentDidMount() {
    const response: AxiosResponse<{ hits: Gallery[] }> = await axios.get(
      `?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    console.log(this.state.query);

    console.log(response.data.hits);

    this.setState({ gallery: response.data.hits });
  }
  onSearch = (query: string) => {
    this.setState({ query });
  };
  onPageChange = (page: number) => {
    this.setState({ page });
  };

  submitQuery = (query: string) => {
    this.setState({ query: query });
    this.componentDidMount();
  };
  render() {
    const { gallery } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.submitQuery} />
        <ImageGallery images={gallery} />
      </div>
    );
  }
}
