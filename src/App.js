import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Router from './Router';
import History from './History';
import reducers from './reducers';
import { LOGIN_USER_SUCCESS } from './actions/types';

class App extends Component {
  constructor() {
        super();
        this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  }
  componentDidMount() {
    const config = {
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.store.dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user
            });
            History.push('/backlog');
        }
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={this.store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
