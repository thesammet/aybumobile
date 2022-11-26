import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@/screens/Home';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
