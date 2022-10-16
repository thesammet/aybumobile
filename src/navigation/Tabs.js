import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {Setting, Fav, Globe} from '../components/icons';
import Home from '@/screens/Home';
import Food from '@/screens/Food';
import Settings from '@/screens/Settings';
import {COLORS} from '@/utils/colors';
import {tabHeight} from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: tabHeight,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 1,
        },
        tabBarLabel: () => {
          return null;
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Globe width={32} height={32} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <Globe width={32} height={32} color="black" />
              </View>
            );
          },
          tabBarActiveTintColor: '#00BC6B',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <Tab.Screen
        name="Food"
        component={Food}
        options={{
          title: 'Food',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Fav width={32} height={32} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <Fav width={32} height={32} color="black" />
              </View>
            );
          },
          tabBarActiveTintColor: '#00BC6B',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Setting width={32} height={32} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <Setting width={32} height={32} color="black" />
              </View>
            );
          },
          tabBarActiveTintColor: '#00BC6B',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
