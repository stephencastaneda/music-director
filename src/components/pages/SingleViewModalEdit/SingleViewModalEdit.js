import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import SingleSongEditForm from '../../shared/SingleSongEditForm/SingleSongEditForm';

class SingleViewEditModal extends React.Component {
  state = {
    isOpen: false,
    modal: false,
  }

   toggle = () => {
     this.setState({ isOpen: !this.state.isOpen });
     this.setState({ modal: !this.state.modal });
   };
   // const [modal, setModal] = useState(false);

   // const toggle = () => setModal(!modal);

   updateAfterEdit = () => {
     this.toggle();
     this.props.getSong();
   }

   render() {
     const {
       buttonLabel,
       className,
       song,
     } = this.props;
     const {
       isOpen,
       modal,
     } = this.state;

     return (
    <div>
      <Button color="warning" onClick={this.toggle}><i className="fas fa-pencil-alt"></i></Button>
      <Modal isOpen={modal} className={className}>
        <ModalHeader>Edit Song</ModalHeader>
        <ModalBody>
          <SingleSongEditForm song={song} updateAfterEdit={this.updateAfterEdit}/>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SingleViewEditModal;
