import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import SetCreateForm from '../../shared/SetCreateForm/SetCreateForm';

class SetCreateModal extends React.Component {
  state = {
    isOpen: false,
    modal: false,
  }

   toggle = () => {
     this.setState({ isOpen: !this.state.isOpen });
     this.setState({ modal: !this.state.modal });
   };

   render() {
     const {
       buttonLabel,
       className,
       songs,
       getSets,
     } = this.props;
     const {
       isOpen,
       modal,
     } = this.state;

     return (
    <div>
      <Button color="danger set-create-btn mt-3 mb-3" onClick={this.toggle}><i class="far fa-plus-square"></i></Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Create Set</ModalHeader>
        <ModalBody>
          <SetCreateForm sets={this.props.sets} songs={songs} toggle={this.toggle} getSets={this.props.getSets} getAllSongs={this.getAllSongs}/>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SetCreateModal;
