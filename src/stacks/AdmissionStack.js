import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@/screens/Home';
import Comments from '../screens/Comments';
import Admissions from '../screens/Admissions';
import AdmissionComments from '../screens/AdmissionComments';

const Stack = createNativeStackNavigator();

const AdmissionStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admission"
        component={Admissions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdmissionComments"
        component={AdmissionComments}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AdmissionStack;
