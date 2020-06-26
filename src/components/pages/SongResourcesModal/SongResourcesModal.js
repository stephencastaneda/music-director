import React, { useState, useParams } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import typeData from '../../../helpers/data/typeData';
import resourceData from '../../../helpers/data/resourcesData';
import smash from '../../../helpers/data/smash';
import './SongResourcesModal.scss';

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

   //  getAllTypes = () => {
   //    typeData.getAllTypesByTypeId()
   //      .then((types) => {
   //        // console.log('my resources', response);
   //        this.setState({ types });
   //      })
   //      .catch((err) => console.error('unable to get types: ', err));
   //  }


   //  componentDidMount() {
   //    this.getAllTypes();
   //  }
   // const toggle = () => setModal(!modal);

   updateAfterEdit = () => {
     this.toggle();
     this.props.getSong();
   }

   //  removeSong = () => {
   //   const { songId } = this.props.match.params;
   //   songsData.deleteSong(songId)
   //     .then(() => this.props.history.push('/songs'))
   //     .catch((err) => console.error('unable to delete song: ', err));
   // }

   removeResource = (resourcesId) => {
     const { resources } = this.props;
     console.log('the resources id', resources);
     resourceData.deleteResource(resourcesId)
       .then(() => console.log('deleted'))
       .catch((err) => console.error('unable to delete resource: ', err));
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

     const buildResources = () => resources.map((resource) => {
       if (resource) {
         return (
                  <div className="resource-div">
                    {resource.resourceName}
                    <a href={resource.url} className="btn btn-dark" role="button" target="_blank"><i className={resource.icon.icon}></i></a>
                    <button className="btn btn-danger resource-delete-button" onClick={this.removeResource}><i class="fas fa-ban"></i></button>
                  </div>
         );
       }
       return '';
     });

     return (
    <div>
      <Button color="warning" onClick={this.toggle}><i class="fas fa-folder-open"></i></Button>
      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>{song.songTitle} - Resources</ModalHeader>
        <ModalBody>
        <div className="d-flex flex-wrap">
          {buildResources()}
          </div>
      </ModalBody>
      </Modal>
    </div>
     );
   }
}

export default SongResourcesModal;
