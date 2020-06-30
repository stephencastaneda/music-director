import React from 'react';

import { Link } from 'react-router-dom';

import moment from 'moment';

import smash from '../../../helpers/data/smash';

import './SetCard.scss';

class SetCard extends React.Component {
  render() {
    const { removeSet, removeSetSong, set } = this.props;

    const buildSetSongs = () => set.songs.map((song) => {
      if (song && song.songTitle) {
        const singleLink = `/songs/${song.id}`;
        return (
        <div className="set-text">
        <Link songs={song} to={singleLink} className="list-group-item-action link-tag">{song.songTitle}</Link>
        <i class="fas fa-ban set-song-delete-btn" onClick={() => removeSetSong(song.setSongId)}></i>
        </div>
        );
      }
      return '';
    });

    return (
    <div className="SetCard col-3">
      <div className="card">
          <div className="set-card-body">
            <h5 className="card-title">{set.setTitle}</h5>
            <p>{moment(set.Date).format('MMMM Do YYYY')}</p>
          </div>
            <ul className="list-group list-group-flush">
                {buildSetSongs()}
            </ul>
             <div onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) removeSet(set.id); } }><i className="set-delete-btn fas fa-trash-alt"></i></div>
        </div>
    </div>
    );
  }
}


export default SetCard;
