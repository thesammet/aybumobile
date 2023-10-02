import {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {getAcademic} from '../api/academic';
import {AuthContext} from '../context/Auth';
import {ProfileContext} from '../context/Profile';
import {ThemeContext} from '@/context/Theme';
import {useTheme} from '@react-navigation/native';
import {strings} from '../constants/localization';
import DepartmentHeader from '../components/DepartmentHeader';
import AppText from '../components/AppText';
import {Close} from '../components/icons';

const DepartmentSite = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const {colors} = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const {department, departmentCode} = useContext(ProfileContext);
  const [academicData, setAcademicData] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    console.log('activeButton: ', activeButton);
  }, [activeButton]);
  console.log(academicData?.announcement);

  const getAcademicMethod = async () => {
    setIsLoading(true);
    let response = await getAcademic(token, departmentCode);
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

  const pressDepartment = () => {
    setActiveButton(1);
  };

  const pressGeneral = () => {
    setActiveButton(2);
  };

  const pressInfo = () => {
    setInfoModal(!infoModal);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: academicData?.announcement
            ? colors.background
            : colors.headerBg,
        },
      ]}>
      <DepartmentHeader
        navigation={navigation}
        style={{backgroundColor: '#0AD4EE'}}
        activeButton={activeButton}
        pressGeneral={() => {
          pressGeneral();
        }}
        pressDepartment={() => {
          pressDepartment();
        }}
        pressInfo={() => {
          pressInfo();
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModal}
        onRequestClose={() => {
          setInfoModal(false);
        }}>
        <View style={styles.centeredModalView}>
          <View style={[styles.modalView]}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 12,
                top: 12,
              }}
              onPress={() => setInfoModal(false)}>
              <Close width="24" height="24" color="#000" />
            </TouchableOpacity>
            <View style={{paddingTop: 24}}>
              <AppText style={{marginBottom: 8}}>{strings.infoDesc2}</AppText>

              <View
                style={{
                  height: 1,
                  backgroundColor: '#ddd',
                  marginTop: 6,
                  marginBottom: 10,
                }}
              />
              <AppText>{strings.infoDesc}</AppText>
            </View>
          </View>
        </View>
      </Modal>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{justifyContent: 'center', flex: 1}}
        />
      ) : !academicData?.announcement ? (
        <View style={styles.emptyView}>
          <View />
          <View>
            <Image
              source={require('@/assets/images/aybumobilelight.png')}
              style={[styles.logoView]}
            />

            <Text style={styles.emptyText}>
              {department} {strings.departmentSite1}
              {'\n'}
              {strings.calendarString2}
            </Text>
          </View>
        </View>
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{
            uri:
              activeButton == 1
                ? academicData?.announcement
                : 'https://aybu.edu.tr/',
          }}
          pullToRefreshEnabled={true}
          allowsBackForwardNavigationGestures={true}
          onLoadProgress={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            if (nativeEvent.progress === 1) {
              setIsLoading(false);
            }
          }}
        />
      )}
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
    flex: 1,
  },
  logoView: {
    marginTop: 16,
    alignSelf: 'center',
  },
  emptyText: {
    marginHorizontal: 36,
    textAlign: 'center',
    color: 'white',
    marginTop: 12,
  },

  // modal

  //modal
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  modalCloseContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 15,
    right: 14,
  },
  modalHead: {
    justifyContent: 'center',
    marginTop: 24,
  },
  modalHeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f20000',
  },
  modalBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modalBottomText: {
    marginTop: 12,
    lineHeight: 20,
    color: '#171717',
  },
});
