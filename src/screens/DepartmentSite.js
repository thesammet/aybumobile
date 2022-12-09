import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { getAcademic } from '../api/academic';
import { AuthContext } from '../context/Auth';
import { ProfileContext } from '../context/Profile';
import { ThemeContext } from '@/context/Theme';
import { useTheme } from '@react-navigation/native';
import {
  responsiveHeight as rh,
} from '@/utils/responsive';
import { strings } from '../constants/localization';

const DepartmentSite = () => {
  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { department } = useContext(ProfileContext);
  const [academicData, setAcademicData] = useState([]);

  const getAcademicMethod = async () => {
    setIsLoading(true);
    let response = await getAcademic(token, department);
    if (response.error) {
      setAcademicData(null);
    } else {
      setAcademicData(response.data);
    }
    setIsLoading(false);
  };


  useEffect(() => {
    setIsLoading(true);
    getAcademicMethod();
  }, []);

  return (
    <SafeAreaView style={[styles.container,
    {
      backgroundColor: academicData?.announcement
        ? colors.background
        : colors.headerBg
    }]}>
      {
        isLoading
          ?
          <ActivityIndicator size="large" color="white" style={{ justifyContent: 'center', flex: 1 }} />

          : !academicData?.announcement ?
            <View style={styles.emptyView}>
              <View />
              <View>
                {theme === 'light' ? (
                  <Image
                    source={require('@/assets/images/aybumobilelight.png')}
                    style={[styles.logoView, { height: rh(48) }]}
                  />
                ) : (
                  <Image
                    source={require('@/assets/images/aybumobiledark.png')}
                    style={[styles.logoView, { height: rh(48) }]}
                  />
                )}
                <Text
                  style={styles.emptyText}>
                  {department} {strings.departmentSite1}{'\n'}{strings.calendarString2}
                </Text>
              </View>
            </View>
            :
            <WebView
              originWhitelist={['*']}
              source={{ uri: academicData?.announcement }}
              pullToRefreshEnabled={true}
              allowsBackForwardNavigationGestures={true}
              onLoadProgress={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                if (nativeEvent.progress === 1) {
                  setIsLoading(false);
                }
              }}
            />
      }
    </SafeAreaView>
  );
};

export default DepartmentSite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    justifyContent: 'center',
    flex: 1
  },
  logoView: {
    marginTop: 16,
    alignSelf: 'center'
  },
  emptyText: {
    marginHorizontal: 36,
    textAlign: 'center',
    color: 'white',
    marginTop: 12,
  }
});
