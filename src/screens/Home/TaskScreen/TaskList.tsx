import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {Avatar, ListItem} from '@rneui/base';
import TaskSets from './TaskSets';
import {getTaskSets} from '../../../services/api/taskService';
import {useShowClosedStore, useTaskStore} from '../../../store';

export type TaskSet = {
  name: string;
  applicant: string;
  ctime: string;
  etime: string;
  isSetDue: string;
  isMainline: string;
  setId: string;
};

// 网络请求，获得task

// 任务列表，接收TaskSet数组，包含一系列任务集合
export default function TaskList() {
  const [taskState] = useTaskStore(state => [state.taskState]);
  const [showClosed] = useShowClosedStore(state => [state.showClosed]);
  const [taskSets, setTaskSets] = useState<TaskSet[]>();
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#aaa',
      borderStyle: 'dashed',
      // marginHorizontal: 'auto',
      padding: 10,
    },
  });
  const updateTaskSets = async () => {
    try {
      // 获取任务集
      let taskType = taskState === 'mainLine' ? '1' : '0';
      const response = await getTaskSets({
        is_mainline: taskType,
        is_now: showClosed === '1' ? '0' : '1', // 如果展示已结束，那么is_now就为0
      });
      // 更新任务集数组
      setTaskSets(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updateTaskSets();
  }, [taskState, showClosed]);

  return (
    <ScrollView style={styles.container}>
      {taskSets &&
        taskSets.map(item => (
          <TaskSets
            key={item.setId}
            id={parseInt(item.setId)}
            title={item.name}
          />
        ))}
    </ScrollView>
  );
}

