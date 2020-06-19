import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import SongEditForm from '../../shared/SongEditForm/SongEditForm';

const ModalExample = (props) => {
  console.log(props);
  const {
    buttonLabel,
    className,
    songs,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" className="btn btn-danger song-edit-btn" onClick={toggle}><i className="fas fa-pencil-alt"></i></Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Song</ModalHeader>
        <ModalBody>
          <SongEditForm songs={songs}/>
      </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
