import {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {useTheme} from '@react-navigation/native';
import {handleMeals} from '../helpers/meal-helper';
import ReactionBox from './ReactionBox';
import {getDayName, getMeaningfulDayNames} from '../helpers/day-helper';
import moment from 'moment';
import {strings} from '../constants/localization';

const MealBox = ({item, style, index, navigation, type = '', ...props}) => {
  const {colors} = useTheme();

  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    setMealList(handleMeals(item?.meal?.meal));
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={[
          styles.mealBoxContainer,
          style,
          {
            backgroundColor: colors.mealBackground,
            height: rh(240),
            marginBottom: 16,
          },
        ]}
        {...props}>
        <View
          style={[
            styles.mealBoxHead,
            {
              backgroundColor:
                type == 'trends'
                  ? index == 0
                    ? '#FFCA09'
                    : index == 1
                    ? '#505052'
                    : index == 2
                    ? '#838285'
                    : '#B6B5B8'
                  : item?.meal?.date == moment().format('DD.MM.YYYY')
                  ? colors.lightBlue
                  : colors.mealBoxItemTop,
            },
          ]}>
          <Text style={[styles.mealBoxHeadText, styles.mealBoxHeadDayText]}>
            {item?.meal?.date == moment().format('DD.MM.YYYY')
              ? strings.today
              : getMeaningfulDayNames(getDayName(item?.meal?.date))}
          </Text>
          <Text style={[styles.mealBoxHeadText, styles.mealBoxHeadDateText]}>
            {item?.meal?.date}
          </Text>
        </View>
        <View style={styles.mealBoxBottom}>
          {mealList.map((item, index) => (
            <View style={styles.mealBoxBottomItem} key={index}>
              <Text style={[styles.mealBoxBottomText, {color: colors.text}]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <ReactionBox
        navigation={navigation}
        item={item}
        toggleLikeMeal={likedItem => toggleLikeMeal(likedItem)}
        toggleDislikeMeal={disslikedItem => toggleDislikeMeal(disslikedItem)}
        type={type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mealBoxContainer: {
    width: '100%',
    marginHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
  },
  mealBoxHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  mealBoxHeadText: {
    color: '#fff',
    fontSize: 16,
  },
  mealBoxHeadDayText: {
    fontWeight: '500',
    lineHeight: 20,
  },
  mealBoxHeadDateText: {
    fontWeight: '400',
    lineHeight: 16,
  },
  mealBoxBottom: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
  mealBoxBottomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealBoxBottomText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default MealBox;
