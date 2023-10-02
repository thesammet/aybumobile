import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {getDay, getDayName, getMeaningfulDayNames} from '../helpers/day-helper';
import {ArrowLeft} from './icons';
import AyButton from './AyButton';
import AppText from './AppText';
import {Info} from '../components/icons';
import {strings} from '../constants/localization';

const DepartmentHeader = ({
  navigation,
  style,
  activeButton,
  pressGeneral = () => {},
  pressDepartment = () => {},
  pressInfo = () => {},
  ...props
}) => {
  const {colors} = useTheme();

  const isActiveStyle = type => {
    if (type === activeButton) {
      return {
        backgroundColor: '#001A43',
        borderColor: '#001A43',
      };
    } else {
      return {
        backgroundColor: '#fff',
        borderColor: '#001A43',
      };
    }
  };

  const isActiveTextStyle = type => {
    if (type === activeButton) {
      return {
        color: '#fff',
        fontWeight: 'bold',
      };
    } else {
      return {
        color: '#001A43',
      };
    }
  };

  return (
    <View
      style={[
        styles.container,
        {height: rh(96), backgroundColor: colors.headerBg},

        style,
      ]}
      {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[styles.button, styles.departmentButton, isActiveStyle(1)]}
          onPress={() => {
            pressDepartment();
          }}>
          <AppText style={[styles.text, isActiveTextStyle(1)]}>
            {strings.department}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.generalButton, isActiveStyle(2)]}
          onPress={() => {
            pressGeneral();
          }}>
          <AppText style={[styles.text, isActiveTextStyle(2)]}>
            {strings.general}
          </AppText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          pressInfo();
        }}>
        <Info width="26" height="26" color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default DepartmentHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    width: 100,
    paddingVertical: 6,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalButton: {
    marginLeft: 10,
  },
  departmentButton: {},
});
