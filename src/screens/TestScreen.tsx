import {View, Text, Button} from 'react-native';
import React from 'react';
import {getTestFun, postTestFun} from '../services/api/TestService';

export default function TestScreen() {
  const getTest = async () => {
    const response = await getTestFun({
      id: '1',
    });
    console.log(response);
  };

  const postTest = async () => {
    const response = await postTestFun({
      id: '1',
    });
    console.log(response); // 这里应该打印出响应数据
  };

  return (
    <View>
      <Text>TestScreen</Text>

      <Button title="get测试" onPress={getTest} />
      <Button title="post测试" onPress={postTest} />
    </View>
  );
}