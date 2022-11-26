import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {getAcademic} from '../api/academic';
import {AuthContext} from '../context/Auth';
import {ProfileContext} from '../context/Profile';
import {ThemeContext} from '@/context/Theme';
import Pdf from 'react-native-pdf';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
const Calendar = () => {
  const {token} = useContext(AuthContext);
  const {department} = useContext(ProfileContext);
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);
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
    <View style={[styles.container, {backgroundColor: colors.headerBg}]}>
      {loading ? (
        <ActivityIndicator />
      ) : academicData == undefined ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          {theme === 'light' ? (
            <Image
              source={require('@/assets/images/aybumobilelight.png')}
              style={{marginTop: 16, height: rh(48), alignSelf: 'center'}}
            />
          ) : (
            <Image
              source={require('@/assets/images/aybumobiledark.png')}
              style={{marginTop: 16, height: rh(48), alignSelf: 'center'}}
            />
          )}
          <Text
            style={{
              marginHorizontal: 36,
              textAlign: 'center',
              color: 'white',
              marginTop: 12,
            }}>
            {department} fakültesinin programı bulunamadı.{'\n'}En kısa zamanda
            eklenecektir.
          </Text>
        </View>
      ) : (
        <Pdf
          source={{uri: `data:application/pdf;base64,${academicData.content}`}}
          style={styles.pdf}
        />
      )}
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
});
export default Calendar;
