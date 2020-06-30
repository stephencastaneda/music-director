import React from 'react';

import './SingleSongEditForm.scss';
import songsData from '../../../helpers/data/songsData';

class SingleSongEditForm extends React.Component {
    state = {
      albumImage: '',
      albumTitle: '',
      artist: '',
      releaseYear: 1960,
      songTitle: '',
      audio: '',
    }

    componentDidMount() {
      const { song } = this.props;
      this.setState({
        albumImage: song.albumImage,
        albumTitle: song.albumTitle,
        artist: song.artist,
        releaseYear: song.releaseYear,
        songTitle: song.songTitle,
        audio: song.audio,
      });
    }

    imageChange = (e) => {
      e.preventDefault();
      this.setState({ albumImage: e.target.value });
    }

    albumTitleChange = (e) => {
      e.preventDefault();
      this.setState({ albumTitle: e.target.value });
    }

    artistChange = (e) => {
      e.preventDefault();
      this.setState({ artist: e.target.value });
    }

    releaseChange = (e) => {
      e.preventDefault();
      this.setState({ releaseYear: e.target.value });
    }

    songTitleChange = (e) => {
      e.preventDefault();
      this.setState({ songTitle: e.target.value });
    }

    updateSong = (e) => {
      e.preventDefault();
      const { song } = this.props;
      const songId = song.id;
      const {
        albumImage,
        albumTitle,
        artist,
        releaseYear,
        songTitle,
        audio,
      } = this.state;
      const updatedSong = {
        albumImage,
        albumTitle,
        artist,
        releaseYear,
        songTitle,
        audio,
      };
      songsData.putSong(songId, updatedSong)
        .then(() => this.props.updateAfterEdit())
        .catch((err) => console.error('unable to save song: ', err));
    }

    render() {
      const { setModal } = this.props;
      const {
        albumImage,
        albumTitle,
        artist,
        releaseYear,
        songTitle,
      } = this.state;

      return (
        <div className="EditSong col-12 text-black">
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="song-artist">Artist</label>
            <input
              type="text"
              className="form-control"
              id="song-artist"
              value={artist}
              onChange={this.artistChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="song-title">Song Title</label>
            <input
              type="text"
              className="form-control"
              id="album-title"
              value={songTitle}
              onChange={this.songTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="album-title">Album Title</label>
            <input
              type="text"
              className="form-control"
              id="album-title"
              value={albumTitle}
              onChange={this.albumTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="song-release">Release Year</label>
            <input
              type="number"
              className="form-control"
              id="song-release"
              value={releaseYear}
              onChange={this.releaseChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="song-image">Album Cover Image</label>
            <input
              type="text"
              className="form-control"
              id="song-image"
              value={albumImage}
              onChange={this.imageChange}
            />
          </div>
         <button className="btn btn-primary" onClick={this.updateSong} >Update Song</button>
        </form>
      </div>
      );
    }
}

export default SingleSongEditForm;
