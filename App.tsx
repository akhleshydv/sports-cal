import React from 'react';
import {StatusBar} from 'react-native';
import TournamentScreen from './src/screens/TournamentScreen';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <TournamentScreen />
    </>
  );
};

export default App;