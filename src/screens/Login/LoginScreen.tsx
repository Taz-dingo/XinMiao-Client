import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {
  validateUsername,
  validatePassword,
  validateTelNum,
  validateCodeNum,
} from '../../utils/validationUtils';
import {login, msgLogin, sendMsg} from '../../services/api/userService';
import {Button, Divider, Image, defaultSpacing} from '@rneui/base';

// 目前登录方式有两种：default - 账号密码  msg - 短信
type State = 'default' | 'msg';
export default function LoginScreen({navigation}: any): any {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [telNum, setTelNum] = useState('');
  const [msgCode, setMsgCode] = useState('');

  // 登录state，当前的状态
  const [state, setState] = useState<State>('default');
  // 是否发送了验证码
  const [isSendMsg, setIsSendMsg] = useState(false);
  const [countDown, setCountDown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown => countDown - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  function checkLogin(): boolean {
    // 账号密码登录
    if (username === '') {
      Alert.alert('错误', '请输入用户名');
      return false;
    }
    if (password === '') {
      Alert.alert('错误', '请输入密码');
      return false;
    }
    if (!validateUsername(username)) {
      Alert.alert('错误', '用户名格式不正确');
      return false;
    }
    if (!validatePassword(password)) {
      Alert.alert('错误', '密码格式不正确');
      return false;
    }
    return true;
  }

  function checkMsgLogin(): boolean {
    // 短信登录
    if (telNum === '') {
      Alert.alert('错误', '请输入手机号');
      return false;
    }
    if (msgCode === '') {
      Alert.alert('错误', '请输入验证码');
      return false;
    }
    if (!validateTelNum(telNum)) {
      Alert.alert('错误', '手机号格式不正确');
      return false;
    }
    if (!validateCodeNum(msgCode)) {
      Alert.alert('错误', '验证码格式不正确');
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    let response = null;
    // 账号密码登录
    if (state === 'default') {
      // 检查输入格式
      if (!checkLogin()) return;
      response = await login({
        id: username,
        pwd: password,
      });
      if (response.code !== 200) {
        Alert.alert('错误', '用户名或密码错误');
        return;
      }
    } // 短信登录
    else if (state === 'msg') {
      // 检查输入格式
      if (!checkMsgLogin()) return;
      response = await msgLogin({
        tel: telNum,
        code: msgCode,
      });
      console.log('response: ' + JSON.stringify(response));
      if (response.code !== 200) {
        Alert.alert('错误', '用户名或密码错误');
        return;
      }
    }
    if (response.code === 200) {
      // 登录成功
      // 1. 跳转页面
      // 2. 设置token
      Alert.alert('登录成功');
      // 跳转认证界面
      navigation.navigate('Auth');
    }
  };

  const handleSendMsg = async () => {
    const response = await sendMsg({
      tel: telNum,
    });
    // 如果不成功，提示一下
    // if (response.code !== 200) {

    // }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: 10,
    },
    iconContainer: {
      alignItems: 'center',
      marginVertical: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 20,
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      position: 'relative',
      height: 40,
      width: '100%',
      marginVertical: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    buttonContainer: {
      width: '90%',
      alignItems: 'center',
      textAlign: 'center',
    },
    button: {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            position: 'relative',
            top: 20,
          }}>
          Xin Miao
        </Text>
        <Image
          style={{width: 150, height: 150}}
          source={require('../../assets/icon.png')}></Image>
      </View>

      <View>
        <Text style={styles.title}>登录</Text>
      </View>

      <View style={styles.inputContainer}>
        {state === 'default' ? (
          <View>
            <TextInput
              placeholder="用户名"
              value={username}
              onChangeText={username => setUsername(username)}
              style={styles.input}
            />
            <TextInput
              placeholder="密码"
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
              }}>
              <TextInput
                placeholder="手机号"
                value={telNum}
                onChangeText={telNum => setTelNum(telNum)}
                style={styles.input}></TextInput>
              {isSendMsg ? (
                <Button
                  containerStyle={{
                    position: 'absolute',
                    right: 0,
                  }}
                  type="clear"
                  disabled>
                  已发送
                  <Text>{countDown}</Text>
                </Button>
              ) : (
                <Button
                  containerStyle={{
                    position: 'absolute',
                    right: 0,
                  }}
                  type="clear"
                  onPress={() => {
                    // 按下“发送验证码”：
                    // 先检查是否输入
                    if (telNum === '') {
                      Alert.alert('错误', '请输入手机号');
                      return;
                    }
                    // 1. 更新发送状态
                    // 2. 倒计时重置为60秒
                    // 3. 发送http请求，发送验证码到指定tel
                    setIsSendMsg(true);
                    setCountDown(60);
                    handleSendMsg();

                    setTimeout(() => {
                      setIsSendMsg(false);
                      setCountDown(60);
                    }, 1000 * 60);
                  }}>
                  发送验证码
                </Button>
              )}
            </View>

            <TextInput
              placeholder="验证码"
              value={msgCode}
              onChangeText={msgCode => setMsgCode(msgCode)}
              style={styles.input}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="登录"
          style={styles.button}
          buttonStyle={{
            backgroundColor: 'rgb(82, 196, 26)',
            borderColor: 'white',
            borderWidth: 2,
            margin: 20,
            borderRadius: 30,
          }}
          containerStyle={{
            width: '100%',
          }}
          onPress={handleLogin}
        />

        <Divider color="#0" subHeader="__________________________________" />

        {state === 'default' ? (
          <Button
            title="短信登录"
            buttonStyle={{
              backgroundColor: 'rgba(230, 230, 230, 1)',
              borderRadius: 30,
              margin: 20,
            }}
            containerStyle={{
              width: '100%',
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{marginHorizontal: 20, color: 'black'}}
            onPress={() => setState('msg')}
          />
        ) : (
          <Button
            title="返回"
            buttonStyle={{
              backgroundColor: 'rgba(230, 230, 230, 1)',
              borderRadius: 30,
              margin: 20,
            }}
            containerStyle={{
              width: '100%',
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{marginHorizontal: 20, color: 'black'}}
            onPress={() => setState('default')}
          />
        )}
      </View>
    </View>
  );
}
