import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  errorMessage,
  infoMessage,
  successMessage,
  warningMessage,
} from '../utils/showToast';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import { AuthContext } from '../context/Auth';
import DateBox from '@/components/DateBox';
import Header from '@/components/Header';
import MealBox from '@/components/MealBox';
import ReactionBox from '@/components/ReactionBox';
import { useTheme } from '@react-navigation/native';
import { getMonthlyFood } from '../api/food';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('screen');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.74 : width * 0.76;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Home = ({ navigation }) => {
  const { token, addToken, removeToken } = useContext(AuthContext);
  const { colors } = useTheme();
  const scrollx = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getFoodList();
  }, []);

  const getFoodList = async () => {
    setLoading(true);
    try {
      let response = await getMonthlyFood(token);
      if (response.error) {
        errorMessage('Bir hata oluştu');
      } else {
        console.log('ass: ', response?.data);
        let dataArr = response?.data;
        dataArr.unshift({ meal: { id: '231243' }, key: 'left-spacer' });
        dataArr.push({ meal: { id: '231423' }, key: 'right-spacer' });

        setMeals(dataArr);
      }
    } catch (error) {
      errorMessage('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const popMessage = () => {
    warningMessage('Message 1', 'This is a message');
  };

  return (
    <View style={styles.homeContainer}>
      <Header type="inside" />
      <DateBox />
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.homeInsideContainer}>
            <Text style={[styles.mealListText, { color: colors.text }]}>
              Yemek Listesi
            </Text>

            <Animated.FlatList
              data={meals}
              keyExtractor={item => item?.meal?.id}
              horizontal
              snapToInterval={ITEM_SIZE} // rw(264)
              decelerationRate={0}
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollx } } }],
                { useNativeDriver: false },
              )}
              scrollEventThrottle={16}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                if (!item.meal || !item.social) {
                  return (
                    <View key={item?.key} style={{ width: EMPTY_ITEM_SIZE }} />
                  );
                }

                const inputRange = [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                ];

                const translateY = scrollx.interpolate({
                  inputRange,
                  outputRange: [0, -16, 0],
                });

                return (
                  <View
                    style={[styles.mealOutsideContainer, { width: ITEM_SIZE }]}
                    key={item.meal.id}>
                    <Animated.View
                      style={{
                        transform: [{ translateY }],
                        marginHorizontal: SPACING,
                        padding: SPACING * 2,
                        borderRadius: 34,
                        width: '100%',
                      }}>
                      <MealBox
                        key={item?.meal?.id}
                        item={item}
                        style={styles.mealBox}
                        navigation={navigation}
                        type="home"
                      />
                    </Animated.View>
                  </View>
                );
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeInsideContainer: {
    marginTop: 36,
  },
  mealListText: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
  },
  flatListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealOutsideContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealBox: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 32,
    marginBottom: 16,
  },
});

export default Home;

/*

import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {animationConfigsSpring, aybuUrl} from '../constants';
import cheerio from 'cheerio-without-node-native';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';

const Food = () => {
  const [dayAndMeal, setDayAndMeal] = useState([]);

  useEffect(() => {
    getFoodList();
  }, []);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const getFoodList = async () => {
    let response = await fetch(aybuUrl);
    let htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    let dayAndFoodList = []; // Can't distinguish between meals and dates because they are both in strong tag. Both are coming.
    let dayList = [];
    let foodList = [];

    // Get all strong tags
    $('.alert')
      .find('strong')
      .each((i, element) => {
        let food = $(element)
          .text()
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s+/g, ' ')
          .trim();
        dayAndFoodList.push(food);
      });

    // Get all dates
    dayAndFoodList.forEach((element, index) => {
      if (moment(element, 'DD.MM.YYYY', true).isValid()) {
        dayList.push(element);
      }
    });

    // Get all meals
    $('.alert')
      .find('ul')
      .each((i, element) => {
        let food = $(element)
          .text()
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s+/g, ' ')
          .trim();
        foodList.push(food);
      });

    // combine dayList and foodList
    let foodListWithDay = [];
    dayList.forEach((element, index) => {
      foodListWithDay.push({
        day: element,
        meal: foodList[index],
      });
    });

    setDayAndMeal(foodListWithDay);

    console.log(foodListWithDay);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        detached={true}
        animationConfigs={animationConfigsSpring}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Food;

*/
