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
import ForumScreen from './screens/ForumScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PostDetail from './screens/ForumScreen/PostDetail';
import useAuthStore from './store/authStore';

const Stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();
// ... 定义认证流程的页面
const AppStack = createNativeStackNavigator();
// ... 定义应用主要页面的堆栈

function App() {
  const token = useAuthStore(state => state.token);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="Home">
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
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="Camera" component={FaceRecognitionPunch} />
          </Stack.Navigator> */}
          {token !== null ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// 认证流程导航
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      {/* ... 定义认证流程的页面 */}
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

// 应用主要页面导航
const AppNavigation = () => {
  return (
    <AppStack.Navigator>
      {/* ... 定义应用主要页面的堆栈 */}
      <AppStack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={IndexScreen}
      />
      <AppStack.Screen name="Forum" component={ForumScreen} />
      <AppStack.Screen name="PostDetail" component={PostDetail} />
    </AppStack.Navigator>
  );
};

export default App;
