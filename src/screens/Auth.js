import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import { register } from '../api/user';
import { AuthContext } from '../context/Auth'
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/config/toast';
import Header from '../components/Header';

export default function Auth() {
    const { addToken } = useContext(AuthContext);
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
        <View style={styles.container}>
            <Header type="outside" />
            <View style={{ borderRadius: 32 }}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})