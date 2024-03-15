import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {ListItem} from '@rneui/base';
import {getTasks} from '../../../services/api/taskService';
import Task from './Task';
import {useShowClosedStore} from '../../../store';

type TaskSetsProps = {
  id: number;
  title: string;
};

type Task = {
  id: number;
  title: string;
  demand: string;
  type: string;
};

// 任务集，接收Task数组，包含一系列任务
export default function TaskSets({id, title}: TaskSetsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Task[]>([]); // 任务数组，点击时填充数据
  const [showClosed] = useShowClosedStore(state => [state.showClosed]);

  // 展开任务组，展示任务条
  const handleOpenSet = async () => {
    const response = await getTasks({
      setid: id.toString(),
      is_now: showClosed === '1' ? '0' : '1',
    });
    setItems(response.data);
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(100,100,100,0.5)',
      borderStyle: 'dashed',
      borderRadius: 10,
      margin: 5,
      borderWidth: 1,
    },
  });

  return (
    <ListItem.Accordion
      containerStyle={styles.container}
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
            <ListItem.Title numberOfLines={1} style={{}}>
              第{id}章 - {title}
            </ListItem.Title>
          </ListItem.Content>
        </>
      }>
      {/* 折叠收起子元素，展开显示子元素  */}
      {items.length === 0 ? (
        <Text
          style={{
            fontSize: 16,
            left: 30,
          }}>
          空
        </Text>
      ) : (
        items.map(item => {
          return (
            <View style={{alignItems: 'center'}}>
              <Task
                key={item.id}
                id={item.id}
                title={item.title}
                demand={item.demand}
                type={item.type}
              />
            </View>
          );
        })
      )}
    </ListItem.Accordion>
  );
}
