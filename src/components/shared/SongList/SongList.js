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
          <Link songs={song} to={singleLink} className="list-group-item-action link-tag">
          <div className="d flex flex-wrap">
            <p className="song-title mb-0 bold mr-5 ml-5">{song.songTitle}</p>
            <p className="song-artist mb-0">{song.artist}</p>
          </div>
          </Link>
          {/* <button className="btn btn-danger song-edit-btn" onClick={openSongModal}><i className="fas fa-pencil-alt"></i></button> */}
          <SongModalEdit songs={song} getSongs={this.props.getSongs}/>
          <div className="song-delete-btn" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) removeSong(song.id); } }><i className="fas fa-trash-alt fa-2x"></i></div>
          </li>
        </ul>
      </div>
    );
  }
}

export default SongList;
