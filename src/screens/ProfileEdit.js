import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { updateProfile } from '../api/user';
import { AuthContext } from '../context/Auth';
import { ProfileContext } from '../context/Profile';
import { useTheme } from '@react-navigation/native';
import TYPOGRAPHY from '../constants/typography';
import Header from '../components/Header';
import { ChevronDown, Check } from '../components/icons';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { sections } from '../assets/sources/sections';
import { strings } from '../constants/localization';
import {
  errorMessage,
  successMessage
} from '../utils/showToast';

export default function ProfileEdit({ navigation }) {
  const { token } = useContext(AuthContext);
  const {
    username,
    faculty,
    department,
    addUsername,
    addFaculty,
    addDepartment,
  } = useContext(ProfileContext);
  const { colors } = useTheme();
  const bottomSheetfacultyVal = useRef();
  const bottomSheetdepartmentVal = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [usernameVal, setUsernameVal] = useState(username);
  const [currentdepartment, setCurrentdepartment] = useState();
  const [departmentVal, setDepartmentVal] = useState(department);
  const [facultyVal, setFacultyVal] = useState(faculty);
  const [isValid, setValid] = useState(false);
  const [borderColor, setBorderColor] = useState('gray');
  const [loading, setLoading] = useState();
  const validMethod = () => {
    usernameVal.length > 0 && departmentVal && facultyVal
      ? setValid(true)
      : setValid(false);
  };

  useEffect(() => {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].faculty == facultyVal) {
        setCurrentdepartment(sections[i].departments);
      }
    }
  });

  const updateProfileMethod = async deviceId => {
    setLoading(true);
    let response = await updateProfile(
      token,
      departmentVal,
      usernameVal,
      facultyVal,
    );
    if (response.error) {
      errorMessage(strings.error, strings.anErrorOccured);
    } else {
      addUsername(usernameVal);
      addFaculty(facultyVal);
      addDepartment(departmentVal);
      successMessage(strings.success, strings.successUpdate);
      navigation.goBack();
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setFacultyVal(item.faculty);
        bottomSheetfacultyVal.current.close();
        setCurrentdepartment(item.departments);
        setDepartmentVal(null);
      }}>
      <View style={styles.renderItem}>
        <Text
          style={[
            TYPOGRAPHY.H5Regular,
            {
              color: item.faculty == facultyVal ? '#001A43' : '#909090',
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
          color={item.faculty == facultyVal ? '#0AD4EE' : '#EBEBEB'}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItemdepartmentVal = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setDepartmentVal(item.name);
        bottomSheetdepartmentVal.current.close();
      }}>
      <View style={styles.renderItem}>
        <Text
          style={[
            TYPOGRAPHY.H5Regular,
            {
              color: item.name == departmentVal ? '#001A43' : '#909090',
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
          color={item.name == departmentVal ? '#0AD4EE' : '#EBEBEB'}
        />
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    validMethod();
  }, [usernameVal, departmentVal, facultyVal]);

  return (
    <View style={[{ backgroundColor: colors.background }, styles.container]}>
      <Header type="editProfile" navigation={navigation} />

      <View
        style={[styles.innerContainer, { backgroundColor: colors.background }]}>
        <BottomSheet
          hasDraggableIcon={true}
          ref={bottomSheetfacultyVal}
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
          ref={bottomSheetdepartmentVal}
          height={windowHeight - windowHeight / 6}
          radius={32}
          sheetBackgroundColor={'white'}
          backgroundColor={'transparent'}
          draggable={true}>
          <FlatList
            data={currentdepartment}
            renderItem={renderItemdepartmentVal}
            keyExtractor={item => item.name}
          />
        </BottomSheet>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text style={[styles.fillTheGapsText, { color: colors.text }]}>
                {strings.canEdit}
              </Text>
              <View style={styles.infoView}>
                <Text style={styles.fieldText}></Text>
                <TextInput
                  style={[
                    TYPOGRAPHY.H4Regular,
                    styles.input,
                    { borderColor: borderColor, color: '#909090' },
                  ]}
                  placeholder={strings.urUsername}
                  value={usernameVal}
                  onChangeText={value => {
                    setUsernameVal(value);
                  }}
                  onFocus={() => setBorderColor('#00112b')}
                  edit={true}
                  text={usernameVal}
                  textAlign="center"
                />

                <Text style={styles.fieldText}>{strings.mustFaculty}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    bottomSheetfacultyVal.current.show();
                    Keyboard.dismiss();
                  }}>
                  <View style={styles.departmentValArea}>
                    <Text
                      numberOfLines={2}
                      style={styles.departmentValInnerText}>
                      {facultyVal ? facultyVal : 'Fakülte seçin'}
                    </Text>
                    <ChevronDown
                      height={24}
                      width={24}
                      color={colors.dropdownChevronIcon}
                    />
                  </View>
                </TouchableOpacity>

                <Text style={styles.fieldText}>{strings.mustDepartment}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={facultyVal ? false : true}
                  onPress={() => {
                    bottomSheetdepartmentVal.current.show();
                    Keyboard.dismiss();
                  }}>
                  <View style={styles.departmentValArea}>
                    <Text
                      numberOfLines={2}
                      style={styles.departmentValInnerText}>
                      {departmentVal ? departmentVal : 'Bölüm seçin'}
                    </Text>
                    <ChevronDown
                      height={24}
                      width={24}
                      color={colors.dropdownChevronIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0AD4EE"
            style={{ marginTop: 24 }}
          />
        ) : (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.goBack();
              }}>
              <View
                style={[
                  styles.startButton,
                  { borderColor: '#EBEBEB', marginRight: 8 },
                ]}>
                <Text style={[styles.startText, { color: '#CECECE' }]}>
                  {strings.cancel}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={isValid ? false : true}
              onPress={() => {
                updateProfileMethod();
              }}>
              <View
                style={[
                  styles.startButton,
                  { borderColor: isValid ? '#0AD4EE' : '#EBEBEB' },
                ]}>
                <Text
                  style={[
                    styles.startText,
                    { color: isValid ? '#0AD4EE' : '#CECECE' },
                  ]}>
                  {strings.save}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  infoView: {
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  startButton: {
    borderRadius: 32,
    borderWidth: 1,
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
      marginHorizontal: 36,
      marginVertical: 15,
    },
  ],
  fillTheGapsText: [
    TYPOGRAPHY.H3Bold,
    {
      color: '#001A43',
      alignSelf: 'center',
    },
  ],
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 32,
    paddingVertical: 20,
  },
  departmentValArea: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 32,
    padding: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  departmentValInnerText: [
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 48,
    marginTop: 24,
  },
});
