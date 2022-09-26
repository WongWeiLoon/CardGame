import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import CardScreen from './screens/CardScreen';
import {store} from './redux/store/store';
import {Provider} from 'react-redux';
import Header from './components/Header';

const App = () => {
  return (
    <Provider store={store}>
      {/*<Header />*/}
      <CardScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
