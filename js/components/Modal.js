import React from 'react';

const ModalHeader = props => {
  return (
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">Close</span>
      </button>
      <h4 className="modal-title lead">{props.title}</h4>
    </div>
  );
};

const Modal = props => {
  const modalId = props.modalId;

  return (
    <div className="modal fade overman-signup-modal" key={modalId} id={modalId}
         tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <ModalHeader title={props.title}/>
          <div className="modal-body">
            { props.children && props.children || '' }
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
