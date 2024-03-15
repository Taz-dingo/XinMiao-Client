import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {useTaskStore} from '../../../store';
import {Button} from '@rneui/base';
export default function TaskTpyeItem() {
  const [taskState, setTaskType] = useTaskStore(state => [
    state.taskState,
    state.setTaskType,
  ]);

  const taskTypes = [
    {icon: 'crown', text: '主线任务', type: 'mainLine'},
    {icon: 'hat-cowboy', text: '支线任务', type: 'sideLine'},
  ];

  const styles = StyleSheet.create({
    taskTypeItem: {
      // 每个类型的容器，里面有icon和text
      borderRadius: 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // width: 70,
      // height: 70,
    },
    selectedTaskItem: {
      // 选中后改变样式
      backgroundColor: 'rgba(100,200,100,0.7)',
    },
    taskTypeContainer: {
      // 任务类型容器（上方）
      flexDirection: 'row',
      paddingHorizontal: 30,
      justifyContent: 'space-evenly',
    },
  });

  return (
    <View style={styles.taskTypeContainer}>
      {taskTypes.map(item => {
        return (
          <Button
            type="clear"
            containerStyle={[
              styles.taskTypeItem,
              taskState === item.type ? styles.selectedTaskItem : null,
            ]}
            key={item.text}
            onPress={() => {
              setTaskType(item.type);
            }}>
            <IconFA5 name={item.icon} size={30} />
            <Text>{item.text}</Text>
          </Button>
        );
      })}
    </View>
  );
}
