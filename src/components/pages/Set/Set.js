import React from 'react';

import setsData from '../../../helpers/data/setData';



import './Set.scss';

class Set extends React.Component {
  set = {
    sets: [],
  }

  getSets = () => {
    setsData.getAllSets
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
        <h1>Set</h1>
        <div className="d-flex flex-wrap">
          {buildSetCards}
        </div>
      </div>
    );
  }
}

export default Set;
