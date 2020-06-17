import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import Auth from '../components/pages/Auth/Auth';
import NewSong from '../components/pages/NewSong/NewSong';
import Set from '../components/pages/Set/Set';
import SingleSong from '../components/pages/SingleSong/SingleSong';
import Songs from '../components/pages/Songs/Songs';

import fbConnection from '../helpers/data/connection';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Auth />
        <NewSong />
        <Set />
        <SingleSong />
        <Songs />
      </div>
    );
  }
}
export default App;
