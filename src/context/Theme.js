import React, {useState, createContext, useEffect} from 'react';
import {storage} from '../config/storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    themeControl();
  }, []);

  const themeControl = async () => {
    try {
      let theme = storage.getString('theme');
      if (theme) {
        setTheme(theme);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const changeTheme = async value => {
    setTheme(value);
    try {
      storage.set('theme', value);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
