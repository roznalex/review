import { Row, Col } from 'helpers/bootstrap';
import React from 'react';

const HorizontalSplit = props => {
  const COLUMN_CLASSES = {
    1 : ['xs-12'],
    2 : ['xs-12', 'lg-6'],
    3 : ['xs-12', 'lg-4'],
    4 : ['xs-12', 'sm-6', 'lg-3'],
    6 : ['xs-12', 'sm-6', 'lg-4'],
    12: ['xs-12', 'sm-6', 'lg-3']
  };

  const numSections = props.children.length;

  return (
    <Row className={`overman-horizontal-split overman-horizontal-split-${props.padding}`}>
      {props.children.map((child, idx) => {
        return (
          <Col size={COLUMN_CLASSES[numSections]} className="overman-horizontal-split-col" key={idx}>
            {child}
          </Col>
        );
      })}
    </Row>
  );
};

HorizontalSplit.propTypes = {
  padding: React.PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default HorizontalSplit;
