import { Component } from 'react';
import imageSearchAPI from '../services/api';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import { Notification } from 'react-pnotify';

const imagesearch = new imageSearchAPI();

export default class ImageGallery extends Component {
  state = {
    searchResultArray: [],
    serchHits: null,
    status: 'init',
    imageLargeURL: '',
    errorMessage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ status: 'pending' });
      imagesearch.resetPage();
      imagesearch.searchQuery = this.props.searchQuery;
      imagesearch.search().then(searchResults => {
        if (searchResults.hits.length > 0) {
          this.setState({
            searchResults: searchResults.hits,
            serchHits: searchResults.total,
            status: 'success',
          });
        } else {
          this.setState({ status: 'error', errorMessage: 'Nothing found!' });
        }
      });
    }
  }

  handleClick = e => {
    imagesearch.page = 1;
    imagesearch
      .search()
      .then(searchResultArray => {
        this.setState(prev => ({
          searchResultArray: [
            ...prev.searchResultArray,
            ...searchResultArray.hits,
          ],
          status: 'success',
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(er => {
        this.setState({ status: 'error', errorMessage: er });
      });
  };

  render() {
    const {
      status,
      searchResultArray,
      serchHits,
      imageLargeURL,
      errorMessage,
    } = this.state;

    console.log();

    if (status === 'init') {
      return <h2 className="title"></h2>;
    }
    if (status === 'pending') {
      return <h2 className="title">Loading ...</h2>;
    }
    if (status === 'success') {
      return (
        <>
          <ul className="ImageGallery">
            {searchResultArray.map(el => (
              <ImageGalleryItem
                key={el.id}
                item={el}
                handleImageClick={this.handleImageClick}
              />
            ))}
          </ul>
          {serchHits > 15 && (
            <button
              className="Button"
              type="button"
              id="more"
              onClick={this.handleClick}
            >
              load more
            </button>
          )}
        </>
      );
    }

    if (status === 'showmodal') {
      return (
        <Modal largeImageURL={imageLargeURL} onModalClose={this.onModalClose} />
      );
    }
    if (status === 'error') {
      return <Notification type="Error" title="Error" text={errorMessage} />;
    }
  }
}
