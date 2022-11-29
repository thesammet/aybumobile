import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Platform,
  Dimensions,
} from 'react-native';
import MealBox from './MealBox';
import uuid from 'react-native-uuid';
import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.74 : width * 0.76;

const TrendsBox = ({title, data, style, navigation, ...props}) => {
  const {colors} = useTheme();

  useEffect(() => {
    console.log('data: ', data);
  }, []);

  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        key={item => item.id}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        renderItem={({item}) => (
          <View
            style={{
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MealBox
              key={uuid.v4()}
              item={item}
              navigation={navigation}
              style={[styles.mealBox, {width: ITEM_SIZE}]}
              type="trends"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  mealBox: {
    flex: 1,
  },
});

export default TrendsBox;
