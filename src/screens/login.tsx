import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component, useState } from 'react'
import { validateUsername,validatePassword } from '../utils/validationUtils'

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      // 这里可以添加登录逻辑，例如验证输入或调用API
      // 校验输入格式
      if (!validateUsername(username)) {
        Alert.alert('错误', '用户名格式不正确');
        return;
      }
      if (!validatePassword(password)) {
        Alert.alert('错误', '密码格式不正确');
        return;
      }
      // 
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="用户名"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="密码"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title="登录" onPress={handleLogin} />
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      height: 40,
      marginVertical: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
  });

  export default LoginScreen;