import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {Heart} from '../components/icons';
import {useTheme} from '@react-navigation/native';
import {handleMeals} from '../helpers/meal-helper';

const MealBox = ({item, likeMeal, style, ...props}) => {
  const {colors} = useTheme();

  const [meal, setMeal] = useState([]);

  useEffect(() => {
    setMeal(handleMeals(item));
  }, []);

  const likeMealItem = mealItemIndex => {
    // api post
  };

  // const mealItemHeartColor = mealItemIndex => {
  //   if (item.social.likes > 1) {
  //     return colors.heartRed;
  //   } else {
  //     return colors.heartGray;
  //   }
  // };

  return (
    <View
      style={[
        styles.mealBoxContainer,
        style,
        {backgroundColor: colors.mealBackground},
      ]}
      {...props}>
      <View style={[styles.mealBoxHead, {backgroundColor: colors.lightBlue}]}>
        <Text style={[styles.mealBoxHeadText, styles.mealBoxHeadDayText]}>
          Bugün
        </Text>
        <Text style={[styles.mealBoxHeadText, styles.mealBoxHeadDateText]}>
          24.10.2022
        </Text>
      </View>
      <View style={styles.mealBoxBottom}>
        {meal.map((item, index) => (
          <View style={styles.mealBoxBottomItem} key={index}>
            <Text
              key={index}
              style={[styles.mealBoxBottomText, {color: colors.text}]}>
              {item}
            </Text>
            <TouchableOpacity onPress={() => likeMealItem(index)}>
              <Heart width="24" height="24" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MealBox;

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
    marginBottom: 32,
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
  },
  mealBoxBottomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealBoxBottomText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
  },
});
