import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';
import {ThemeContext} from '@/context/Theme';
import {AuthContext} from '@/context/Auth';
import customDefaultTheme from '@/theme/DefaultTheme';
import customDarkTheme from '@/theme/DarkTheme';
import Onboarding from '../components/Onboarding/';
import Auth from '../screens/Auth';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@/config/toast';

const Navigation = () => {
  const {theme} = useContext(ThemeContext);
  const {isOnboarding} = useContext(AuthContext);
  const {token} = useContext(AuthContext);

  const getCurrentTheme = () => {
    if (theme === 'light') {
      return customDefaultTheme;
    } else {
      return customDarkTheme;
    }
  };

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
              {!token ? <Auth /> : <Tabs />}
            </NavigationContainer>
          </SafeAreaView>

          <Toast config={toastConfig} />
        </SafeAreaProvider>
      )}
    </>
  );
};

export default Navigation;
