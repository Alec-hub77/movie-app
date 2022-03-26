import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = () => {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
      <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
      </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = props => {

    const contentRef = React.useRef(null)

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active')
        if(props.onClose) props.onClose()
    }
    return (
        <div ref={contentRef} className="modal__content">
          {props.children}
          <div className="model__content__close" onClick={closeModal}>
            <i className="bx bx-x"></i>
          </div>
        </div>
    )
}

ModalContent.propTypes = {
  onClose: PropTypes.func
}

export default Modal;
