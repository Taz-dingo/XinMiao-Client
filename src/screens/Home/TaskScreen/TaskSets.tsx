import {View, Text, TouchableOpacity, Touchable} from 'react-native';
import React, {useState} from 'react';
import {ListItem} from '@rneui/base';
import {getTasksBySetId} from '../../../services/api/taskService';
import Task from './Task';

type TaskSetsProps = {
  id: number;
  title: string;
};

// 任务集，接收Task数组，包含一系列任务
export default function TaskSets({id, title}: TaskSetsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Task[]>([]); // 任务数组，点击时填充数据

  const handleOpenSet = async () => {
    const response = await getTasksBySetId({setid: id.toString()});
    setItems(response.data);
  };

  return (
    <View>
      <ListItem.Accordion
        containerStyle={{
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: '#fff',
        }}
        // 点击折叠与展开
        onPress={() => {
          // 展开时获取对应的tasks，关闭时不获取
          if (!isOpen) {
            handleOpenSet();
          }
          // 展开任务组
          setIsOpen(!isOpen);
        }}
        isExpanded={isOpen}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>{title}</ListItem.Title>
            </ListItem.Content>
          </>
        }>
        {/* 折叠收起子元素，展开显示子元素  */}
        {items.map(item => {
          return (
            <Task
              key={item.id}
              id={item.id}
              title={item.title}
              demand={item.demand}
              type={item.type}
            />
          );
        })}
      </ListItem.Accordion>
    </View>
  );
}
