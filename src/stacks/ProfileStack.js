import React, {useContext} from 'react';
import Profile from '../screens/Profile';
import ProfileEdit from '../screens/ProfileEdit';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <>
      {/* //todo: toast message config */}
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};
export default HomeStack;
