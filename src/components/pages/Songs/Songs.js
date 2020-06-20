import React from 'react';

import './Songs.scss';

import songsData from '../../../helpers/data/songsData';
import SongList from '../../shared/SongList/SongList';

import NewSongModal from '../NewSongModal/NewSongModal';

class Songs extends React.Component {
  state = {
    songs: [],
  }

  getSongs = () => {
    songsData.getAllSongs()
      .then((songs) => this.setState({ songs }))
      .catch((err) => console.error('unable to get songs: ', err));
  }

  componentDidMount() {
    this.getSongs();
  }

  removeSong = (songId) => {
    songsData.deleteSong(songId)
      .then(() => this.getSongs())
      .catch((err) => console.error('unable to delete songs: ', err));
  }


  render() {
    const { songs } = this.state;
    const buildSongList = songs.map((song) => (
      <SongList key={song.id} song={song} removeSong={this.removeSong} getSongs={this.getSongs}/>
    ));
    return (
      <div className="Songs mx-auto">
        <h1 className="text-white">Songs</h1>
        {/* <button className="btn btn-dark mb-3">ADD <i class="fas fa-music"></i></button> */}
        <NewSongModal getSongs={this.getSongs}/>
        <div className="col-12 d-flex flex-column">
          {buildSongList}
        </div>
      </div>
    );
  }
}

export default Songs;
