import React from 'react';

import moment from 'moment';

import songsData from '../../../helpers/data/songsData';
import setSongsData from '../../../helpers/data/setSongData';
import resourceData from '../../../helpers/data/resourcesData';


import './ResourceCreateForm.scss';
import typeData from '../../../helpers/data/typeData';

class ResourceCreateForm extends React.Component {
  state = {
    resourceName: '',
    songId: '',
    typeId: '',
    url: '',
    types: [],
    checked: false,
    resources: [],
  }

  getAllTypes = () => {
    typeData.getAllTypesByTypeId()
      .then((types) => this.setState({ types }))
      .catch((err) => console.error('could not get all types: ', err));
  }

  getAllResources = (songId) => {
    resourceData.getAllResourcesBySongId(songId)
      .then((resources) => this.setState({ resources }))
      .catch((err) => console.error('could not get resources: ', err));
  }

  componentDidMount() {
    this.getAllTypes();
    this.getAllResources();
  }

  resourceNameChange = (e) => {
    e.preventDefault();
    this.setState({ resourceName: e.target.value });
  }

  resourceUrlChange = (e) => {
    e.preventDefault();
    this.setState({ url: e.target.value });
  }

  resourceTypeChange = (e) => {
    e.preventDefault();
    this.setState({ typeId: e.target.value });
    this.setState({ selectedOption: e.target.checked });
  }

  saveResource = (e) => {
    e.preventDefault();
    this.props.toggle();
    const {
      resourceName,
      url,
      typeId,
      songId,
    } = this.state;

    const newResource = {
      resourceName,
      url,
      typeId,
      songId: this.props.song.songId,
    };
    resourceData.postResource(newResource)
      .then(() => this.getAllResources(this.props.song.songId))
      .catch((err) => console.error('unable to save resource: ', err));
  }


  render() {
    const {
      resourceName,
      url,
      songs,
      typeId,
      types,
    } = this.state;


    const buildTypeRadios = () => types.map((type) => (
      <div className="form-group form-check">
        <input
         type="radio"
         className="form-check-input"
         id="resource-type"
         checked={typeId === type.id}
         value={type.id}
         onChange={this.resourceTypeChange}
         />
         <label className="form-check-label" htmlFor="resource-type">{type.title}</label>
      </div>
    ));

    return (
      <div className="NewSet col-12 text-black">
      <form className="col-6 offset-3 text-left">
        <div className="form-group">
          <label htmlFor="resource-name">Resource Name</label>
          <input
            type="text"
            className="form-control"
            id="resource-name"
            value={resourceName}
            onChange={this.resourceNameChange}
          />
        </div>
        <h5>Pick Resource Type</h5>
        {buildTypeRadios()}
        <div className="form-group">
          <label htmlFor="resource-url">Url</label>
          <input
            type="text"
            className="form-control"
            id="resource-url"
            value={url}
            onChange={this.resourceUrlChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.saveResource}>Save Resource</button>
      </form>
    </div>
    );
  }
}


export default ResourceCreateForm;
