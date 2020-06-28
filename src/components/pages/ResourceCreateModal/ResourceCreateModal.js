import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import './ResourceCreateModal.scss';
import ResourceCreateForm from '../../shared/ResourceCreateForm/ResourceCreateForm';

class ResourceCreateModal extends React.Component {
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
      <div color="btn mb-3" onClick={this.toggle}><i className="fas fa-folder-plus single-song-resource fa-2x"></i></div>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Add Song</ModalHeader>
        <ModalBody>
          <ResourceCreateForm getResource={this.props.getResource} songId={this.props} song={this.props} toggle={this.toggle}/>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default ResourceCreateModal;
