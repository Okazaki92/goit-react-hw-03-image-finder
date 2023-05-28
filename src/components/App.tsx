import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";

axios.defaults.baseURL = "https://pixabay.com/api/";

interface AppState {
  API_KEY: string;
  page: number;
  query: string;
  gallery: Array<object>;
  per_page: number;
  isLoading: boolean;
  totalImages: number;
}

export class App extends Component<{}, AppState> {
  state = {
    API_KEY: "34864371-45b05fc4683b315c0d551fd9e",
    page: 1,
    query: "",
    gallery: [],
    per_page: 12,
    isLoading: false,
    totalImages: 0,
  };

  async componentDidMount() {
    try {
      const response: AxiosResponse<{ hits: Array<object>; total: number }> =
        await axios.get(
          `?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  loadGallery = () => {
    this.componentDidMount().then((response: any) => {
      this.setState({
        gallery: response.hits,
        isLoading: false,
        totalImages: response.total,
        page: 1,
      });
    });
  };

  loadMoreGallery = () => {
    this.setState({ isLoading: true });
    this.componentDidMount().then((response: any) => {
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...response.hits],
        isLoading: false,
        totalImages: response.total,
      }));
    });
  };

  componentDidUpdate(
    prevProps: any,
    prevState: { query: string; page: number }
  ) {
    if (this.state.query !== prevState.query) {
      this.loadGallery();
    }
    if (this.state.page !== prevState.page) {
      this.loadMoreGallery();
    }
  }

  handleLoadMore = () => {
    this.setState((prevState) => {
      return { page: this.state.page + 1 };
    });
  };

  submitQuery = (query: string) => {
    this.setState({ query: query, isLoading: true });
    this.loadGallery();
  };

  render() {
    const { gallery, isLoading, totalImages } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.submitQuery} />
        <ImageGallery images={gallery} />
        {totalImages > gallery.length && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
