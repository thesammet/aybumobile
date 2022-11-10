import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
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
import {AuthContext} from '../context/Auth';
import DateBox from '@/components/DateBox';
import Header from '../components/Header';
import MealBox from '../components/MealBox';
import ReactionBox from '../components/ReactionBox';

import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Home = () => {
  const {token, addToken, removeToken} = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const {colors} = useTheme();

  const scrollx = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // get meal data
    setMeals([
      {key: 'left-spacer'},
      {
        meal: {
          id: '636281211fd7abf23bafbb2a',
          meal: ', Ezogelin Çorba, Tavuk Şinitzel, Peynirli Erişte, Ayran,',
          date: '31.10.2022',
          commentCount: 2,
        },
        social: {
          likes: 1,
          dislikes: 1,
        },
      },
      {
        meal: {
          id: '636281211fd7abf23bafbb2c',
          meal: ', Ezogelin Çorba, Tavuk Şinitzel, Peynirli Erişte, Ayran,',
          date: '31.10.2022',
          commentCount: 2,
        },
        social: {
          likes: 1,
          dislikes: 1,
        },
      },
      {
        meal: {
          id: '636281211fd7abf23bafbb30',
          meal: ', Ezogelin Çorba, Tavuk Şinitzel, Peynirli Erişte, Ayran,',
          date: '31.10.2022',
          commentCount: 2,
        },
        social: {
          likes: 1,
          dislikes: 1,
        },
      },
      {
        meal: {
          id: '636281211fd7abf23bafbb26',
          meal: ', Ezogelin Çorba, Tavuk Şinitzel, Peynirli Erişte, Ayran,',
          date: '31.10.2022',
          commentCount: 2,
        },
        social: {
          likes: 1,
          dislikes: 1,
        },
      },
      {
        meal: {
          id: '636281211fd7abf23bafbb32',
          meal: ', Ezogelin Çorba, Tavuk Şinitzel, Peynirli Erişte, Ayran,',
          date: '31.10.2022',
          commentCount: 2,
        },
        social: {
          likes: 1,
          dislikes: 1,
        },
      },
      {key: 'right-spacer'},
    ]);
  }, []);

  const popMessage = () => {
    warningMessage('Message 1', 'This is a message');
  };

  const likeMeal = item => {
    console.log('like item: ', item);
  };

  return (
    <View style={styles.homeContainer}>
      <Header type="inside" />
      <DateBox />
      <View style={styles.homeInsideContainer}>
        <Text style={[styles.mealListText, {color: colors.text}]}>
          Yemek Listesi
        </Text>

        <Animated.FlatList
          data={meals}
          keyExtractor={item => item?.meal?.id}
          horizontal
          snapToInterval={rw(264)}
          decelerationRate={0}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            if (!item.meal || !item.social) {
              return <View style={{width: (width - rw(264)) / 2}} />;
            }

            const inputRange = [
              (index - 2) * rw(264),
              (index - 1) * rw(264),
              index * rw(264),
            ];
            const translateY = scrollx.interpolate({
              inputRange,
              outputRange: [0, -16, 0],
            });
            return (
              <View style={[styles.mealOutsideContainer, {width: rw(264)}]}>
                <Animated.View
                  style={{
                    transform: [{translateY}],
                    marginHorizontal: 6,
                    padding: rw(8),
                    borderRadius: 34,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <MealBox
                    key={item?.meal?.id}
                    item={item}
                    style={styles.mealBox}
                  />
                  <ReactionBox item={item} />
                </Animated.View>
              </View>
            );
          }}
        />
      </View>
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
