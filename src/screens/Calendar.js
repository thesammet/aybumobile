import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity
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
import { ArrowLeft, Profil } from '../components/icons'
import { handleEmail } from '../helpers/send-mail';
import Loading from '../components/Loading';

const Calendar = () => {
  const { token } = useContext(AuthContext);
  const { department } = useContext(ProfileContext);
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState(null)
  const { colors } = useTheme();
  const { theme } = useContext(ThemeContext);

  const getAcademicMethod = async () => {
    setLoading(true);
    let response = await getAcademic(token, department);
    if (response.error) {
      setAcademicData(null);
    } else {
      setAcademicData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAcademicMethod();
  }, []);

  return (
    <View style={[styles.container,
    {
      backgroundColor: academicData?.exam
        ? colors.background
        : colors.headerBg
    }]}>
      {!academicData ?
        <View style={styles.emptyView}>
          <View />
          <View>

            <Image
              source={require('@/assets/images/aybumobilelight.png')}
              style={[styles.logoView]}
            />

            <Text
              style={styles.emptyText}>
              {department} {strings.calendarString1}{'\n'}{strings.calendarString2}
            </Text>
          </View>
          <View style={styles.helpView}>
            <Profil width={24} height={24} />
            <View>
              <Text
                style={styles.helpAYBUText}>
                {strings.helpAYBU}
              </Text>
              <TouchableOpacity
                onPress={handleEmail}>
                <Text
                  style={styles.sendMailText}>
                  {strings.clickToSendMail}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :
        academicData?.exam
          ?
          !uri ?
            <View style={{ flex: 1 }}>
              <View style={styles.typeImageView}>
                <TouchableOpacity onPress={() => {
                  setUri(`data:application/pdf;base64,${academicData?.exam}`)
                }} activeOpacity={.8}>
                  <Image source={require('../assets/images/exam.png')} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.examScheduleText}>{strings.examSchedule}</Text>
              </View>
              {
                academicData?.content &&
                <View style={styles.typeImageView}>
                  <TouchableOpacity onPress={() => {
                    setUri(`data:application/pdf;base64,${academicData?.content}`)
                  }} activeOpacity={.8}>
                    <Image source={require('../assets/images/calendar.png')} style={styles.image} />
                  </TouchableOpacity>
                  <Text style={styles.syllabusText}>{strings.syllabus}</Text>
                </View>}
            </View>
            :
            <View>
              <TouchableOpacity onPress={() => { setUri(null) }} activeOpacity={.8} style={{ margin: 16 }}>
                <ArrowLeft width={24} height={24} />
              </TouchableOpacity>
              <Pdf
                source={{
                  uri
                }}
                style={styles.pdf}
              />
            </View>
          :
          <Pdf
            source={{ uri: `data:application/pdf;base64,${academicData.content}` }}
            style={styles.pdf}
          />
      }
      {loading && <Loading />}
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
  emptyText: {
    marginHorizontal: 48,
    textAlign: 'center',
    color: 'white',
    marginTop: 12,
  },
  sendMailText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
  syllabusText: {
    alignSelf: 'center',
    marginTop: 4,
    color: '#001A43',
    fontSize: 24
  },
  examScheduleText: {
    alignSelf: 'center',
    marginTop: 4,
    color: '#001A43',
    fontSize: 24
  },
  helpAYBUText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 8
  },
  helpView: {
    flexDirection: 'row',
    marginHorizontal: 36,
    marginBottom: 24,
  },
  typeImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoView: {
    marginTop: 16,
    alignSelf: 'center'
  },
  activityIndicatorView: {
    justifyContent: 'center',
    flex: 1
  },
  emptyView: {
    justifyContent: 'space-between',
    flex: 1
  }
});
export default Calendar;
