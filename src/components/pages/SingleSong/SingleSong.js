import React from 'react';

import SingleViewModalEdit from '../SingleViewModalEdit/SingleViewModalEdit';

import songsData from '../../../helpers/data/songsData';

import './SingleSong.scss';

class SingleSong extends React.Component {
  state = {
    song: {},
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

  componentDidMount() {
    this.getSong();
  }

  removeSong = () => {
    const { songId } = this.props.match.params;
    songsData.deleteSong(songId)
      .then(() => this.props.history.push('/songs'))
      .catch((err) => console.error('unable to delete song: ', err));
  }

  render() {
    const { song } = this.state;
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
            </div>
            <button className="btn btn-danger" onClick={this.removeSong}><i className="fas fa-trash-alt"></i></button>
            <SingleViewModalEdit song={song} getSong={this.getSong}/>
          </div>
          </div>
    );
  }
}

export default SingleSong;
