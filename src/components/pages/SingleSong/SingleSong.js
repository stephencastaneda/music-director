import React from 'react';

import songsData from '../../../helpers/data/songsData';

import './SingleSong.scss';

class SingleSong extends React.Component {
  state = {
    song: {},
  }

  componentDidMount() {
    const { songId } = this.props.match.params;
    songsData.getSingleSong(songId)
      .then((response) => this.setState({ song: response.data }))
      .catch((err) => console.error('unable to get single song: ', err));
  }

  render() {
    const { song } = this.state;
    return (
      <div className="SingleSong">
        <h1>SingleSong</h1>
        <p>{song.albumTitle}</p>
      </div>
    );
  }
}

export default SingleSong;
