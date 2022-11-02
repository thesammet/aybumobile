import React, {useContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';
import DeviceInfo from 'react-native-device-info';
import {ThemeContext} from '@/context/Theme';
import {AuthContext} from '@/context/Auth';
import customDefaultTheme from '../theme/DefaultTheme';
import customDarkTheme from '../theme/DarkTheme';
import Onboarding from '../components/Onboarding/';

import Toast from 'react-native-toast-message';
import {toastConfig} from '@/config/toast';
import Header from '@/components/Header';

const Navigation = () => {
  const [deviceId, setDeviceId] = useState(null);
  const {theme} = useContext(ThemeContext);
  const {isOnboarding} = useContext(AuthContext);

  const getCurrentTheme = () => {
    if (theme === 'light') {
      return customDefaultTheme;
    } else {
      return customDarkTheme;
    }
  };

  const getdeviceId = () => {
    var uniqueId = DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };

  //if token does not exist: user post to login api with device info
  return (
    <>
      {isOnboarding ? (
        <Onboarding />
      ) : (
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <StatusBar animated={true} barStyle="dark-content" />

            <NavigationContainer theme={getCurrentTheme()}>
              <Header type="inside" />
              <Tabs />
            </NavigationContainer>
          </SafeAreaView>

          <Toast config={toastConfig} />
        </SafeAreaProvider>
      )}
    </>
  );
};

export default Navigation;
