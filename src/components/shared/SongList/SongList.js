import React from 'react';
import { Link } from 'react-router-dom';

import './SongList.scss';

class SongList extends React.Component {
  render() {
    const { song } = this.props;
    const singleLink = `/songs/${song.id}`;
    return (
      <div className="list-group">
          <Link href="#" to={singleLink} className="list-group-item list-group-item-action">{song.songTitle} - {song.artist}</Link>
      </div>
    );
  }
}

export default SongList;
