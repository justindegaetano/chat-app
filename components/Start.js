import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
  black: { backgroundColor: '#090C08'},
  purple: { backgroundColor: '#474056'},
  grey: { backgroundColor: '#8a95a5'},
  green: { backgroundColor: '#B9C6AE'}
};

const Start = ({ navigation }) => {
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", 
          {
            userId: result.user.uid,
            name: name, 
            color: color 
          });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const { black, grey, purple, green } = backgroundColors;

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/Background-Image.png')}
        style={styles.image}>
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.inputBox} >
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Enter your name'
          />
          
          <View>
            <Text style={styles.colorSelector} >
              Choose your Background:
            </Text>
            <View style={styles.colorWrapper}>
              <TouchableOpacity style={[styles.color, black]}
                onPress={() =>
                setColor({ color: black.backgroundColor })
                }
              />

              <TouchableOpacity style={[styles.color, purple]}
                onPress={() =>
                setColor({ color: purple.backgroundColor })
                }
              />

              <TouchableOpacity style={[styles.color, grey]}
                onPress={() =>
                setColor({ color: grey.backgroundColor })
                }
              />

              <TouchableOpacity style={[styles.color, green]}
                onPress={() =>
                setColor({ color: green.backgroundColor })
                }
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.chatButton}
            onPress={signInUser}
          >
            <Text style={[styles.colorSelector, styles.chatBoxText]} >
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    resizeMode: "cover",
  },
  title: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    paddingTop: 50
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  inputBox: {
    backgroundColor: "#fff",
    width: "88%",
    alignItems: "center",
    height: "44%",
    justifyContent: "space-evenly",
    marginTop: 200
  },
  colorSelector: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },
  colorWrapper: {
    flexDirection: 'row'
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  chatButton: {
    backgroundColor: '#757083',
    justifyContent: 'center',
    fontWeight: '600',
    height: 50,
    width: '88%',
    color: '#757083',
    opacity: 50,
    fontSize: 16
  },
  chatBoxText: {
    color: '#fff',
    fontWeight: '300'
  }
});

export default Start;