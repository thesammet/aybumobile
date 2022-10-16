import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/Theme';

const Profile = () => {
  const {theme, changeTheme} = useContext(ThemeContext);

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => changeTheme('light')}>
        <Text>Light Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme('dark')}>
        <Text>Dark Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
