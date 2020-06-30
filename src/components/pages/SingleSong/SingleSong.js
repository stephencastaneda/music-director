import React from 'react';

import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';

import SingleViewModalEdit from '../SingleViewModalEdit/SingleViewModalEdit';
import ResourceCreateModal from '../ResourceCreateModal/ResourceCreateModal';


import songsData from '../../../helpers/data/songsData';
import resourcesData from '../../../helpers/data/resourcesData';
import smash from '../../../helpers/data/smash';

import './SingleSong.scss';

class SingleSong extends React.Component {
  state = {
    song: {},
    resources: [],
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getSong = () => {
    const { songId } = this.props.match.params;
    songsData.getSingleSong(songId)
      .then((response) => {
        const song = response.data;
        song.id = songId;
        this.setState({ song });
      })
      .catch((err) => console.error('unable to get single song: ', err));
  }

  getResource = () => {
    const { songId } = this.props.match.params;
    smash.getAllTypesWithResources(songId)
      .then((resources) => {
        // console.log('my resources', response);
        this.setState({ resources });
      })
      .catch((err) => console.error('unable to get resource: ', err));
  }

  componentDidMount() {
    this.getSong();
    this.getResource();
  }

  removeSong = () => {
    const { songId } = this.props.match.params;
    songsData.deleteSong(songId)
      .then(() => this.props.history.push('/songs'))
      .catch((err) => console.error('unable to delete song: ', err));
  }

  removeResource = (resourcesId) => {
    const rId = resourcesId.currentTarget.id;
    console.log('resource', rId);
    resourcesData.deleteResource(rId)
      .then(() => this.getResource())
      .catch((err) => console.error('unable to delete song: ', err));
  }

  render() {
    const { song, resources, isOpen } = this.state;
    const { buttonLabel, className } = this.props;

    const buildResources = () => resources.map((resource) => {
      if (resource && resource.icon) {
        return (
                 <div className="resource-flex">
                <div onClick={this.removeResource} id={resource.resourcesId}><i class="mr-2 resource-delete fas fa-minus-circle fa-lg"></i></div>
                   <div className="resource-title">{resource.name}</div>
                   <a className="ml-2 fa-2x" href={resource.url} target="_blank"><i id="resource-buttons"className={resource.icon.icon}></i></a>
                 </div>
        );
      }
      return '';
    });

    return (
      <div className="col-md-5 mt-4 mx-auto SingleSong">
        <div className="card profile-card-5">
          <div className="card-img-block">
            <img className="card-img-top" src={song.albumImage} alt="album cover" />
          </div>
            <div className="card-body pt-0">
              <div className="bg-black"><iframe width="300" height="60" src={song.audio} frameborder="0"></iframe>
              </div>
              <h2 className="card-title">{song.songTitle}</h2>
              <h5 className="card-text">Album: {song.albumTitle}</h5>
              <h5 className="card-text">Artist: {song.artist}</h5>
              <h5 className="card-text">Release Year: {song.releaseYear}</h5>
              <div className="single-view-btn-flex">
            <div onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.removeSong(); } } }><i className="fas fa-trash-alt fa-2x single-song-delete"></i></div>
            <SingleViewModalEdit song={song} getSong={this.getSong}/>
            <ResourceCreateModal getResource={this.getResource} songId={song.id} getSong={this.getSong}/>
            </div>
            <div>
      <Button color="primary" id="toggler" className="mt-3">
        Click For Resources
      </Button>
      <UncontrolledCollapse toggler="#toggler">
        <Card>
          <CardBody>
            <div>{buildResources()}</div>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
            <div>
    </div>
          </div>
          </div>
          </div>
    );
  }
}

export default SingleSong;
