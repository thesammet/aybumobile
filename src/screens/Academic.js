import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {MiniBox} from '@/components';
import {size} from '../styles/fonts';
import PdfView from '../components/PdfView';

const Academic = () => {
  return (
    <View style={styles.container}>
      {/* <MiniBox /> */}
      <Text style={{fontSize: size.h4}}>ASDASDAS</Text>
      <PdfView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Academic;
