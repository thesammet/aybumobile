import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {Heart} from '../components/icons';
import {useTheme} from '@react-navigation/native';
import {handleMeals} from '../helpers/meal-helper';
import ReactionBox from './ReactionBox';
import {getDayName} from '../helpers/day-helper';

const MealBox = ({item, style, navigation, ...props}) => {
  const {colors} = useTheme();

  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    setMealList(handleMeals(item?.meal?.meal));
  }, []);

  // const mealItemHeartColor = mealItemIndex => {
  //   if (item.social.likes > 1) {
  //     return colors.heartRed;
  //   } else {
  //     return colors.heartGray;
  //   }
  // };

  const likeMeal = likedMeal => {
    console.log('liked Meal: ', likedMeal);
  };

  const disslikeMeal = disslikedMeal => {
    console.log('dissliked Meal: ', disslikedMeal);
  };

  const goToComments = goingItem => {
    console.log('goingItem: ', goingItem);
    navigation.navigate('Comments', {item: goingItem});
  };

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
        <View style={[styles.mealBoxHead, {backgroundColor: colors.lightBlue}]}>
          <Text style={[styles.mealBoxHeadText, styles.mealBoxHeadDayText]}>
            {getDayName(item?.meal?.date)}
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
              {/* 
            <TouchableOpacity onPress={() => likeMealItem(index)}>
              <Heart width="24" height="24" />
            </TouchableOpacity> 
            */}
            </View>
          ))}
        </View>
      </View>
      <ReactionBox
        item={item}
        likeMeal={likedItem => likeMeal(likedItem)}
        disslikeMeal={disslikedItem => disslikeMeal(disslikedItem)}
        goToComments={goingItem => goToComments(goingItem)}
      />
    </View>
  );
};

export default MealBox;

const styles = StyleSheet.create({
  mealBoxContainer: {
    width: '100%',
    flex: 1,
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
