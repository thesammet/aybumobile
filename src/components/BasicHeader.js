import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {getDay, getDayName} from '../helpers/day-helper';
import {ArrowLeft} from './icons';

const BasicHeader = ({navigation, info}) => {
  const {colors} = useTheme();

  const goToBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {height: rh(96), backgroundColor: colors.headerBg},
      ]}>
      <TouchableOpacity onPress={() => goToBack()} style={styles.backButton}>
        <ArrowLeft width="24" height="24" color="#fff" />
      </TouchableOpacity>
      <Text style={[styles.headerText, styles.dateText]}>
        {info?.meal?.date}
      </Text>
      <Text style={[styles.headerText, styles.dayText]}>
        {getDayName(info?.meal?.date)}
      </Text>
    </View>
  );
};

export default BasicHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    flex: 1,
    height: 40,
    justifyContent: 'flex-end',
  },
  headerText: {
    color: '#fff',
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    textAlign: 'center',
  },
  dayText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
