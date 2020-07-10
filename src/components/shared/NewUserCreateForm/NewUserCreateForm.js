import React from 'react';

import userData from '../../../helpers/data/userData';

import './NewUserCreateForm.scss';

class NewUserCreateForm extends React.Component {
  state = {
    email: '',
    name: '',
    phone: '',
  }

  emailChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  phoneChange = (e) => {
    e.preventDefault();
    this.setState({ phone: e.target.value });
  }

  saveUser = (e) => {
    e.preventDefault();
    // this.props.toggle();
    const {
      phone,
      email,
      name,
    } = this.state;

    const newUser = {
      phone,
      email,
      name,
    };
    userData.postUser(newUser)
      .then(() => this.props.toggle())
      .catch((err) => console.error('unable to save user:', err));
  }

  render() {
    const {
      name,
      phone,
      email,
    } = this.state;

    return (
      <div className="NewUser col-12 text-black">
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="user-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="user-name"
              value={name}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="user-phone"
              value={phone}
              onChange={this.phoneChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="album-title">Email</label>
            <input
              type="text"
              className="form-control"
              id="album-title"
              value={email}
              onChange={this.emailChange}
            />
          </div>
         <button className="btn btn-primary" onClick={this.saveUser}>Contact Me!</button>
        </form>
      </div>
    );
  }
}

export default NewUserCreateForm;
