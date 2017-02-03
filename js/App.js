import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './lib/createStore';
import {
  View,
} from 'react-native';
import MainContainer from './MainContainer';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
