import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import SongEditForm from '../../shared/SongEditForm/SongEditForm';

import './SongModalEdit.scss';

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
      <Button color="" onClick={this.toggle}><i className="song-list-edit-btn fas fa-pencil-alt fa-2x"></i></Button>
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
