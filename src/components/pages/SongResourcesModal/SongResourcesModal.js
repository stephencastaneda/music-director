import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';


class SongResourcesModal extends React.Component {
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
       resources,
     } = this.props;
     const {
       isOpen,
       modal,
     } = this.state;

     return (
    <div>
      <Button color="warning" onClick={this.toggle}><i class="fas fa-folder-open"></i></Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>{song.songTitle} - Resources</ModalHeader>
        <ModalBody>
          <p>{resources.resourceName}</p>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SongResourcesModal;
