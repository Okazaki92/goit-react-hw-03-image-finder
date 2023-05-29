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

  // async componentDidMount() {
  //   try {
  //     const response: AxiosResponse<{ hits: Array<object>; total: number }> =
  //       await axios.get(
  //         `?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //       );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // loadGallery = () => {
  //   this.setState(
  //     {
  //       page: 1,
  //     },
  //     () => {
  //       this.componentDidMount().then((response: any) => {
  //         this.setState({
  //           gallery: response.hits,
  //           isLoading: false,
  //           totalImages: response.total,
  //         });
  //       });
  //     }
  //   );
  // };

  // loadMoreGallery = () => {
  //   this.setState({ isLoading: true });
  //   this.componentDidMount().then((response: any) => {
  //     this.setState((prevState) => ({
  //       gallery: [...prevState.gallery, ...response.hits],
  //       isLoading: false,
  //       totalImages: response.total,
  //     }));
  //   });
  // };

  // componentDidUpdate(
  //   prevProps: any,
  //   prevState: { query: string; page: number }
  // ) {
  //   if (this.state.query !== prevState.query) {
  //     this.loadGallery();
  //   }
  //   if (this.state.page !== prevState.page) {
  //     this.loadMoreGallery();
  //   }
  // }

  // handleLoadMore = () => {
  //   this.setState((prevState) => {
  //     return { page: prevState.page + 1 };
  //   });
  // };

  // submitQuery = (query: string) => {
  //   this.setState({ query: query, isLoading: true });
  //   this.loadGallery();
  // };

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

  componentDidUpdate(prevProps: any, prevState: AppState) {
    if (prevState.query !== this.state.query) {
      this.loadGallery();
    }

    if (this.state.page !== prevState.page) {
      this.loadMoreGallery();
      this.setState({ page: this.state.page });
    }
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: 1 + prevState.page,
    }));
  };

  submitQuery = (query: string) => {
    this.setState({ query, isLoading: true });
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
