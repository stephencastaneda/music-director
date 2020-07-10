import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import Auth from '../components/pages/Auth/Auth';
import Set from '../components/pages/Set/Set';
import SingleSong from '../components/pages/SingleSong/SingleSong';
import Songs from '../components/pages/Songs/Songs';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/songs', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
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
    const { authed } = this.state;
    return (
      <div className="App">
       <BrowserRouter>
        <React.Fragment>
          <MyNavbar authed={authed}/>
          <div>
            <div className="row">
              <Switch>
                <PrivateRoute path='/songs/:songId' component={SingleSong} authed={authed} />
                <PrivateRoute path='/songs/' component={Songs} authed={authed} />
                <PrivateRoute path='/set' component={Set} authed={authed} />
                <PublicRoute path='/auth' component={Auth} authed={authed} />
                <Redirect from="*" to="/songs"/>
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </div>
    );
  }
}
export default App;
