import {View, Text} from 'react-native';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {useShowDetailStore} from '../../../store';

type TaskProps = {} & Task;
export default function Task({id, title, demand, type}: TaskProps) {
  const [showDetailId, setShowDetail] = useShowDetailStore(state => [
    state.showDetailId,
    state.setShowDetail,
  ]);

  return (
    <ListItem
      containerStyle={{
        backgroundColor: 'rgba(255,255,255,0)',
        paddingHorizontal: 5,
        width: '80%',
        marginBottom: 10,
      }}
      onPress={() => {
        setShowDetail(id.toString());
        console.log(showDetailId);
      }}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{textAlign: 'left'}}>
          任务{id} - {title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
