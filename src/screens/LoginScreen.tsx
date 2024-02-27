import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Component, useState} from 'react';
import {validateUsername, validatePassword} from '../utils/validationUtils';
import {login} from '../services/api/userService';
import {Button} from '@rneui/base';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
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

    const response = await login({
      account: username,
      password: password,
    });
    if (response.code === 0) {
      // 登录成功
      // 1. 跳转页面
      // 2. 设置token
      Alert.alert('登录成功');
      navigation.navigate('Home');
    } else if (response.code === 1) {
      Alert.alert('错误', '用户名或密码错误');
    }

    console.log(response);
  };

  return (
    <View style={styles.container}>
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
    </View>
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
