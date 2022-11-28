import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Home from '@/screens/Home';
// import Food from '@/screens/Food';
import {tabHeight} from '../constants';
import Profile from '@/stacks/ProfileStack';
import {tabIconSize} from '@/constants';
import {useTheme} from '@react-navigation/native';
import TabBar from '../components/TabBar';
import Calendar from '../screens/Calendar';
import Obs from '../screens/Obs';
import HomeStack from '../stacks/HomeStack';
import Trends from '../screens/Trends';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      {/* <Tab.Screen name="Obs" component={Obs} /> */}
      <Tab.Screen name="Trends" component={Trends} />
      <Tab.Screen name="Syllabus" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>

    /*
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
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
              <Main width={tabIconSize} height={tabIconSize} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <Main width={tabIconSize} height={tabIconSize} color="black" />
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
        name="Meal"
        component={Meal}
        options={{
          title: 'Food',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Bakery width={tabIconSize} height={tabIconSize} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <Bakery
                  width={tabIconSize}
                  height={tabIconSize}
                  color="black"
                />
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
        name="Academix"
        component={Academic}
        options={{
          title: 'Academic Calendar',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Book width={tabIconSize} height={tabIconSize} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <Book width={tabIconSize} height={tabIconSize} color="black" />
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
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <User width={tabIconSize} height={tabIconSize} color="black" />
            ) : (
              <View style={{opacity: 0.5}}>
                <User width={tabIconSize} height={tabIconSize} color="black" />
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
    */
  );
};

export default Tabs;
