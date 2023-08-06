import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
    }
}


const getFCMToken = async () => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmtoken) {
        try {
            let fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log('Token', fcmtoken);
                await AsyncStorage.setItem('fcmtoken', fcmtoken);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
    else {
        console.log('Old token:', fcmtoken);
    }
}



const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    //Foreground message notification console

    // messaging().onMessage(async remoteMessage => {
    //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // Check whether an initial notification is available
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

    messaging().onMessage(async remoteMessage => {
        console.log('Foreground', remoteMessage);
    })
}




module.exports = { NotificationListner, requestUserPermission }