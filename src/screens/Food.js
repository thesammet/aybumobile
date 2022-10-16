import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { aybuUrl } from '../constants';
import cheerio from 'cheerio-without-node-native';
import moment from 'moment';

const Food = () => {
  const [dayAndMeal, setDayAndMeal] = useState([]);

  useEffect(() => {
    getFoodList();
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
    <ScrollView>
      <Text>{JSON.stringify(dayAndMeal, null, 2)}</Text>
    </ScrollView>
  );
};

export default Food;
