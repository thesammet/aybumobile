import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import { ChevronLeft, ChevronRight } from './icons';
import { useTheme } from '@react-navigation/native';
import moment from 'moment'
import { modifyDate } from '../helpers/day-helper'
const DateBox = ({ mealLastIndex, firstDate, lastDate }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.dateBoxContainer,
        { width: rw(344), height: rh(56), marginTop: -rh(28), backgroundColor: colors.boxBg },
      ]}>
      <Text style={[styles.dateText, { color: colors.dateBoxElement }]}>
        {mealLastIndex == null ? "..." :
          (moment(new Date(modifyDate(firstDate))).format('DD.MM.YYYY')
            + " - "
            + moment(new Date(modifyDate(lastDate))).format('DD.MM.YYYY'))}
      </Text>
    </View>
  );
};

export default DateBox;

const styles = StyleSheet.create({
  dateBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
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
