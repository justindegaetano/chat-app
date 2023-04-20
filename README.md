# Chat App

## Objective

A Chat App for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

### Built with

- React Native
- Expo
- Android Studio
- Google Firebase
- Google Firestore

### My Role

Full-stack Web developer

### User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family
- As a user, I want to be able to send messages to my friends and family members to exchange
  the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Key Features

-A page where users can enter their name and choose a background color for the chat screen
before joining the chat.

- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
  and location data.
- Data gets stored online and offline.

# Setting up the development environment:

- Clone the repository: git clone https://github.com/mpsylvan/chat-demo

# EXPO 
- Install Expo CLI as a global npm package: yarn add global expo-cli
- Create an account and log in at https://expo.dev/.
- Follow expo CLI's instructions.
- Install the Expo Go app on your phone (for testing purposes)
- Start the project: npx expo start 
- Scan the QR code provided in your terminal

# FIREBASE/ FIRESTORE
- follow new project workflow within Firebase console
- include Firebase object within App.js and/or separate file. 
- make a reference to the project using firebase config obj. 

# Dependencies:

    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.6",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.13.0",
    "react": "18.2.0",
    "react-native": "0.71.4",
    "react-native-gifted-chat": "^2.0.1",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "react-native-svg": "13.4.0",
    "@react-native-async-storage/async-storage": "1.17.11",
    "@react-native-community/netinfo": "9.3.7",
    "expo-speech": "~11.1.1",
    "expo-image-picker": "~14.1.1",
    "expo-location": "~15.1.1",
    "react-native-maps": "1.3.2"