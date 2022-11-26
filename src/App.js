import 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/context/Auth';
import Navigation from '@/navigation';
import { ThemeProvider } from '@/context/Theme';
import { ProfileProvider } from './context/Profile';

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
