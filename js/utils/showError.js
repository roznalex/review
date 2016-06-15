import React from 'react';

const showError = (error, field) => {
  return (
    error && error[field] ?
      <small className="text-muted validation-error">
        {error[field][0]}
      </small> : null
  );
};

export default showError;