import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
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
import Header from '../components/Header';
import MealBox from '../components/MealBox';
import ReactionBox from '../components/ReactionBox';
import { Heart } from '../components/icons';
import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const Home = () => {
  const { token, addToken, removeToken } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const { colors } = useTheme();

  const scrollx = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // get meal data
    setMeals([
      {
        id: 1,
        name: 'Mercimek Çorba, Bulgur Pilav, Domates Salata, Üzüm Hoşafı',
      },
      {
        id: 2,
        name: 'Tarhana Çorba, Bulgur Pilav, Domates Salata, Üzüm Hoşafı',
      },
      {
        id: 3,
        name: 'Domates Çorba, Bulgur Pilav, Domates Salata, Üzüm Hoşafı',
      },
      {
        id: 4,
        name: 'Boş Çorba, Bulgur Pilav, Domates Salata, Üzüm Hoşafı',
      },
      {
        id: 5,
        name: 'Ev Yapımı Çorba, Bulgur Pilav, Domates Salata, Üzüm Hoşafı',
      },
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
        <Text style={[styles.mealListText, { color: colors.text }]}>
          Yemek Listesi
        </Text>

        <Animated.FlatList
          data={meals}
          keyExtractor={item => item.id}
          horizontal
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            { useNativeDriver: false },
          )}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({ item }) => {
            return (
              <View
                style={[styles.mealBoxContainer, { width: rw(264) }]}
                key={item.id}>
                <View style={styles.mealBoxHead}>
                  <Text>Today</Text>
                  <Text>24.10.2022</Text>
                </View>
                <View style={styles.mealBoxBottom}>
                  <View style={styles.mealBoxItem}>
                    <Text style={styles.mealBoxItemTitle}>
                      {item.name.split(',')}
                    </Text>
                    <TouchableOpacity onPress={() => likeMeal(item)}>
                      <Heart width="24" height="24" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <ReactionBox />
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

  //
  mealBoxContainer: {
    // alignItems: 'center',
    // padding: 20,
    borderWidth: 1,
    marginHorizontal: 0,
  },
  mealBoxHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealBoxBottom: {},
  mealBoxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealBoxItemTitle: {},
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
