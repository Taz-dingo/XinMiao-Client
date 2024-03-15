import {Text, View} from 'react-native';
import React, {Component} from 'react';
import LoginScreen from './screens/Login/Index';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IndexScreen from './screens/Home/Index';
import TestScreen from './screens/TestScreen';
import FaceRecognitionPunch from './screens/Testscreen1';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthScreen from './screens/AuthScreen';
import ForumScreen from './screens/ForumScreen/Index';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen
            name="Login"
            options={{
              title: '',
              headerTransparent: true,
            }}
            component={LoginScreen}
          />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
            component={IndexScreen}
          />
          <Stack.Screen name="Forum" component={ForumScreen} />
          <Stack.Screen name="Camera" component={FaceRecognitionPunch} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
