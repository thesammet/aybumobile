import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
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
import {strings} from '../constants/localization';
import {errorMessage, successMessage} from '../utils/showToast';
import AppText from '../components/AppText';
import RNLocalize from 'react-native-localize';

const windowHeight = Dimensions.get('window').height;

export default function Auth() {
  const [username, setUsername] = useState('');
  const [currentDepartments, setCurrentDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [departmentRole, setDepartmentRole] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [isValid, setValid] = useState(false);
  const [borderColor, setBorderColor] = useState('gray');
  const [languageCode, setLanguageCode] = useState('en');

  const {addToken} = useContext(AuthContext);
  const {addUsername, addFaculty, addDepartment, addDepartmentCode} =
    useContext(ProfileContext);

  const {colors} = useTheme();

  const bottomSheetFaculty = useRef();
  const bottomSheetDepartment = useRef();
  const [loading, setLoading] = useState();

  useEffect(() => {
    validMethod();
  }, [username, department, faculty]);

  useEffect(() => {
    const localizeObj = RNLocalize.getLocales();
    setLanguageCode(localizeObj[0].languageCode);
  });

  const validMethod = () => {
    username.length > 0 && department && faculty
      ? setValid(true)
      : setValid(false);
  };

  const registerMethod = async deviceId => {
    setLoading(true);
    let response = await register(deviceId, username, department, faculty);

    if (response.error) {
      errorMessage(strings.error, strings.cantRegister);
    } else {
      addUsername(username);
      addFaculty(faculty);
      addDepartment(department);
      addDepartmentCode(departmentRole);
      addToken(response.token);

      // successMessage(strings.success, strings.registeredSuccess);
    }
    setLoading(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setFaculty(languageCode == 'tr' ? item.faculty.tr : item.faculty.en);
        bottomSheetFaculty.current.close();
        setCurrentDepartments(item.departments);
        setDepartment(null);
      }}>
      <View style={styles.renderItem}>
        <Text
          style={[
            TYPOGRAPHY.H5Regular,
            {
              color:
                languageCode == 'tr'
                  ? item.faculty.tr == faculty
                    ? '#001A43'
                    : '#909090'
                  : item.faculty.en == faculty
                  ? '#001A43'
                  : '#909090',
              margin: 10,
              marginRight: 20,
              flex: 1,
            },
          ]}>
          {languageCode == 'tr' ? item.faculty.tr : item.faculty.en}
        </Text>
        <Check
          width={24}
          height={24}
          color={
            languageCode == 'tr'
              ? item.faculty.tr == faculty
                ? '#0AD4EE'
                : '#EBEBEB'
              : item.faculty.en == faculty
              ? '#0AD4EE'
              : '#EBEBEB'
          }
        />
      </View>
    </TouchableOpacity>
  );

  const renderItemDepartment = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setDepartment(languageCode == 'tr' ? item.tr : item.en);
        setDepartmentRole(item.code);
        bottomSheetDepartment.current.close();
      }}>
      <View style={styles.renderItem}>
        <Text
          style={[
            TYPOGRAPHY.H5Regular,
            {
              color:
                languageCode == 'tr'
                  ? item.tr == department
                    ? '#001A43'
                    : '#909090'
                  : item.en == department
                  ? '#001A43'
                  : '#909090',
              margin: 10,
              marginRight: 20,
              flex: 1,
            },
          ]}>
          {languageCode == 'tr' ? item.tr : item.en}
        </Text>
        <Check
          width={24}
          height={24}
          color={
            languageCode == 'tr'
              ? item.tr == department
                ? '#0AD4EE'
                : '#EBEBEB'
              : item.en == department
              ? '#0AD4EE'
              : '#EBEBEB'
          }
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
            keyExtractor={item =>
              languageCode == 'tr' ? item.faculty.tr : item.faculty.en
            }
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
            keyExtractor={item => item.code}
          />
        </BottomSheet>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.infoView}>
              <AppText style={styles.fillTheGapsText}>
                {strings.fillTheGaps}
              </AppText>
              <AppText style={styles.fieldText}>{strings.username}</AppText>
              <TextInput
                style={[
                  TYPOGRAPHY.H4Regular,
                  styles.input,
                  {
                    borderColor: borderColor,
                    color: '#001A43',
                  },
                ]}
                placeholder={strings.urUsername}
                placeholderTextColor="grey"
                value={username}
                onChangeText={value => {
                  setUsername(value);
                }}
                onFocus={() => setBorderColor('#00112b')}
                edit={true}
                text={username}
              />

              <Text style={styles.fieldText}>{strings.mustFaculty}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  bottomSheetFaculty.current.show();
                  Keyboard.dismiss();
                }}>
                <View style={styles.departmentArea}>
                  <Text numberOfLines={1} style={styles.departmentInnerText}>
                    {faculty ? faculty : strings.selectFaculty}
                  </Text>
                  <ChevronDown height={24} width={24} color={'#001A43'} />
                </View>
              </TouchableOpacity>

              <Text style={styles.fieldText}>{strings.mustDepartment}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={faculty ? false : true}
                onPress={() => {
                  bottomSheetDepartment.current.show();
                  Keyboard.dismiss();
                }}>
                <View style={styles.departmentArea}>
                  <Text numberOfLines={1} style={styles.departmentInnerText}>
                    {department ? department : strings.selectDepartment}
                  </Text>
                  <ChevronDown height={24} width={24} color={'#001A43'} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0AD4EE"
            style={{marginBottom: 12}}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isValid ? false : true}
            onPress={() => {
              DeviceInfo.getUniqueId().then(uniqueId => {
                registerMethod(uniqueId);
              });
            }}>
            <View
              style={[
                styles.startButton,
                {borderColor: isValid ? '#0AD4EE' : '#EBEBEB'},
                Platform.OS != 'android' &&
                  isValid && {
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
                {strings.start}
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
    textAlign: 'center',
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
