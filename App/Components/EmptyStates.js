import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const EmptyStates = ({ lottie, text = 'Page Under Development' }) => {
  return (
    <View style={[styles.container]}>
      <LottieView source={lottie} autoPlay loop />
      <Text style={[styles.text]}>{text}</Text>
    </View>
  );
};

export default EmptyStates;

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  text: {
    marginVertical: 25
  }
});
