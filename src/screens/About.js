import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BasicHeader from '../components/BasicHeader';
import {strings} from '../constants/localization';
import AppText from '../components/AppText';
import {errorMessage} from '../utils/showToast';

const About = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <BasicHeader
        style={{backgroundColor: colors.welcomeBg}}
        navigation={navigation}
        text={strings.abouttheapp}
        textStyle={{fontWeight: 'bold', fontSize: 18}}
        isBack={true}
        type="postComments"
      />

      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>
        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 16,
            },
          ]}>
          {strings.welcomeaybu}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              marginBottom: 10,
            },
          ]}>
          {strings.welcomedesc}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              marginBottom: 30,
            },
          ]}>
          {strings.welcomedesc2}
        </AppText>
        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 20,
            },
          ]}>
          {strings.features}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 16,
            },
          ]}>
          {strings.dininginfo}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              marginBottom: 30,
            },
          ]}>
          {strings.diningdesc}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 16,
            },
          ]}>
          {strings.experiencesharing}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              marginBottom: 30,
            },
          ]}>
          {strings.experiencedesc}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 16,
            },
          ]}>
          {strings.schoolannouncements}
        </AppText>

        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
              marginBottom: 30,
            },
          ]}>
          {strings.announcementsdesc}
        </AppText>

        {/* <AppText style={styles.footerText}>
            Sizden duymak bizi daha iyi yapar. Gelişimimize katkı sağlamak için
            her zaman buradayız.
          </AppText> */}
      </ScrollView>

      <View>
        <AppText></AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    // marginBottom: 30,
  },
  contactsSection: {
    marginBottom: 30,
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactLink: {
    color: 'blue',
    marginBottom: 10,
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
  },
});

export default About;
