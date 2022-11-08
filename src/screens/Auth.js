import React, { useContext } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { register } from '../api/user';
import { AuthContext } from '../context/Auth'
import { useTheme } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import TYPOGRAPHY from '../constants/typography';
import Header from '../components/Header';
import { ChevronDown } from '../components/icons'

export default function Auth() {
    const { addToken } = useContext(AuthContext);
    const { colors } = useTheme();
    const registerToken = async (deviceId) => {
        let response = await register(deviceId, username, department);
        if (response.error) {
            //TODO: toast message
            console.log(response)
        } else {
            addToken(response.data.token)
        }
    };
    //TODO: Start Button func
    /* 
         DeviceInfo.getUniqueId().then((uniqueId) => {
             registerToken(uniqueId)
         });
     */

    return (
        <View style={[{ backgroundColor: colors.welcomeBg }, styles.container]}>
            <Header type="outside" />
            <View style={styles.innerContainer}>
                <View style={styles.infoView}>
                    <Text style={styles.fillTheGapsText}>Alanları doldurunuz.</Text>
                    <Text style={styles.fieldText}>Kullanıcı Adı</Text>
                    <TextInput
                        style={styles.input}
                        onSubmitEditing={(value) => setName(value.nativeEvent.text)}
                    />

                    <Text style={styles.fieldText}>Fakülte (Zorunlu) </Text>
                    <View style={styles.departmentArea}>
                        <Text style={styles.departmentInnerText}>Fakülte seçin</Text>
                        <ChevronDown height={24} width={24} color={'#001A43'} />
                    </View>

                    <Text style={styles.fieldText}>Bölüm (Zorunlu)</Text>
                    <View style={styles.departmentArea}>
                        <Text style={styles.departmentInnerText}>Bölüm seçin</Text>
                        <ChevronDown height={24} width={24} color={'#001A43'} />
                    </View>
                </View>

                <View style={styles.startButton}>
                    <Text style={styles.startText}>Başla</Text>
                </View>
            </View>
        </View>
    )
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
    },
    infoView: {
        alignItems: 'center',
    },
    startButton: {
        borderRadius: 32,
        width: '55%',
        borderWidth: 1,
        borderColor: 'red',
        alignSelf: 'center'
    },
    fieldText: [
        TYPOGRAPHY.H5Regular,
        {
            color: '#A0A0A0',
            marginTop: 20,
            marginBottom: 8
        },

    ],
    startText: [
        TYPOGRAPHY.H3Bold,
        {
            color: '#CECECE',
            alignSelf: 'center',
            marginVertical: 20
        }],
    fillTheGapsText: [
        TYPOGRAPHY.H3Bold,
        {
            color: '#001A43'
        }],
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 32,
        paddingVertical: 20,
        textAlign: 'center',
    },
    departmentArea: {
        flexDirection: 'row',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 32,
        padding: 20,
        justifyContent: 'space-between',
        width: '100%'
    },
    departmentInnerText: [
        TYPOGRAPHY.H55Regular,
        {
            color: '#909090'
        }],
})