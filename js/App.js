import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './lib/createStore';
import {
  View,
} from 'react-native';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    );
  }
}