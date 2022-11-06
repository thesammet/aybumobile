import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, } from 'react-native';
import { getAcademic } from '../api/academic'
import { AuthContext } from '../context/Auth';
import { errorMessage } from '../utils/showToast'
import Pdf from 'react-native-pdf';
const Calendar = () => {
  const { token } = useContext(AuthContext)
  const [academicData, setAcademicData] = useState([])
  const [loading, setLoading] = useState(false)

  const getAcademicMethod = async () => {
    setLoading(true)
    let response = await getAcademic("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyODNkNGRjMjhjZDk0NTQyMWM0ZDgiLCJpYXQiOjE2Njc0MDA2NjB9.G3mV4IY6SXYWG2hbPNi_iu62j2zmVBHpnh1vL0TLxxk", "Bilgisayar Mühendisliği");
    console.log(response)
    if (response.error) {
    } else {
      setAcademicData(response.data)
    }
    setLoading(false)
  };

  useEffect(() => {
    getAcademicMethod()
  }, []);

  const source = { uri: `${academicData.url}`, cache: true };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
export default Calendar;