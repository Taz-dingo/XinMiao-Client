import {View, Text} from 'react-native';
import {useState, useEffect} from 'react';
import {Avatar, ListItem} from '@rneui/base';
import TaskSets from './TaskSets';
import {getMainTaskSetsByUserId} from '../../../services/api/taskService';

type TaskListProps = {
  taskSets: TaskSet[];
};
// 网络请求，获得task

// 任务列表，接收TaskSet数组，包含一系列任务集合
export default function TaskList({taskSets}: TaskListProps) {
  const [taskList, setTaskList] = useState<TaskSet[]>([]);
  // 初始化时请求TaskSet数组
  useEffect(() => {
    const response = async () => {
      const response = await getMainTaskSetsByUserId({userid: '1'});
    };
  });

  return (
    <>
      {taskSets.map(item => (
        <TaskSets key={item.setId} id={item.setId} title={item.setTitle} />
      ))}
    </>
  );
}
