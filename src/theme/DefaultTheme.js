import { DefaultTheme } from '@react-navigation/native';

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    mealBackground: '#fff',
    text: '#001A43',
    lightBlue: '#0AD4EE',
    heartGray: '#EBEBEB',
    heartRed: '#F62053',
    tabBarText: '#C5C8CD',
    tabBarTextActive: '#000',
    tabBarButtonBackground: '#fff',
    tabBarButtonBackgroundActive: '#0AD4EE',
    tabBarIconColor: '#002D74',
    tabBarIconColorActive: '#fff',
    headerBg: '#001A43',
    reactionBg: '#001A43',
    welcomeBg: '#001A43',
    toggleBack: '#F0F0F0',
    usernameText: '#001A43',
    editBorderColor: '#EBEBEB',
    editBackgroundColor: '#FFFFFF',
    boxBg: '#FFFFFF',
    boxBorder: '#EBEBEB',
    dateBoxElement: '#001A43',
    dateText: '#909090',
    trendHeader: '#FF4A22',
    dropdownChevronIcon: '#fff'
  },
};

export default customDefaultTheme;
