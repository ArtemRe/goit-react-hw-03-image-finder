
import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import * as Api from '../components/API/Api';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Container } from './App.module';
import Loader from './Loader/Loader';




export  class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    largeImageURL: '',
    isLoading: false,
    totalPages: 0,
    error: null,
     
  };

  loadImages = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const data = await Api.fetchImages(query, page);
       if (data.hits.length === 0) {
        this.setState({
          error: {
            message: `Sorry, there are no images matching   '${query}'. Please try again.`,
            
          },
        });
        return;
      }
      this.setState(prevState => ({
        items: [...prevState.items, ...data.hits],
        totalPages: data.totalHits,
      }));

     
      
    } catch (error) {
      this.setState({ error });

    } finally {
      this.setState({ isLoading: false });

      
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
    const { items, isLoading, largeImageURL, error, page, totalPages,  } =
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