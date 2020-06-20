import React from 'react';

import './SongEditForm.scss';
import songsData from '../../../helpers/data/songsData';

class SongEditForm extends React.Component {
    state = {
      albumImage: '',
      albumTitle: '',
      artist: '',
      releaseYear: 1960,
      songTitle: '',
    }

    getSongs = () => {
      songsData.getAllSongs()
        .then((songs) => this.setState({ songs }))
        .catch((err) => console.error('unable to get songs: ', err));
    }

    componentDidMount() {
      const { songs } = this.props;
      const editId = songs.id;
      songsData.getSingleSong(editId)
        .then((response) => {
          const song = response.data;
          this.setState({
            albumImage: song.albumImage,
            albumTitle: song.albumTitle,
            artist: song.artist,
            releaseYear: song.releaseYear,
            songTitle: song.songTitle,
          });
        })
        .catch((err) => console.error('unable to get song to edit', err));
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
      this.props.toggle();
      const { songs } = this.props;
      const songId = songs.id;
      const {
        albumImage,
        albumTitle,
        artist,
        releaseYear,
        songTitle,
      } = this.state;
      const updatedSong = {
        albumImage,
        albumTitle,
        artist,
        releaseYear,
        songTitle,
      };
      songsData.putSong(songId, updatedSong)
        .then(() => this.props.getSongs())
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

export default SongEditForm;
