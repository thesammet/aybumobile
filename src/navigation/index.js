import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';
import DeviceInfo from 'react-native-device-info';
import {ThemeContext} from '../context/Theme';
import customDefaultTheme from '../theme/DefaultTheme';
import customDarkTheme from '../theme/DarkTheme';

const Navigation = () => {
  const [deviceId, setDeviceId] = useState(null);
  const {theme} = useContext(ThemeContext);

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
    <NavigationContainer theme={getCurrentTheme()}>
      <Tabs />
    </NavigationContainer>
  );
};

export default Navigation;
