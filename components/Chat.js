import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, renderActions } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from 'react-native-maps';

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { userId } = route.params;
  const { name } = route.params;
  const { color } = route.params.color;
  const [messages, setMessages] = useState([]);

  // Resets the 'messages' state to append in recent messages.
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  // Returns a customization object with included props which will be loaded as a callback on the renderBubble prop in the GiftedChat component.
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  // Callback to pass to the GiftedChat InputToolbar property used to disable toolbar when offline.
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  let unsubMessages;

  useEffect(() => {

    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  //Caches messages in AsyncStorage for access offline
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Callback function to be passed in the GiftedChat custom actions prop that returns a CustomAction component with relevant prop data. 
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Custom view for handling messages sent with a location property, which triggers Expos MapView component in return.
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
          name: name
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;
