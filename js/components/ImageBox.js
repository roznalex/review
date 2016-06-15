import React, { PropTypes } from 'react';

const ImageBox = props => {
  return (
    <div className="image-box-container">
      <img src={props.imageUrl} className="img-circle"/>
      <p className="story">{props.story}</p>
      <p className="author">{props.author}</p>
      <p className="position text-muted">{props.position}</p>
      <img src={props.companyLogo} className="company-logo"/>
    </div>
  );
};

ImageBox.propTypes = {
  imageUrl: PropTypes.string.isRequired
};

export default ImageBox;