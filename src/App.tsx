import React, { Component } from 'react';
import Routes from './routes';
import { setNavigator } from './services/navigation';
// import {ThemeProvider} from 'styled-components';
// import theme from './src/global/styles/theme';

export default class App extends Component {
  render() {
    return (
      <Routes ref={navigatorRef => setNavigator(navigatorRef)} />
    );
  }
}