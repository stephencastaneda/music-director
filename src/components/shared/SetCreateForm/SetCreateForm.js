import React from 'react';

import moment from 'moment';

import './SetCreateForm.scss';
import setData from '../../../helpers/data/setData';

class SetCreateForm extends React.Component {
  state = {
    setTitle: '',
    Date: '',
  }

  setTitleChange = (e) => {
    e.preventDefault();
    this.setState({ setTitle: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ Date: e.target.value });
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
      .then(() => this.props.getSets())
      .catch((err) => console.error('unable to save set: ', err));
  }

  render() {
    const {
      setTitle,
      Date,
    } = this.state;

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
        <button className="btn btn-primary" onClick={this.saveSet}>Save Set</button>
      </form>
    </div>
    );
  }
}

export default SetCreateForm;
