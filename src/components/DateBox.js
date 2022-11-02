import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {ChevronLeft, ChevronRight} from './icons';
import {useTheme} from '@react-navigation/native';

const DateBox = () => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.dateBoxContainer,
        {width: rw(344), height: rh(56), marginTop: -rh(28)},
      ]}>
      <ChevronLeft width="28" height="28" style={{color: colors.text}} />
      <Text style={[styles.dateText, {color: colors.text}]}>
        24.10.2022 - 28.10.2022
      </Text>
      <ChevronRight width="28" height="28" style={{color: colors.text}} />
    </View>
  );
};

export default DateBox;

const styles = StyleSheet.create({
  dateBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 32,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    zIndex: 3,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
});
