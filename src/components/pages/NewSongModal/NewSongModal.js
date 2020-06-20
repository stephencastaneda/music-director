import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import NewSongForm from '../../shared/NewSongForm/NewSongForm';
// import SongEditForm from '../../shared/SongEditForm/SongEditForm';

class NewSongModal extends React.Component {
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
      <Button color="btn btn-dark mb-3" onClick={this.toggle}>ADD <i className="fas fa-music"></i></Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Add Song</ModalHeader>
        <ModalBody>
          <NewSongForm toggle={this.toggle} getSongs={this.props.getSongs}/>
          {/* <SongCreateForm songs={songs} toggle={this.toggle} getSongs={this.props.getSongs}/> */}
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default NewSongModal;
