import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';
import {ThemeContext} from '../context/Theme';
import customDefaultTheme from '../theme/DefaultTheme';
import customDarkTheme from '../theme/DarkTheme';

const Navigation = () => {
  const {theme} = useContext(ThemeContext);

  const getCurrentTheme = () => {
    if (theme === 'light') {
      return customDefaultTheme;
    } else {
      return customDarkTheme;
    }
  };

  return (
    <NavigationContainer theme={getCurrentTheme()}>
      <Tabs />
    </NavigationContainer>
  );
};

export default Navigation;
