import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '@/context/Theme';
import TYPOGRAPHY from '../constants/typography';
import { ArrowLeft } from '../components/icons/';
const Header = ({ type = 'inside', navigation }) => {
  const { colors } = useTheme();
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: type == "outside" ? "#001A43" : colors.headerBg,
          height:
            type === 'outside'
              ? rh(100)
              : type == 'editProfile'
                ? rh(100)
                : rh(136),
        },
      ]}>
      {type === 'inside' &&
        (theme === 'light' ? (
          <Image
            source={require('@/assets/images/aybumobilelight.png')}
            style={{ marginTop: 16, width: rw(176), height: rh(48) }}
          />
        ) : (
          <Image
            source={require('@/assets/images/aybumobiledark.png')}
            style={{ marginTop: 16, width: rw(176), height: rh(48) }}
          />
        ))}
      {type === 'outside' && (
        <Text style={[TYPOGRAPHY.H1Semibold, { color: '#0AD4EE' }]}>
          Hoşgeldiniz
        </Text>
      )}
      {type === 'editProfile' && (
        <View style={styles.editProfileView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeft width={24} height={24} color={'#fff'}></ArrowLeft>
          </TouchableOpacity>
          <Text
            style={[TYPOGRAPHY.H2Semibold, { color: 'white', marginLeft: 8 }]}>
            Profil Düzenle
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    elevation: -1,
  },
  editProfileView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Header;
