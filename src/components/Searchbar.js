import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  handlerChange = event => {
    this.setState({ searchImage: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.searchImage.trim() === '') {
      alert('Please, enter some for search image ... ');
      return;
    }
    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            value={this.state.searchImage}
            type="search"
            placeholder="Search images and photos"
            onChange={this.handlerChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
