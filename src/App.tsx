import {Text, View} from 'react-native';
import React, {Component} from 'react';
import LoginScreen from './screens/Login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IndexScreen from './screens/Home/Index';
import TestScreen from './screens/TestScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthScreen from './screens/AuthScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
          <Stack.Screen name="Home" component={IndexScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
