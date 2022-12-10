import { DarkTheme } from '@react-navigation/native';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#090909',
    mealBackground: '#151515',
    text: '#fff',
    lightBlue: '#0AD4EE',
    heartGray: '#2C2C2C',
    heartRed: '#F62053',
    tabBarText: '#565656',
    tabBarTextActive: '#fff',
    tabBarButtonBackground: '#000',
    tabBarButtonBackgroundActive: '#0AD4EE',
    tabBarIconColor: '#fff',
    tabBarIconColorActive: '#fff',
    headerBg: '#0AD4EE',
    reactionBg: '#0F0F0F',
    welcomeBg: '#001A43',
    toggleBack: '#2C2C2C',
    usernameText: '#FFFFFF',
    editBorderColor: '#2C2C2C',
    editBackgroundColor: '#151515',
    boxBg: '#2C2C2C',
    boxBorder: '#2C2C2C',
    dateBoxElement: '#FFFFFF',
    dateText: '#474747',
    trendHeader: '#FF4A22',
    dropdownChevronIcon: '#001A43',
    mealBoxItemTop: '#202020',
    commentText: '#A0A0A0',
    commentInputBg: '#151515',
    sendIcon: '#FFFFFF',
    placeholderText: '#A0A0A0',
    commentInputText: '#FFFFFF',
    noCommentText: '#FFFFFF',
    shareFriendsText: '#FFFFFF'
  },
};

export default customDarkTheme;
