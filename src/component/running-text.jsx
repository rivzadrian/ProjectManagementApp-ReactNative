import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function RunningText() {
  const animation = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(-SCREEN_WIDTH); // start from left outside screen

      Animated.loop(
        Animated.timing(animation, {
          toValue: SCREEN_WIDTH,
          duration: 6000,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ translateX: animation }],
          },
        ]}
      >
        Welcome to Main Page!
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    whiteSpace: 'nowrap', // just for reference; not needed in RN
  },
});
