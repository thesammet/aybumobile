import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#F5FCFF88',
    opacity: 0.4,
    zIndex: 999,
    elevation: 999,
  },
});

export default Loading;
