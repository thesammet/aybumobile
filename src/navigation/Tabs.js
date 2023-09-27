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
import DepartmentSite from '../screens/DepartmentSite';
import HomeStack from '../stacks/HomeStack';
import Trends from '../screens/Trends';
import Admission from '../screens/Admissions';
import Admissions from '../screens/Admissions';
import AdmissionStack from '../stacks/AdmissionStack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Trends" component={Trends} />
      <Tab.Screen name="Admissions" component={AdmissionStack} />
      {/* <Tab.Screen name="Syllabus" component={Calendar} /> */}
      <Tab.Screen name="DepartmentSite" component={DepartmentSite} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
