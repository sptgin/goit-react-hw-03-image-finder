import { PureComponent } from 'react';

export default class ImageGalleryItem extends PureComponent {
  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;
    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          onClick={() => this.props.handleImageClick(largeImageURL)}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}
