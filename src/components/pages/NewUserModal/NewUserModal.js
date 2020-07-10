import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import NewUserCreateForm from '../../shared/NewUserCreateForm/NewUserCreateForm';

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
      <Button color="warning set-create-btn mt-3 mb-3" onClick={this.toggle}><i class="fas fa-mobile mr-2"></i>Sign Up for Text Alerts!</Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Sign Up For Alerts</ModalHeader>
       <ModalBody>
          <NewUserCreateForm users={this.props.users} toggle={this.toggle}/>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SetCreateModal;
