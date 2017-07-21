import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './components/Github';
import Header from './components/Header';
import Auth0Lock from 'auth0-lock';

class App extends Component {

  static defaultProps = {
      clientID: 'f3ey8GzaJCtdmXogVU2Xz1pZl5BiOj3F',
      domain: 'kevinv.auth0.com',
  };

  state = {
      idToken: '', // can be used to check if user is logged in
      profile: {}
  };

  componentWillMount() {
      this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

      // event 'authenticated' is emitted after a successful authentication.
      // Has the authentication result as the only argument.
      this.lock.on('authenticated', (authResult) => {

          this.lock.getProfile(authResult.idToken, (error, profile) => {
              if(error){
                  console.log(error);
                  return;
              }

              this.setProfile(authResult.idToken, profile);


          })
      });
      // Checks if user is already logged in by checking localStorage.
      this.getProfile();
  }


  getProfile = () => {
      // Checks if user is already logged in by checking localStorage.
      if(localStorage.getItem('idToken') !== null){
          this.setState({
              idToken: localStorage.getItem('idToken'),
              profile: JSON.parse(localStorage.getItem('profile'))
          })
      }
  };

  setProfile = (idToken, profile) => {
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      this.setState({
          idToken: localStorage.getItem('idToken'),
          profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {console.log(this.state)});
  };

  showLock = () => {
      this.lock.show();
  };

  logout = () => {
      this.setState({
          idToken: '',
          profile: {},
      }, () => {
          localStorage.removeItem('idToken');
          localStorage.removeItem('profile');
      });
  };

  render() {
    let git;

    // Check if logged in by checking if idToken is set
    if(this.state.idToken){
        git = <Github/>
    } else {
        git = <p>"Click on Login to view Github Viewer"</p>
    }

    return (
      <div className="App">
          <Header
            lock={this.lock}
            idToken={this.state.idToken}
            onLogin={this.showLock}
            onLogout={this.logout}
          />
          {git}
      </div>
    );
  }
}

export default App;
