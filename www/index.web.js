import React from 'react';
import { AppRegistry } from 'react-native-web';
import App from '../App';

// Register the app component
AppRegistry.registerComponent('SportCal', () => App);

// Start the app
AppRegistry.runApplication('SportCal', {
  rootTag: document.getElementById('root'),
});