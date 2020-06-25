import React from 'react';

import smash from '../../../helpers/data/smash';

import setsData from '../../../helpers/data/setData';

import SetCreateModal from '../SetCreateModal/SetCreateModal';

import SetCard from '../../shared/SetCard/SetCard';

import './Set.scss';

class Set extends React.Component {
  state = {
    sets: [],
  }

  getSets = () => {
    smash.getAllSetList()
      .then((sets) => this.setState({ sets }))
      .catch((err) => console.error('unable to get sets: ', err));
  }

  componentDidMount() {
    this.getSets();
  }

  removeSet = (setId) => {
    smash.completelyRemoveSet(setId)
      .then(() => this.getSets(setId))
      .catch((err) => console.error('unable to delete set: ', err));
  }

  render() {
    const { sets } = this.state;
    const buildSetCards = sets.map((set) => (
      <SetCard key={set.id} set={set} removeSet={this.removeSet} getAllSetList={this.getAllSetList}/>
    ));
    return (
      <div className="Set">
        <SetCreateModal getSets={this.getSets}/>
        <div className="d-flex flex-wrap">
          {buildSetCards}
        </div>
      </div>
    );
  }
}

export default Set;
