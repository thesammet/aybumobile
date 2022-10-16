import {View, Text, Touchable} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  errorMessage,
  infoMessage,
  successMessage,
  warningMessage,
} from '../utils/showToast';
import {AuthContext} from '../context/Auth';

const Home = () => {
  const {token, addToken, removeToken} = useContext(AuthContext);

  const popMessage = () => {
    warningMessage('Message 1', 'This is a message');
  };

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => popMessage()}>
        <Text>Popup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('token: ', token)}>
        <Text>Get Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addToken('my token')}>
        <Text>Add Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeToken()}>
        <Text>Delete Storage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
