import React, {useContext} from 'react';
import Profile from '../screens/Profile';
import ProfileEdit from '../screens/ProfileEdit';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contact from '../screens/Contact';

const Stack = createNativeStackNavigator();

const ProfileStack = ({navigation}) => {
  return (
    <>
      {/* //todo: toast message config */}
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};
export default ProfileStack;
