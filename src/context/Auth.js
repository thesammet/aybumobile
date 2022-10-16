import React, {useState, createContext, useEffect} from 'react';
import {storage} from '../config/storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    tokenControl();
  }, [token]);

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

  return (
    <AuthContext.Provider
      value={{
        token,
        addToken,
        removeToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
