import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {size} from '@/styles/fonts';

const MiniBox = () => {
  return (
    <View style={styles.container}>
      <Text>MiniBox</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: size.box,
    height: size.boxHeight,
    backgroundColor: 'blue',
  },
});

export default MiniBox;
