import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {MiniBox} from '@/components';
import {size} from '../styles/fonts';

const Academic = () => {
  return (
    <View style={styles.container}>
      <MiniBox />
      <Text style={{fontSize: size.h4}}>ASDASDAS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Academic;
