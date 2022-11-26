import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/Theme';
import Header from '../components/Header';
import UsernameBox from '../components/UsernameBox';
import { ProfileContext } from '../context/Profile';
import TYPOGRAPHY from '../constants/typography';
import ToggleButton from 'react-native-toggle-element';
import { Sun, Moon } from '../components/icons/'
import { useTheme } from '@react-navigation/native';

const Profile = ({ navigation }) => {
  const { colors } = useTheme()
  const { theme, changeTheme } = useContext(ThemeContext);
  const { username, faculty, department } = useContext(ProfileContext)
  const [toggleValue, setToggleValue] = useState(theme == 'light' ? true : false)

  return (
    <View style={[styles.homeContainer, { backgroundColor: colors.background }]}>
      <Header type="inside" />
      <UsernameBox username={username} />
      <View style={styles.innerView}>
        <View >
          <Text style={styles.fieldText}>Fakülte</Text>
          <View style={[styles.departmentArea, { borderColor: colors.boxBorder, backgroundColor: colors.boxBg }]}>
            <Text numberOfLines={2} style={[styles.departmentInnerText, { color: colors.usernameText }]}>{faculty}</Text>
          </View>
          <Text style={[styles.fieldText, { marginTop: 20 }]}>Bölüm</Text>
          <View style={[styles.departmentArea, { borderColor: colors.boxBorder, backgroundColor: colors.boxBg }]}>
            <Text numberOfLines={2} style={[styles.departmentInnerText, { color: colors.usernameText }]}>{department}</Text>
          </View>
          <Text style={[styles.fieldText, { marginTop: 20 }]}>Mod</Text>
          <ToggleButton
            value={toggleValue}
            onPress={(newState) => { setToggleValue(newState); toggleValue ? changeTheme('dark') : changeTheme('light') }}
            containerStyle={{ alignSelf: 'center', }}
            thumbActiveComponent={
              <Sun width="24" height="24" />
            }
            thumbInActiveComponent={
              <Moon width="24" height="24" />
            }
            thumbStyle={{
              backgroundColor: '#0AD4EE',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            trackBar={{
              activeBackgroundColor: colors.toggleBack,
              inActiveBackgroundColor: colors.toggleBack,
              width: 100,
            }}
          />
        </View>
        <TouchableOpacity activeOpacity={.7} onPress={() => { navigation.navigate('ProfileEdit') }}>
          <View style={[styles.editButton, { borderColor: colors.editBorderColor, backgroundColor: colors.editBackgroundColor },
          ]}>
            <Text style={[styles.editText, { color: '#0AD4EE' }]}>Düzenle</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    justifyContent: 'space-around',

  },
  editButton: {
    borderRadius: 32,
    width: '50%',
    borderWidth: 1,
    alignSelf: 'center',
    shadowColor: '#0AD4EE',
    shadowOffset: {
      width: 0,
      height: .1,
    },
    shadowOpacity: 0.3,
    shadowRadius: .1,
    elevation: 1,
    zIndex: 5,
  },
  fieldText: [
    TYPOGRAPHY.H5Regular,
    {
      color: '#A0A0A0',
      marginBottom: 8,
      alignSelf: 'center'
    },
  ],
  editText: [
    TYPOGRAPHY.H4Regular,
    {
      alignSelf: 'center',
      marginVertical: 20
    }],
  departmentArea: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 32,
    padding: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center'
  },
  departmentInnerText: [
    TYPOGRAPHY.H55Regular,
    {
      flex: 1,
      textAlign: 'center'
    }],
})

export default Profile;
