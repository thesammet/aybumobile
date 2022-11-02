import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar, Meal, Profil, User} from './icons';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {useTheme} from '@react-navigation/native';

const TabBar = ({state, descriptors, navigation}) => {
  const {colors} = useTheme();

  const tabButtonDynamicStyle = focused => {
    return {
      backgroundColor: focused
        ? colors.tabBarButtonBackgroundActive
        : colors.tabBarButtonBackground,
    };
  };

  const tabButtonTextDynamicStyle = focused => {
    return {
      color: focused ? colors.tabBarTextActive : colors.tabBarText,
    };
  };

  const tabButtonDynamicIconStyle = focused => {
    console.log(
      focused ? colors.tabBarIconColorActive : colors.tabBarIconColor,
    );
    return {
      color: focused ? colors.tabBarIconColorActive : colors.tabBarIconColor,
    };
  };

  return (
    <View
      style={[
        styles.tabContainer,
        {backgroundColor: colors.background, width: rw(344), height: rh(80)},
      ]}>
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
            style={[
              styles.tabButton,
              {width: rw(60), height: rh(60)},
              tabButtonDynamicStyle(isFocused),
            ]}>
            {label === 'Home' && (
              <Meal
                width="28"
                height="28"
                style={tabButtonDynamicIconStyle(isFocused)}
              />
            )}
            {label === 'Obs' && (
              <Profil
                width="28"
                height="28"
                style={tabButtonDynamicIconStyle(isFocused)}
              />
            )}
            {label === 'Calendar' && (
              <Calendar
                width="28"
                height="28"
                style={tabButtonDynamicIconStyle(isFocused)}
              />
            )}
            {label === 'Profile' && (
              <User
                width="28"
                height="28"
                style={tabButtonDynamicIconStyle(isFocused)}
              />
            )}
            {!isFocused && (
              <Text
                style={[
                  styles.buttonText,
                  tabButtonTextDynamicStyle(isFocused),
                ]}>
                {label}
              </Text>
            )}
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
    justifyContent: 'space-around',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 40,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 4,
  },
});

export default TabBar;
