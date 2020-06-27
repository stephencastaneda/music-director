import React from 'react';

import smash from '../../../helpers/data/smash';

import setsData from '../../../helpers/data/setData';
import songsData from '../../../helpers/data/songsData';

import SetCreateModal from '../SetCreateModal/SetCreateModal';

import SetCard from '../../shared/SetCard/SetCard';

import './Set.scss';
import setSongData from '../../../helpers/data/setSongData';

class Set extends React.Component {
  state = {
    sets: [],
    setSongs: [],
    songs: [],
  }

  getSets = () => {
    smash.getAllSetList()
      .then((sets) => this.setState({ sets }))
      .catch((err) => console.error('unable to get sets: ', err));
  }

  getSetSongs = () => {
    setSongData.getAllSetSongs()
      .then((setSongs) => this.setState({ setSongs }))
      .catch((err) => console.error('unable to get setSongs: ', err));
  getAllSongs = () => {
    songsData.getAllSongs()
      .then((songs) => this.setState({ songs }))
      .catch((err) => console.error('could not get all songs: ', err));
  }

  componentDidMount() {
    this.getSets();
    this.getSetSongs();
    this.getAllSongs();
  }

  removeSet = (setId) => {
    smash.completelyRemoveSet(setId)
      .then(() => this.getSets(setId))
      .catch((err) => console.error('unable to delete set: ', err));
  }

  removeSetSong = (setSongsId) => {
    console.log('duh id', setSongsId);
    setSongData.deleteSetSong(setSongsId)
      .then(() => this.getSets())
      .catch((err) => console.error('unable to delete set: ', err));
  }


  render() {
    const { sets } = this.state;
    const buildSetCards = sets.map((set) => (
      <SetCard key={set.id} set={set} removeSetSong={this.removeSetSong} removeSet={this.removeSet} getAllSetList={this.getAllSetList}/>
    ));
    return (
      <div className="Set">
        <SetCreateModal getSets={this.getSets} getAllSongs={this.getAllSongs}/>
        <div className="d-flex flex-wrap">
          {buildSetCards}
        </div>
      </div>
    );
  }
}

export default Set;
