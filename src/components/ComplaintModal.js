import {useContext, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {strings} from '../constants/localization';
import AppText from './AppText';
import {Close} from '../components/icons';
import {Dropdown} from 'react-native-element-dropdown';
import {AuthContext} from '../context/Auth';
import {errorMessage} from '../utils/showToast';

const data = [
  {label: strings.label1, value: strings.label1},
  {label: strings.label2, value: strings.label2},
  {label: strings.label3, value: strings.label3},
  {label: strings.label4, value: strings.label4},
  {label: strings.label5, value: strings.label5},
  {label: strings.label6, value: strings.label6},
];

const ComplaintModal = ({
  complaintModalVisible,
  setComplaintModalVisible,
  buttonBg,
  postComplaint = () => {},
}) => {
  const {colors} = useTheme();
  const [complaint, setComplaint] = useState('');
  const [value, setValue] = useState('');

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={complaintModalVisible}
      onRequestClose={() => {
        setComplaintModalVisible(!complaintModalVisible);
      }}>
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => {
          setComplaintModalVisible(false);
        }}>
        <KeyboardAvoidingView
          style={styles.modalView}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 14,
              top: 14,
            }}
            onPress={() => {
              setComplaintModalVisible(false);
            }}>
            <Close width="24" height="24" color="#000" />
          </TouchableOpacity>
          <AppText style={styles.modalTitle}>{strings.whyComplaint}</AppText>

          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder={!isFocus ? 'Konu Seç' : '...'}
            placeholder={strings.selectTopic}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />

          <TextInput
            id="complaint"
            defaultValue={complaint}
            onChangeText={setComplaint}
            placeholder="Description"
            blurOnSubmit={false}
            numberOfLines={8}
            multiline
            selectionColor={colors.tabBarTextActive}
            placeholderTextColor="#ccc"
            style={{
              paddingHorizontal: 4,
              paddingVertical: 16,
              fontSize: 15,
              height: Platform.OS === 'ios' ? 110 : 'auto',
              textAlignVertical: 'top',
              borderWidth: 1,
              borderColor: '#ddd',
              width: '100%',
              borderRadius: 6,
              marginTop: 4,
            }}
          />

          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonClose,
              {
                backgroundColor: buttonBg,
              },
            ]}
            onPress={() => {
              if (value.length > 0 && complaint.length > 0) {
                postComplaint(value, complaint);
                setComplaintModalVisible(!complaintModalVisible);
              } else {
                errorMessage(strings.fillBlank);
              }
            }}
            activeOpacity={0.8}>
            <AppText style={{color: '#fff'}}>{strings.send}</AppText>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  modalView: {
    // flex: 1,
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ComplaintModal;
