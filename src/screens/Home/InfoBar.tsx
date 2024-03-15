import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {shadowStyle} from '../../style';
import {useTaskInfoStore} from '../../store';

export default function InfoBar() {
  const taskInfo = useTaskInfoStore(store => store.taskInfo);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '50%',
      height: 40,
      borderColor: 'black',
      borderRadius: 10,
      textAlign: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      margin: 10,
      ...shadowStyle,
    },
    infoText: {
      fontSize: 18,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>当前任务：{taskInfo.title}</Text>
    </View>
  );
}
