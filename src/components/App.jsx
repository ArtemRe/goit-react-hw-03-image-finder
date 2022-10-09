import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import * as API from '../components/API/Api';
import { Container } from './App.module';






export class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1,
    loader: false,
    error: null,
    totalPages: 0,
  }

  loadImages = async (query, page) => {
    this.setState({ loader: true });

    try {
      const data = await API.fetchImages(query, page);
      this.setState(prevState => ({
        items: [...prevState.items, ...data.hits],
        
        totalPages: data.totalHits,
      }));
      
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

 componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.loadImages(query, page);
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      query,
      items: [],
      page: 1,
      totalPages: 0,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  onCloseModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { items, isLoading, largeImageURL, error, page, totalPages } =
      this.state;
    return (
      <Container>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}

        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.onOpenModal} />
        )}
        {isLoading && <Loader />}

        {page < Math.ceil(totalPages / 12) && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {largeImageURL && (
          <Modal onClose={this.onCloseModal} largeImageURL={largeImageURL} />
        )}
      </Container>
    );
  }
}