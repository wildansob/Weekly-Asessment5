import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { COLOR } from './src/config/color';
import Router from './src/router';
import {Provider} from 'react-redux'
import { store } from './src/store/store';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.black} />
      <Router />
    </Provider>
  );
};

export default App;
