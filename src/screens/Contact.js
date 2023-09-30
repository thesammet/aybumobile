import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BasicHeader from '../components/BasicHeader';
import {strings} from '../constants/localization';
import AppText from '../components/AppText';
import {errorMessage} from '../utils/showToast';

const Contact = ({navigation}) => {
  const {colors} = useTheme();
  const contactInfo = [
    {
      name: 'Mertcan Köse',
      linkedin: 'https://www.linkedin.com/in/mertcankose-/',
      email: 'mertcankose142@gmail.com',
    },
    {
      name: 'Abdü Samed Akgül',
      linkedin:
        'https://tr.linkedin.com/in/abd%C3%BC-samed-akg%C3%BCl-383906173',
      email: 'samedakgul99@gmail.com',
    },
  ];

  const handleEmailPress = email => {
    Linking.canOpenURL(`mailto:${email}`).then(supported => {
      if (supported) {
        Linking.openURL(`mailto:${email}`);
      } else {
        errorMessage('E-posta uygulaması bulunamadı.');
      }
    });
  };

  const renderContact = contact => (
    <View key={contact.name} style={styles.contactContainer}>
      <Text
        style={[
          styles.contactName,
          {
            color: colors.text,
          },
        ]}>
        {contact.name}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(contact.linkedin)}>
        <Text style={styles.contactLink}>LinkedIn Profili</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEmailPress(contact.email)}>
        <Text style={styles.contactLink}>E-posta Gönder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      <BasicHeader
        style={{backgroundColor: 'gold'}}
        navigation={navigation}
        text={strings.contact}
        textStyle={{fontWeight: 'bold', fontSize: 18}}
        isBack={true}
        type="postComments"
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <AppText
          style={[
            styles.headerText,
            {
              color: colors.text,
            },
          ]}>
          Uygulama ile ilgili düşünceleriniz ve fikirleriniz bizim için çok
          değerli. Fikir ve görüşlerinizi paylaşarak bize katkıda
          bulunabilirsiniz.
        </AppText>

        <View style={styles.contactsSection}>
          {contactInfo.map(renderContact)}
        </View>

        {/* <AppText style={styles.footerText}>
          Sizden duymak bizi daha iyi yapar. Gelişimimize katkı sağlamak için
          her zaman buradayız.
        </AppText> */}
      </View>

      <View>
        <AppText></AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 30,
  },
  contactsSection: {
    marginBottom: 30,
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactLink: {
    color: 'blue',
    marginBottom: 10,
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
  },
});

export default Contact;
