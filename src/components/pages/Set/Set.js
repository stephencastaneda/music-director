import React from 'react';

import setsData from '../../../helpers/data/setData';

import SetCreateModal from '../SetCreateModal/SetCreateModal';

import SetCard from '../../shared/SetCard/SetCard';

import smash from '../../../helpers/data/smash';


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

  render() {
    const { sets } = this.state;
    const buildSetCards = sets.map((set) => (
      <SetCard key={set.id} set={set} />
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
