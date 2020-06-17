import React from 'react';

import './Songs.scss';

import songsData from '../../../helpers/data/songsData';
import SongList from '../../shared/SongList/SongList';

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

  render() {
    const { songs } = this.state;
    const buildSongList = songs.map((song) => (
      <SongList key={song.id} song={song}/>
    ));
    return (
      <div className="Songs mx-auto">
        <h1 className="text-white">Songs</h1>
        <div className="col-12 d-flex flex-column">
          {buildSongList}
        </div>
      </div>
    );
  }
}

export default Songs;
