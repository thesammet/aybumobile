import { DefaultTheme } from '@react-navigation/native';

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#001A43',
    tabBarText: '#C5C8CD',
    tabBarTextActive: '#000',
    tabBarButtonBackground: '#fff',
    tabBarButtonBackgroundActive: '#0AD4EE',
    tabBarIconColor: '#002D74',
    tabBarIconColorActive: '#fff',
    headerBg: '#001A43',
    welcomeBg: '#001A43'
  },
};

export default customDefaultTheme;
