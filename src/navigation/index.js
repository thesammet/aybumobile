import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs';
import DeviceInfo from 'react-native-device-info';

const Navigation = () => {

  const [deviceId, setDeviceId] = useState(null);

  const getdeviceId = () => {
    var uniqueId = DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };

  //if token does not exist: user post to login api with device info 

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default Navigation;
