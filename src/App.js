import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import { toastConfig } from '@/config/toast';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/Auth';
import Navigation from '@/navigation';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  const [deviceId, setDeviceId] =
    useState(null);
  const getdeviceId = () => {
    var uniqueId = DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <StatusBar animated={true} barStyle="dark-content" />
          <Navigation />
        </SafeAreaView>
      </AuthProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
