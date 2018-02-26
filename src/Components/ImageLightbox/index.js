import React, { Component } from "react";
import { render } from "react-dom";
import Lightbox from "react-image-lightbox";

class ImageLightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({ isOpen: nextProps.open, photoIndex: nextProps.photoIndex })
  }

  render() {
    const images = this.props.photos;
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })}
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })}
          />
        )}
      </div>
    );
  }
}

export default ImageLightbox