import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {AuthProvider} from '@/context/Auth';
import Navigation from '@/navigation';
//import DeviceInfo from 'react-native-device-info';
import {ThemeProvider} from '@/context/Theme';

const App = () => {
  // const [deviceId, setDeviceId] = useState(null);

  // const getdeviceId = () => {
  //   var uniqueId = DeviceInfo.getUniqueId();
  //   setDeviceId(uniqueId);
  // };

  /* ... */
  // Wrap your app with the new GestureHandler

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
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
