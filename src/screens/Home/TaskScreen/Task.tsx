import {View, Text} from 'react-native';
import React from 'react';
import {ListItem} from 'react-native-elements';

type TaskProps = {} & Task;
export default function Task({id, title, demand, type}: TaskProps) {
  return (
    <ListItem
      containerStyle={{
        backgroundColor: 'rgba(255,255,255,0)',
        paddingHorizontal: 30,
      }}>
      <ListItem.Content>
        <ListItem.Title>
          任务{id} - {title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
