import React, { Component } from 'react';
import { Button } from 'react-native';
import { navigate } from '../services/navigation';

export default class App extends Component {
  render() {
    return (
      <Button
        title='Push Settings Screen'
        color='#710ce3'
        onPress={
          () => navigate('Main')
        } />
    );
  }
}