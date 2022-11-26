import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/Theme';
import Header from '../components/Header';
import UsernameBox from '../components/UsernameBox';
import { ProfileContext } from '../context/Profile';
import TYPOGRAPHY from '../constants/typography';
const Profile = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { username, faculty, department } = useContext(ProfileContext)

  useEffect(() => {
    console.log(username)
  })
  return (
    <View style={styles.homeContainer}>
      <Header type="inside" />
      <UsernameBox username={username} />
      <View style={styles.innerView}>
        <View>
          <Text style={styles.fieldText}>Fakülte</Text>
          <View style={styles.departmentArea}>
            <Text numberOfLines={2} style={styles.departmentInnerText}>{faculty}</Text>
          </View>
          <Text style={[styles.fieldText, { marginTop: 20 }]}>Bölüm</Text>
          <View style={styles.departmentArea}>
            <Text numberOfLines={2} style={styles.departmentInnerText}>{department}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={.7} onPress={() => { }}>
          <View style={[styles.startButton, { borderColor: '#EBEBEB' },
          ]}>
            <Text style={[styles.startText, { color: '#0AD4EE', }]}>Düzenle</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    /*  <View>
       <Text>Profile</Text>
       <TouchableOpacity onPress={() => changeTheme('light')}>
         <Text>Light Theme</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => changeTheme('dark')}>
         <Text>Dark Theme</Text>
       </TouchableOpacity>
     </View> */
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 40,
  },
  startButton: {
    borderRadius: 32,
    width: '50%',
    borderWidth: 1,
    alignSelf: 'center',
    shadowColor: '#0AD4EE',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.95,
    elevation: 5,
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
  startText: [
    TYPOGRAPHY.H4Regular,
    {
      alignSelf: 'center',
      marginVertical: 20
    }],
  departmentArea: {
    flexDirection: 'row',
    borderColor: "#EBEBEB",
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
      color: '#001A43',
      flex: 1,
      textAlign: 'center'
    }],
})

export default Profile;
