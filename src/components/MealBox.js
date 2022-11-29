import {useState, useEffect, useContext} from 'react';
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
import {rating} from '../api/rating';
import {errorMessage} from '../utils/showToast';
import {AuthContext} from '../context/Auth';

const MealBox = ({item, style, navigation, type = '', ...props}) => {
  const {colors} = useTheme();
  const {token} = useContext(AuthContext);

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

  const getMeaningfulDayNames = dayName => {
    switch (dayName) {
      case 'Monday':
        return 'Pazartesi';
      case 'Tuesday':
        return 'Salı';
      case 'Wednesday':
        return 'Çarşamba';
      case 'Thursday':
        return 'Perşembe';
      case 'Friday':
        return 'Cuma';
      case 'Saturday':
        return 'Cumartesi';
      case 'Sunday':
        return 'Pazar';
      default:
        return dayName;
    }
  };

  const toggleLikeMeal = async itemLiked => {
    console.log('like item: ', i);
    let response = await rating(token, 'like', itemLiked?.meal?.id);
    if (response.error) {
      errorMessage('Bir hata oluştu');
    } else {
      console.log('like response: ', response);
    }
  };

  const toggleDislikeMeal = async itemDisliked => {
    console.log('dislike item: ', i);
    let response = await rating(token, 'dislike', itemDisliked?.meal?.id);
    if (response.error) {
      errorMessage('Bir hata oluştu');
    } else {
      console.log('dislike response: ', response);
    }
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
            {getMeaningfulDayNames(getDayName(item?.meal?.date))}
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
        navigation={navigation}
        item={item}
        toggleLikeMeal={likedItem => toggleLikeMeal(likedItem)}
        toggleDislikeMeal={disslikedItem => toggleDislikeMeal(disslikedItem)}
        type={type}
      />
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
