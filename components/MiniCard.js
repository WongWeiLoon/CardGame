import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import {NUM_OF_COLUMNS, NUM_OF_ROWS} from '../constants';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MiniCard = props => {
  let animatedValue = useRef(new Animated.Value(0)).current;
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const handleCards = () => {
    props.onHandleClick();
    flipCardAnimation();
  };

  const flipCardAnimation = () => {
   // handleCards();
    if (props.isMatched === true) {
      return;
    }

    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 4,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 4,
        useNativeDriver: false,
      }).start();
    }
  };

  const setFrontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const setBackInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const rotateFrontAnimatedStyle = {
    transform: [{rotateY: setFrontInterpolate}],
  };

  const rotateBackAnimatedStyle = {
    transform: [{rotateY: setBackInterpolate}],
  };

  return (
    <Pressable
      style={styles.container(props.isFlipped)}
      onPress={props.onHandleClick}>
      <View>
        <Animated.View>
          <Text style={styles.labelStyle(props.isFlipped)}>
            {props.cardLabel}
          </Text>
        </Animated.View>
      </View>
    </Pressable>

   /** <View style={styles.containers}>
      <Pressable onPress={handleCards}>
        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardFront,
            rotateFrontAnimatedStyle
          ]}/>
      </Pressable>

      <Pressable onPress={handleCards}>
        <Animated.View style={[rotateBackAnimatedStyle, styles.flipCard]}>
          <Text style={styles.flipLabelStyle}>{props.cardLabel}</Text>
        </Animated.View>
      </Pressable>
    </View>  */
  );
};

const styles = StyleSheet.create({
  container: isMatch => ({
    backgroundColor: isMatch ? '#FFFBFB' : '#f34367',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2.7,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#3F0F0F',
    flex: 1,
    height: HEIGHT / NUM_OF_ROWS - 33,
  }),
  labelStyle: isMatch => ({
    fontSize: 25,
    color: isMatch ? '#200707' : 'transparent',
  }),
  containers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    //flex: 1,
    backgroundColor: '#FFFBFB',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2.7,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#3F0F0F',
    width: WIDTH / NUM_OF_COLUMNS - 15,
    height: HEIGHT / NUM_OF_ROWS - 33,
    backfaceVisibility: 'hidden',
    //position: 'absolute',
    //top: 0,
  },
  flipCardFront: {
    backgroundColor: '#f34367',
    //backfaceVisibility: 'hidden',
    position: 'absolute',
    borderColor: '#f34367',
    top: 0,
    left: -60,
  },
  flipLabelStyle: {
    fontSize: 28,
    color: '#000',
    //padding: 10,
  },
});

export default MiniCard;

