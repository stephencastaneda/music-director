import React from 'react';

import smash from '../../../helpers/data/smash';

import setsData from '../../../helpers/data/setData';

import SetCard from '../../shared/SetCard/SetCard';

import './Set.scss';
import setSongData from '../../../helpers/data/setSongData';

class Set extends React.Component {
  state = {
    sets: [],
    setSongs: [],
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
  }

  componentDidMount() {
    this.getSets();
    this.getSetSongs();
  }

  removeSet = (setId) => {
    smash.completelyRemoveSet(setId)
      .then(() => this.getSets(setId))
      .catch((err) => console.error('unable to delete set: ', err));
  }

  removeSetSong = (setSongsId) => {
    setSongData.deleteSetSong(setSongsId)
      .then(() => this.getSets())
      .catch((err) => console.error('unable to delete set: ', err));
  }


  render() {
    const { sets, setSongs } = this.state;
    const buildSetCards = sets.map((set) => (
      <SetCard key={set.id} set={set} setSongs={setSongs} removeSetSong={this.removeSetSong} removeSet={this.removeSet} getAllSetList={this.getAllSetList}/>
    ));
    return (
      <div className="Set">
        <h1>Set</h1>
        <div className="d-flex flex-wrap">
          {buildSetCards}
        </div>
      </div>
    );
  }
}

export default Set;
