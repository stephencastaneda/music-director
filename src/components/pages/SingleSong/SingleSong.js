import React from 'react';

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
  }

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

  render() {
    const { song, resources } = this.state;
    const buildResources = () => resources.map((resource) => {
      if (resource) {
        return (
                 <div>
                   {resource.name}
                   <button><a href={resource.url} className="btn btn-dark" role="button" target="_blank"><i className={resource.icon.icon}></i></a></button>
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
              <h5 className="card-title">{song.songTitle}</h5>
              <p className="card-text">Album: {song.albumTitle}</p>
              <p className="card-text">Artist: {song.artist}</p>
              <p className="card-text">Release Year: {song.releaseYear}</p>
              <div>{buildResources()}</div>
            <button className="btn btn-danger" onClick={this.removeSong}><i className="fas fa-trash-alt"></i></button>
            <SingleViewModalEdit song={song} getSong={this.getSong}/>
            <ResourceCreateModal songId={song.id} getSong={this.getSong}/>

          </div>
          </div>
          </div>

    );
  }
}

export default SingleSong;
