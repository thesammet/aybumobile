import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const AyButton = ({children, style, pressedButton, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => pressedButton()}
      hitSlop={{top: 16, bottom: 16, left: 8, right: 8}}
      {...props}
      activeOpacity={0.8}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AyButton;
