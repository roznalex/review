import React from 'react';
import classNames from 'classnames';

const Section = props => {
  const _className = classNames('overman-section', props.className);

  return (
    <div {...props} className={_className}>
      <div className="container">
        {props.heading ? <h2>{props.heading}</h2> : null }
        {props.subHeading ? <h6 className="text-muted">{props.subHeading}</h6> : null }
        {props.children}
      </div>
    </div>
  );
};

Section.propTypes = {
  heading: React.PropTypes.node
};

export default Section;