import {DefaultTheme} from '@react-navigation/native';

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default customDefaultTheme;
