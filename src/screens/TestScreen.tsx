import {View, Text, Button, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {
  getMockTestFun,
  getTestFun,
  postTestFun,
} from '../services/api/TestService';
import EventSource from 'react-native-sse';
import {IP, baseURL} from '../services/config';
import {WebView} from 'react-native-webview';

export default function TestScreen() {
  // const getTest = async () => {
  //   const response = await getTestFun({
  //     id: '1',
  //   });
  //   console.log(response);
  // };

  // const postTest = async () => {
  //   const response = await postTestFun({
  //     id: '1',
  //   });
  //   console.log(response); // 这里应该打印出响应数据
  // };

  // const MockTest = async () => {
  //   const response = await getMockTestFun({});
  //   console.log(response);
  // };

  // const ws = new WebSocket(
  //   // 'ws://10.201.14.52:8888/webSocket',
  //   'ws://localhost:9999/webSocket',
  //   // 'ws://10.201.18.238:8888/web',
  //   // 'ws://echo.websocket.org',
  // );
  // ws.onopen = () => {
  //   // connection opened
  //   ws.send('connection opened'); // send a message
  // };

  // ws.onmessage = e => {
  //   // a message was received
  //   console.log(e.data);
  // };

  // ws.onerror = e => {
  //   // an error occurred
  //   console.log('error: ' + e.message);
  // };

  // ws.onclose = e => {
  //   // connection closed
  //   console.log(e.code, e.reason);
  // };

  // useEffect(() => {}, []);

  // const handleSSE = () => {
  //   // 处理SSE逻辑
  //   const es = new EventSource(`${baseURL}/startsse/1111111111`);

  //   es.addEventListener('open', event => {
  //     console.log('Open SSE connection.');
  //   });

  //   es.addEventListener('message', event => {
  //     console.log('New message event:', event.data);
  //   });

  //   es.addEventListener('error', event => {
  //     if (event.type === 'error') {
  //       console.error('Connection error:', event.message);
  //     } else if (event.type === 'exception') {
  //       console.error('Error:', event.message, event.error);
  //     }
  //   });

  //   es.addEventListener('close', event => {
  //     console.log('Close SSE connection.');
  //   });
  // };
  // 获取本地 HTML 文件的路径
  const localHTMLFile = Platform.select({
    android: {uri: 'file:///android_asset/index.html'}, // Android 平台下的文件路径
  });

  return (
    <View>
      <Button
        title={'send'}
        onPress={() => {
          ws.send('123');
          console.log('pressed');
        }}
      />
      <Text>TestScreen</Text>
      <WebView
        originWhitelist={['*']}
        source={{html: '<h1>This is a static HTML source!</h1>'}}
      />

      {/* <Button title="get测试" onPress={getTest} />
      <Button title="post测试" onPress={postTest} />
      <Button title="Mock测试" onPress={MockTest} /> */}
      {/* <Button title="sse测试" onPress={handleSSE} /> */}
    </View>
    // <WebView
    //   originWhitelist={['*']}
    //   source={{html: '<h1>This is a static HTML source!</h1>'}}
    // />
    // <WebView
    //   disableTouchHideKeyboard={true}
    //   originWhitelist={['*']}
    //   allowFileAccess={true}
    //   scrollEnabled={true}
    //   source={{uri: 'https://baidu.com'}}
    //   style={{flex: 1}} // 根据需要设置样式
    // />
  );
}
