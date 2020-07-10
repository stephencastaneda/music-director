import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="banner-div">
        <div className="no-gutters p-0 w-100">
        <img src="https://i.imgur.com/JIajiLb.png" alt="placeholder 960" class="img-fluid w-100" />
        </div>
      <div className="mt-2 btn btn-info btn-danger" onClick={this.loginClickEvent}><i class="fab fa-google fa-2x"></i></div>
    </div>
    );
  }
}

export default Auth;
