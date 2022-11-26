import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { getAcademic } from '../api/academic'
import { AuthContext } from '../context/Auth';
import { ProfileContext } from '../context/Profile';
import { errorMessage } from '../utils/showToast'
import Pdf from 'react-native-pdf';

const Calendar = () => {
  const { token } = useContext(AuthContext)
  const { department } = useContext(ProfileContext)
  const [academicData, setAcademicData] = useState([])
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState(null)
  const getAcademicMethod = async () => {
    setLoading(true)
    let response = await getAcademic(token, department);
    console.log(response)
    if (response.error) {
    } else {
      setAcademicData(response.data)
      setSource({ uri: `data:application/pdf;base64,${response.data.content}` })
    }
    setLoading(false)
  };

  useEffect(() => {
    getAcademicMethod()
  }, []);
  ;
  return (
    <View style={styles.container}>
      {loading ?
        <ActivityIndicator /> :
        <Pdf
          source={source}
          style={styles.pdf} />}
    </View>
  )
}


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
  }
});
export default Calendar;