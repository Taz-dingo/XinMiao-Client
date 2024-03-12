import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {shadowStyle} from '../../../style';
import TaskList from './TaskList';
import TaskTpyeItem from './TaskTpyeItem';
import IconEtp from 'react-native-vector-icons/Entypo';
import {useSubScreenStore} from '../../../store';

export default function TaskScreen() {
  // 模拟数据
  const data: TaskSet[] = [
    {
      setId: 3,
      setTitle: '第一章 - 熟悉校园',
      tasks: [],
    },
    {
      setId: 2,
      setTitle: '第二章 - 了解社团',
      tasks: [],
    },
  ];

  const clearScreenState = useSubScreenStore(store => store.clearScreenState);

  const styles = StyleSheet.create({
    taskbarContainer: {
      // 任务栏容器
      width: '90%',
      height: '80%',
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 25,
      position: 'relative',
      padding: 10,
      ...shadowStyle,
    },
  });
  return (
    <View style={styles.taskbarContainer}>
      <IconEtp name="cross" onPress={() => clearScreenState()} size={30} />
      <TaskTpyeItem></TaskTpyeItem>
      <TaskList taskSets={data}></TaskList>
    </View>
  );
}
