import React, { Component } from "react";
import ImageGallery from "react-image-gallery";

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  componentDidMount() {
    this.setState({ images: [] });
    const { photo } = this.props;
    const photoList = photo.images;
    let { images } = this.state;
    photoList.map((item, i) => {
      images.push({ original: item, thumbnail: item });
    });
    this.setState({ images });
  }
  render() {
    const { images } = this.state;
    const { photo } = this.props;
    return (
      <React.Fragment>
        <div className="photo-card m-2">
          <div className="photo-slider">
            <ImageGallery
              items={images}
              showThumbnails={photo.images.length > 1 ? true : false}
              showFullscreenButton={false}
              showPlayButton={false}
              disableSwipe={true}
              renderLeftNav={this.renderLeftNav}
              renderRightNav={this.renderRightNav}
            />
          </div>
          <div className="photo-container">
            <h3>March 17 2019</h3>
            {photo.description && <span>{photo.description}</span>}
          </div>
        </div>
      </React.Fragment>
    );
  }
  renderLeftNav = (onClick, disabled) => {
    return (
      <button
        className="image-gallery-custom-left-nav"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="fad fa-chevron-left" />
      </button>
    );
  };
  renderRightNav = (onClick, disabled) => {
    return (
      <button
        className="image-gallery-custom-right-nav"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="fad fa-chevron-right" />
      </button>
    );
  };
}

export default PhotoCard;
