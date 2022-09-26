import React from 'react';
import {StyleSheet, Text, SafeAreaView, Button} from 'react-native';

const Header = props => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Button title="Restart" onPress={props.onClickRestart} />
      <Text style={styles.stepLabelStyle}>Steps: {props.stepCount}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepLabelStyle: {
    fontSize: 23,
  },
});

export default Header;
