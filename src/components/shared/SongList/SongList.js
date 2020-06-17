import React from 'react';

import './SongList.scss';

class SongList extends React.Component {
  render() {
    const { song } = this.props;
    return (
      <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action">{song.songTitle} - {song.artist}</a>
      </div>
    );
  }
}

export default SongList;
