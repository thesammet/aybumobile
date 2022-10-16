import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default Navigation;
