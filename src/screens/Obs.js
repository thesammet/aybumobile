import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Loading from '../components/Loading';

const Obs = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://obs.aybu.edu.tr/oibs/ogrenci/login.aspx' }}
        onLoadProgress={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          // loading animation
          if (nativeEvent.progress === 1) {
            setIsLoading(false);
          }
        }}
      />
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default Obs;

const styles = StyleSheet.create({});
