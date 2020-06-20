import React from 'react';
import { Link } from 'react-router-dom';

import SongModalEdit from '../../pages/SongModalEdit/SongModalEdit';


import './SongList.scss';


class SongList extends React.Component {
  state = {
    modal: false,
  }


  render() {
    const { song, removeSong } = this.props;
    const singleLink = `/songs/${song.id}`;

    return (
      <div className="list-container">
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
          <Link to={singleLink} className="list-group-item-action link-tag">{song.songTitle} - {song.artist}</Link>
          {/* <button className="btn btn-danger song-edit-btn" onClick={openSongModal}><i className="fas fa-pencil-alt"></i></button> */}
          <SongModalEdit songs={song} getSongs={this.props.getSongs}/>
          <button className="btn btn-danger song-delete-btn" onClick={() => removeSong(song.id)}><i className="fas fa-trash-alt"></i></button>
          </li>
        </ul>
      </div>
    );
  }
}

export default SongList;
