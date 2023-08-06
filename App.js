import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NotificationListner, requestUserPermission } from './src/utils/PushNotification';
import { firebase } from '@react-native-firebase/messaging';
import ForegroundHandler from './src/utils/ForegroundHandler';


const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, [])

  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
    if (counter % 5 === 0) {
      console.log(counter);
      try {
        firebase.messaging().sendMessage({
          channelId: '1',
          vibrate: true,
          actions: ["Yes", "No"],
          title: "Counter divisible by 5",
          body: `The counter is now ${counter}`,
          soundName: "default",
        })
      } catch (error) {
        console.log(error);
      }


    }
  }
  return (
    <View style={styles.main}>
      <ForegroundHandler />
      <TouchableOpacity onPress={handleClick} style={styles.btnContainer}>
        <Text style={styles.btnText}>Click to send notification</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"
  },

  btnContainer: {
    height: 50,
    paddingVertical: 3,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: 'center'
  },
  btnText: { fontSize: 18, color: "white", fontWeight: "bold" },
});

export default App