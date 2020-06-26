import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import typeData from '../../../helpers/data/typeData';
import smash from '../../../helpers/data/smash';

class SongResourcesModal extends React.Component {
  state = {
    isOpen: false,
    modal: false,
    types: [],
  }

   toggle = () => {
     this.setState({ isOpen: !this.state.isOpen });
     this.setState({ modal: !this.state.modal });
   };
   // const [modal, setModal] = useState(false);

   getAllTypes = () => {
     typeData.getAllTypesByTypeId()
       .then((types) => {
         // console.log('my resources', response);
         this.setState({ types });
       })
       .catch((err) => console.error('unable to get types: ', err));
   }


   componentDidMount() {
     this.getAllTypes();
     smash.getAllTypesWithResources('song1');
   }
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
       types,
     } = this.state;

     const buildResources = () => resources.map((resource) => (
          <div>
            {resource.resourceName}
            <a href={resource.url} className="btn btn-dark" role="button" target="_blank"><i className={resource.icon.icon}></i></a>
          </div>
     ));

     /* //  const buildTypes = () => {
    //    if (typeId === 'type1') {
    //      return
    //    }
    //  )) */
     return (
    <div>
      <Button color="warning" onClick={this.toggle}><i class="fas fa-folder-open"></i></Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>{song.songTitle} - Resources</ModalHeader>
        <ModalBody>
        <div className="d-flex flex-wrap">
          {buildResources()}
          {/* {buildTypes()} */}
          </div>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SongResourcesModal;
