import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {getDay, getDayName, getMeaningfulDayNames} from '../helpers/day-helper';
import {ArrowLeft} from './icons';
import AyButton from './AyButton';

const BasicHeader = ({
  navigation,
  text,
  type = '',
  isBack = true,
  style,
  textStyle,
  ...props
}) => {
  const {colors} = useTheme();

  const goToBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {height: rh(96), backgroundColor: colors.headerBg},
        style,
      ]}
      {...props}>
      {isBack && (
        <AyButton pressedButton={goToBack} style={styles.backButton}>
          <ArrowLeft width="24" height="24" color="#fff" />
        </AyButton>
      )}

      <Text
        style={[styles.headerText, styles.dateText, textStyle]}
        numberOfLines={1}>
        {text}
      </Text>
      {type === 'isThree' && (
        <Text style={[styles.headerText, styles.dayText]}>
          {getMeaningfulDayNames(getDayName(text))}
        </Text>
      )}
      {type === 'postComments' && <View style={{flex: 1}} />}
    </View>
  );
};

export default BasicHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    width: 180,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dayText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
