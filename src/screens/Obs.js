import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const Obs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://obs.aybu.edu.tr/oibs/ogrenci/login.aspx' }}
      />

    </SafeAreaView>

  );
};

export default Obs;

const styles = StyleSheet.create({});
