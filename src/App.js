import React, { Component } from 'react';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';

class App extends Component {
  state = {
    searchImage: '',
  };

  onSubmit = input => {
    this.setState({
      searchImage: input,
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery searchQuery={this.state.searchImage} />
      </div>
    );
  }
}

export default App;
