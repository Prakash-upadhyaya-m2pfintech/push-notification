import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { PushNotification } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

            try {
                PushNotification.localnotification({
                    channelId: '1',
                    vibrate: true,
                    actions: ["Yes", "No"],
                    title: remoteMessage?.notification?.title,
                    message: remoteMessage?.notification?.body,
                    soundName: "default",

                })
            } catch (error) {
                console.log(error);
            }

        });
        return unsubscribe;
    }, []);

    return null;
}

export default ForegroundHandler
