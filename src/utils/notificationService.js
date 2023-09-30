import messaging from '@react-native-firebase/messaging';
import { storage } from '../config/storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}

const getFcmToken = async () => {
    let fcmToken = storage.getString('fcmToken')
    console.log('old token: ' + fcmToken)
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('new generated fcm token: ' + fcmToken)
                storage.set('fcmToken', fcmToken)
            }
        } catch (error) {
            console.log('error: ' + error)
        }
    }
}

export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        //navigation.navigate(remoteMessage.data.type);
    });
    messaging().onMessage(async remoteMessage => {
        console.log('received in foreground: ' + JSON.stringify(remoteMessage))
    })
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}