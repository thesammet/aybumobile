import React, {useState, createContext, useEffect} from 'react';
import {storage} from '../config/storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [usernameInit, setUsernameInit] = useState(null);
  const [isOnboarding, setIsOnboarding] = useState(null);

  useEffect(() => {
    onBoardingControl();
  }, []);

  useEffect(() => {
    tokenControl();
    usernameInitControl();
  }, [token, usernameInit]);

  const tokenControl = async () => {
    try {
      const token = storage.getString('token');
      if (token) {
        setToken(token);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const usernameInitControl = async () => {
    try {
      const usernameInit = storage.getString('usernameInit');
      if (usernameInit) {
        setUsernameInit(usernameInit);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const addToken = async value => {
    setToken(value);
    try {
      storage.set('token', value);
    } catch (error) {
      console.warn(error);
    }
  };

  const removeToken = async () => {
    setToken(null);
    try {
      storage.delete('token');
    } catch (error) {
      console.log(error);
    }
  };

  const addUsernameInit = async value => {
    setUsernameInit(value);
    try {
      storage.set('usernameInit', value);
    } catch (error) {
      console.warn(error);
    }
  };

  const removeUsernameInit = async () => {
    setUsernameInit(null);
    try {
      storage.delete('usernameInit');
    } catch (error) {
      console.log(error);
    }
  };

  const onBoardingControl = async () => {
    //storage.delete('onboarding');
    try {
      const onboarding = storage.getString('onboarding');
      console.log('onboarding', onboarding);
      if (onboarding === undefined) {
        setIsOnboarding(true);
      } else {
        setIsOnboarding(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const skipOnboarding = async () => {
    setIsOnboarding(false);
    try {
      storage.set('onboarding', 'false');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        addToken,
        removeToken,
        skipOnboarding,
        isOnboarding,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
