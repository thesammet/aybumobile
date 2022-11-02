import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar, Meal, Profil, User} from './icons';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={[styles.tabContainer, {width: rw(344), height: rh(80)}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          // tab-button
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            {label === 'Home' && <Meal width="28" height="28" />}
            {label === 'Obs' && <Profil width="28" height="28" />}
            {label === 'Calendar' && <Calendar width="28" height="28" />}
            {label === 'Profile' && <User width="28" height="28" />}
            <Text
              style={[
                {color: isFocused ? '#000' : '#C5C8CD'},
                styles.buttonText,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 16,
    marginTop: 4,
  },
});

export default TabBar;
