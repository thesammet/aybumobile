import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getAcademic } from '../api/academic';
import { AuthContext } from '../context/Auth';
import { ProfileContext } from '../context/Profile';
import { ThemeContext } from '@/context/Theme';
import Pdf from 'react-native-pdf';
import {
  responsiveHeight as rh,
} from '@/utils/responsive';
import { strings } from '../constants/localization';
import { ExamIcon, Exam, ArrowLeft } from '../components/icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Calendar = () => {
  const { token } = useContext(AuthContext);
  const { department } = useContext(ProfileContext);
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null)
  const { colors } = useTheme();
  const { theme } = useContext(ThemeContext);

  const getAcademicMethod = async () => {
    setLoading(true);
    let response = await getAcademic(token, department);
    if (response.error) {
      setAcademicData(null);
    } else {
      console.log(response)
      setAcademicData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAcademicMethod();
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: academicData.exam !== null ? colors.background : colors.headerBg }]}>
      {loading
        ? <ActivityIndicator size="large" color="black" style={{ justifyContent: 'center', flex: 1 }} />
        : academicData == undefined ?
          <View style={{ justifyContent: 'center', flex: 1 }}>
            {theme === 'light' ? (
              <Image
                source={require('@/assets/images/aybumobilelight.png')}
                style={{ marginTop: 16, height: rh(48), alignSelf: 'center' }}
              />
            ) : (
              <Image
                source={require('@/assets/images/aybumobiledark.png')}
                style={{ marginTop: 16, height: rh(48), alignSelf: 'center' }}
              />
            )}
            <Text
              style={{
                marginHorizontal: 36,
                textAlign: 'center',
                color: 'white',
                marginTop: 12,
              }}>
              {department} {strings.calendarString1}{'\n'}{strings.calendarString2}
            </Text>
          </View>
          :
          academicData.exam !== null
            ?
            type == null ?
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { setType(0) }} activeOpacity={.8}>
                    <Image source={require('../assets/images/exam.png')} style={styles.image} />
                  </TouchableOpacity>
                  <Text style={{
                    alignSelf: 'center',
                    marginTop: 4,
                    color: '#001A43',
                    fontSize: 24
                  }}>{strings.examSchedule}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { setType(1) }} activeOpacity={.8}>
                    <Image source={require('../assets/images/calendar.png')} style={styles.image} />
                  </TouchableOpacity>
                  <Text style={{
                    alignSelf: 'center',
                    marginTop: 4,
                    color: '#001A43',
                    fontSize: 24
                  }}>{strings.syllabus}</Text>
                </View>
              </View>
              :
              <View>
                <TouchableOpacity onPress={() => { setType(null) }} activeOpacity={.8} style={{ margin: 16 }}>
                  <ArrowLeft width={24} height={24} />
                </TouchableOpacity>
                <Pdf
                  source={{ uri: `data:application/pdf;base64,${academicData.content}` }}
                  style={styles.pdf}
                />
              </View>
            :
            <Pdf
              source={{ uri: `data:application/pdf;base64,${type == 0 ? academicData.exam : academicData.content}` }}
              style={styles.pdf}
            />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    width: 100,
    height: 100,
  },
});
export default Calendar;
