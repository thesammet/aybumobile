import 'react-native-gesture-handler';
import {useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {AuthProvider} from '@/context/Auth';
import Navigation from '@/navigation';
import {ThemeProvider} from '@/context/Theme';
import {ProfileProvider} from './context/Profile';
import SplashScreen from 'react-native-splash-screen';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const iosTrack = async () => {
  const trackingStatus = await requestTrackingPermission();
  if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    //todo: enable tracking
  }
};
const App = () => {
  useEffect(() => {
    Platform.OS === 'ios' && SplashScreen.hide();
    Platform.OS === 'ios' && iosTrack();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <ProfileProvider>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </ProfileProvider>
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
