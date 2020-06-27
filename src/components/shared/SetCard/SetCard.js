import React from 'react';

import { Link } from 'react-router-dom';

import smash from '../../../helpers/data/smash';


import './SetCard.scss';

class SetCard extends React.Component {
  render() {
    const { removeSet, removeSetSong, set } = this.props;


    const buildSetSongs = () => set.songs.map((song) => {
      if (song && song.songTitle) {
        const singleLink = `/songs/${song.id}`;
        return (
        <div>
        <Link songs={song} to={singleLink} className="list-group-item-action link-tag">{song.songTitle}</Link>
        <button className="btn btn-danger" onClick={() => removeSetSong(song.setSongId)}><i class="fas fa-ban"></i></button>
        </div>
        );
      }
      return '';
    });

    return (
      <div className="SetCard col-3">
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">{set.setTitle}</h5>
            </div>
              <ul className="list-group list-group-flush">
                  {buildSetSongs()}
              </ul>
                <div className="card-body">
                <button className="btn btn-danger set-delete-btn" onClick={() => removeSet(set.id)}><i className="fas fa-trash-alt"></i></button>
                </div>
          </div>
      </div>
    );
  }
}


export default SetCard;
