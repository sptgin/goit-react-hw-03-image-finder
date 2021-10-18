import { Component } from 'react';
import imageSearchAPI from '../services/api';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import SpinnerLoader from './Loader';
import Button from './Button';
import { Notification } from 'react-pnotify';

const imagesearch = new imageSearchAPI();

export default class ImageGallery extends Component {
  state = {
    searchResultArray: [],
    searchElements: null,
    status: 'init',
    imageLargeURL: '',
    errorMessage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ status: 'pending' });
      imagesearch.resetPage();
      imagesearch.searchQuery = this.props.searchQuery;
      imagesearch.search().then(searchResultArray => {
        if (searchResultArray.hits.length > 0) {
          this.setState({
            searchResultArray: searchResultArray.hits,
            searchElements: searchResultArray.total,
            status: 'success',
          });
        } else {
          this.setState({
            status: 'error',
            errorMessage: 'No images found ...',
          });
        }
      });
    }
  }

  handleImageClick = image => {
    this.setState({
      imageLargeURL: image,
      status: 'showmodal',
    });
  };
  onModalClose = () => {
    this.setState({
      status: 'success',
    });
  };

  handleMoreButtonClick = event => {
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
        Button();
      })
      .catch(error => {
        this.setState({ status: 'error', errorMessage: error });
      });
  };

  render() {
    const {
      status,
      searchResultArray,
      searchElements,
      imageLargeURL,
      errorMessage,
    } = this.state;

    if (status === 'init') {
      return <h1 className="title"></h1>;
    }

    if (status === 'pending') {
      return <SpinnerLoader />;
    }

    if (status === 'success') {
      return (
        <>
          <ul className="ImageGallery">
            {searchResultArray.map(element => (
              <ImageGalleryItem
                key={element.id}
                item={element}
                handleImageClick={this.handleImageClick}
              />
            ))}
          </ul>
          {searchElements > 12 && (
            <button
              className="Button"
              type="button"
              id="more"
              onClick={this.handleMoreButtonClick}
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
