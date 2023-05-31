import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { getGallery } from "../api/getGallery";

interface AppState {
  page: number;
  query: string;
  gallery: Array<object>;
  per_page: number;
  isLoading: boolean;
  totalImages: number;
}

export class App extends Component<{}, AppState> {
  state = {
    page: 1,
    query: "",
    gallery: [],
    per_page: 12,
    isLoading: false,
    totalImages: 0,
  };

  loadGallery = async () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;
    const data = await getGallery(query);
    this.setState({
      page,
      gallery: data.hits,
      isLoading: false,
      totalImages: data.total,
    });
  };

  loadMoreGallery = async () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;
    const data = await getGallery(query, page);

    this.setState((prevState) => ({
      gallery: [...prevState.gallery, ...data.hits],
      isLoading: false,
      totalImages: data.total,
    }));
  };

  async componentDidUpdate(prevProps: any, prevState: AppState) {
    // if (prevState.query !== this.state.query) {
    //   await this.loadGallery();
    // }

    // if (this.state.page !== prevState.page) {
    //   this.loadMoreGallery();
    //   this.setState({ page: this.state.page });
    // }
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      const { query, page } = this.state;
      const data = await getGallery(query, page);
      this.setState({
        gallery: [...prevState.gallery, ...data.hits],
        isLoading: false,
        totalImages: data.total,
      });
    }
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: 1 + prevState.page,
    }));
  };

  submitQuery = async (query: string) => {
    // this.loadGallery();
    this.setState({ query, isLoading: true, page: 1, gallery: [] });
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
