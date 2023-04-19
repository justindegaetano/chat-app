import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDuOKZx3UphMtE2hyvFtjJcHpC2GISN36k",
    authDomain: "chat-app-ba91c.firebaseapp.com",
    projectId: "chat-app-ba91c",
    storageBucket: "chat-app-ba91c.appspot.com",
    messagingSenderId: "631372865890",
    appId: "1:631372865890:web:67481e0faef92fb0478c3b"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;