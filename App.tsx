import { View } from 'react-native';
import Map from './components/Map';
import React, { Component } from 'react';

interface MyProps {

}

interface MyState {

}

export default class App extends Component<MyProps, MyState> {
  render() {
    return (
      <View style={{flex:1}}>
        <Map />
      </View>
    );
  }
}