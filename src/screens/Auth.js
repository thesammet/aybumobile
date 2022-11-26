import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {register} from '../api/user';
import {AuthContext} from '../context/Auth';
import {ProfileContext} from '../context/Profile';
import {useTheme} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import TYPOGRAPHY from '../constants/typography';
import Header from '../components/Header';
import {ChevronDown, Check} from '../components/icons';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {sections} from '../assets/sources/sections';
import {errorMessage, successMessage} from '../utils/showToast';

const windowHeight = Dimensions.get('window').height;

export default function Auth() {
  const [username, setUsername] = useState('');
  const [currentDepartments, setCurrentDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [isValid, setValid] = useState(false);
  const [borderColor, setBorderColor] = useState('gray');

  const {addToken} = useContext(AuthContext);
  const {addUsername, addFaculty, addDepartment} = useContext(ProfileContext);

  const {colors} = useTheme();

  const bottomSheetFaculty = useRef();
  const bottomSheetDepartment = useRef();

  useEffect(() => {
    validMethod();
  }, [username, department, faculty]);

  const popSuccessMessage = () => {
    successMessage('Message 1', 'AYBÜ Mobil hesabınız başarıyla oluşturuldu.');
  };
  const popFaiLMessage = () => {
    errorMessage('Message 2', 'Giriş yapılamadı. Lütfen tekrar deneyiniz');
  };

  const validMethod = () => {
    username.length > 0 && department && faculty
      ? setValid(true)
      : setValid(false);
  };

  const registerToken = async deviceId => {
    let response = await register(deviceId, username, department, faculty);
    if (response.error) {
      //todo fail message
      popFaiLMessage();
    } else {
      addToken(response.token);
      addUsername(username);
      addFaculty(faculty);
      addDepartment(department);
      //todo success toast
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setFaculty(item.faculty);
        bottomSheetFaculty.current.close();
        setCurrentDepartments(item.departments);
        setDepartment(null);
      }}>
      <View style={styles.renderItem}>
        <Text
          style={[
            TYPOGRAPHY.H5Regular,
            {
              color: item.faculty == faculty ? '#001A43' : '#909090',
              margin: 10,
              marginRight: 20,
              flex: 1,
            },
          ]}>
          {item.faculty}
        </Text>
        <Check
          width={24}
          height={24}
          color={item.faculty == faculty ? '#0AD4EE' : '#EBEBEB'}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItemDepartment = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setDepartment(item.name);
        bottomSheetDepartment.current.close();
      }}>
      <View style={styles.renderItem}>
        <Text
          style={[
            TYPOGRAPHY.H5Regular,
            {
              color: item.name == department ? '#001A43' : '#909090',
              margin: 10,
              marginRight: 20,
              flex: 1,
            },
          ]}>
          {item.name}
        </Text>
        <Check
          width={24}
          height={24}
          color={item.name == department ? '#0AD4EE' : '#EBEBEB'}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[{backgroundColor: colors.welcomeBg}, styles.container]}>
      <Header type="outside" />
      <View style={styles.innerContainer}>
        <BottomSheet
          hasDraggableIcon={true}
          ref={bottomSheetFaculty}
          height={windowHeight - windowHeight / 6}
          radius={32}
          sheetBackgroundColor={'white'}
          backgroundColor={'transparent'}
          draggable={true}>
          <FlatList
            data={sections}
            renderItem={renderItem}
            keyExtractor={item => item.faculty}
          />
        </BottomSheet>
        <BottomSheet
          hasDraggableIcon={true}
          ref={bottomSheetDepartment}
          height={windowHeight - windowHeight / 6}
          radius={32}
          sheetBackgroundColor={'white'}
          backgroundColor={'transparent'}
          draggable={true}>
          <FlatList
            data={currentDepartments}
            renderItem={renderItemDepartment}
            keyExtractor={item => item.name}
          />
        </BottomSheet>
        <View style={styles.infoView}>
          <Text style={styles.fillTheGapsText}>Alanları doldurunuz.</Text>
          <Text style={styles.fieldText}>Kullanıcı Adı</Text>
          <TextInput
            style={[
              TYPOGRAPHY.H4Regular,
              styles.input,
              {borderColor: borderColor},
            ]}
            placeholder={'Kullanıcı adınız'}
            value={username}
            onChangeText={value => {
              setUsername(value);
            }}
            onFocus={() => setBorderColor('#00112b')}
            edit={true}
            text={username}
            textAlign="center"
          />

          <Text style={styles.fieldText}>Fakülte (Zorunlu) </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              bottomSheetFaculty.current.show();
            }}>
            <View style={styles.departmentArea}>
              <Text numberOfLines={2} style={styles.departmentInnerText}>
                {faculty ? faculty : 'Fakülte seçin'}
              </Text>
              <ChevronDown height={24} width={24} color={'#001A43'} />
            </View>
          </TouchableOpacity>

          <Text style={styles.fieldText}>Bölüm (Zorunlu)</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={faculty ? false : true}
            onPress={() => {
              bottomSheetDepartment.current.show();
            }}>
            <View style={styles.departmentArea}>
              <Text numberOfLines={2} style={styles.departmentInnerText}>
                {department ? department : 'Bölüm seçin'}
              </Text>
              <ChevronDown height={24} width={24} color={'#001A43'} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isValid ? false : true}
          onPress={() => {
            DeviceInfo.getUniqueId().then(uniqueId => {
              registerToken(uniqueId);
            });
          }}>
          <View
            style={[
              styles.startButton,
              {borderColor: isValid ? '#0AD4EE' : '#EBEBEB'},
              isValid && {
                //shadow
                shadowColor: '#0AD4EE',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3.95,
                elevation: 5,
                zIndex: 5,
              },
            ]}>
            <Text
              style={[
                styles.startText,
                {color: isValid ? '#0AD4EE' : '#CECECE'},
              ]}>
              Başla
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
    paddingVertical: 48,
  },
  infoView: {
    alignItems: 'center',
  },
  startButton: {
    borderRadius: 32,
    width: '70%',
    borderWidth: 1,
    alignSelf: 'center',
  },
  fieldText: [
    TYPOGRAPHY.H5Regular,
    {
      color: '#A0A0A0',
      marginTop: 20,
      marginBottom: 8,
    },
  ],
  startText: [
    TYPOGRAPHY.H4Regular,
    {
      alignSelf: 'center',
      marginVertical: 20,
    },
  ],
  fillTheGapsText: [
    TYPOGRAPHY.H3Bold,
    {
      color: '#001A43',
    },
  ],
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 32,
    paddingVertical: 20,
  },
  departmentArea: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 32,
    padding: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  departmentInnerText: [
    TYPOGRAPHY.H55Regular,
    {
      color: '#909090',
      flex: 1,
    },
  ],
  renderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 32,
    marginVertical: 4,
    alignItems: 'center',
  },
});
