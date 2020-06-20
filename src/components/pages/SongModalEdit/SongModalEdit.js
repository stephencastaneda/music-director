import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import SongEditForm from '../../shared/SongEditForm/SongEditForm';

class SongEditModal extends React.Component {
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

   render() {
     const {
       buttonLabel,
       className,
       songs,
     } = this.props;
     const {
       isOpen,
       modal,
     } = this.state;

     return (
    <div>
      <Button color="danger song-edit-btn" onClick={this.toggle}><i className="fas fa-pencil-alt"></i></Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Edit Song</ModalHeader>
        <ModalBody>
          <SongEditForm songs={songs} toggle={this.toggle} getSongs={this.props.getSongs}/>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SongEditModal;
