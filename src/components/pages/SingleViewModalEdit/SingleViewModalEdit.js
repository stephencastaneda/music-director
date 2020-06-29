import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import SingleSongEditForm from '../../shared/SingleSongEditForm/SingleSongEditForm';

import './SingleViewModalEdit.scss';

class SingleViewEditModal extends React.Component {
  state = {
    isOpen: false,
    modal: false,
  }

   toggle = () => {
     this.setState({ isOpen: !this.state.isOpen });
     this.setState({ modal: !this.state.modal });
   };


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
      <div color="btn btn-danger" onClick={this.toggle}><i className="fas fa-pencil-alt fa-2x single-song-edit"></i></div>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Edit Song</ModalHeader>
        <ModalBody>
          <SingleSongEditForm song={song} updateAfterEdit={this.updateAfterEdit}/>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SingleViewEditModal;
