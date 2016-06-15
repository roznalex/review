import React from 'react';
import classNames from 'classnames';

const Hero = props => {
  const _style = {};
  const _className = classNames('overman-hero jumbotron jumbotron-fluid', props.className);

  if (props.backgroundImage) {
    _style.backgroundImage = `url(${props.backgroundImage})`;
  }

  return (
    <div {...props} className={_className} style={_style}>
      <div className="container hero-container">
        <div className="row">
          { props.children }
        </div>
      </div>
      <div className="hero-mask"></div>
    </div>
  );
};

Hero.propTypes = {
  backgroundImage: React.PropTypes.string
};

export default Hero;
