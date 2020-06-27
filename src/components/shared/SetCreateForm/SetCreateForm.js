import React from 'react';

import { Multiselect } from 'multiselect-react-dropdown';
import moment from 'moment';

import songsData from '../../../helpers/data/songsData';
import setSongsData from '../../../helpers/data/setSongData';


import './SetCreateForm.scss';
import setData from '../../../helpers/data/setData';

class SetCreateForm extends React.Component {
  state = {
    setTitle: '',
    Date: '',
    songs: [],
    setSongs: [],
    selectedValues: '',
    songId: '',
    setId: '',
  }

  getAllSongs = () => {
    songsData.getAllSongs()
      .then((songs) => this.setState({ songs }))
      .catch((err) => console.error('could not get all songs: ', err));
  }

  componentDidMount() {
    this.getAllSongs();
  }

  setTitleChange = (e) => {
    e.preventDefault();
    this.setState({ setTitle: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ Date: e.target.value });
  }

  songSelectChange = (selectedList, selectedItem) => {
    this.setState({ setSongs: selectedList });

    console.log('selected list', selectedList);
    console.log('selected item', selectedItem);
  }

  saveSetSongs = (setId) => {
    const { setSongs } = this.state;
    setSongs.forEach((setSong) => {
      const newSetSong = {
        songId: setSong.id,
        setId,
      };
      setSongsData.postSetSongs(newSetSong);
    });
    this.props.getSets();
  }

  saveSet = (e) => {
    e.preventDefault();
    this.props.toggle();
    const {
      setTitle,
      Date,
    } = this.state;

    const newSet = {
      setTitle,
      Date,
    };
    setData.postSet(newSet)
      .then((response) => this.saveSetSongs(response.data.name))
      .catch((err) => console.error('unable to save set: ', err));
  }

  render() {
    const {
      setTitle,
      Date,
      songs,
    } = this.state;

    const songTitles = [];
    songs.forEach((song) => {
      songTitles.push({ name: song.songTitle, id: song.id });
    });

    return (
      <div className="NewSet col-12 text-black">
      <form className="col-6 offset-3 text-left">
        <div className="form-group">
          <label htmlFor="set-title">Set Title</label>
          <input
            type="text"
            className="form-control"
            id="set-title"
            value={setTitle}
            onChange={this.setTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            placeholder="Set Date"
            type="date"
            className="form-control"
            id="date"
            value={Date.now}
            onChange={this.dateChange}
          />
        </div>
        <div className="form-group">
        <Multiselect
          autoComplete="new-password"
          options={songTitles} // Options to display in the dropdown
          selectedValues={this.state.selectedValues}
          id={this.id}
          onSelect={this.onSelect} // Function will trigger on select event
          // selectedValues={th} // Preselected value to persist in dropdown
          onSelect={this.songSelectChange} // Function will trigger on select event
          // onRemove={songs.songTitle} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
        </div>
        <button className="btn btn-primary" onClick={this.saveSet}>Save Set</button>
      </form>
    </div>
    );
  }
}


export default SetCreateForm;
