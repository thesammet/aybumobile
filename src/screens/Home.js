import {View, Text, Touchable} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  errorMessage,
  infoMessage,
  successMessage,
  warningMessage,
} from '../utils/showToast';
import {AuthContext} from '../context/Auth';

const Home = () => {
  const {token, addToken, removeToken} = useContext(AuthContext);

  const popMessage = () => {
    warningMessage('Message 1', 'This is a message');
  };

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => popMessage()}>
        <Text>Popup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('token: ', token)}>
        <Text>Get Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addToken('my token')}>
        <Text>Add Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeToken()}>
        <Text>Delete Storage</Text>
      </TouchableOpacity>
    </View>
  );
};

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
