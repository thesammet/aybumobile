import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const Obs = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://obs.aybu.edu.tr/oibs/ogrenci/login.aspx'}}
        onLoadProgress={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log(`Progress: ${nativeEvent.progress}`);
          // loading animation
          if (nativeEvent.progress === 1) {
            setIsLoading(false);
          }
        }}
      />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Obs;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});
