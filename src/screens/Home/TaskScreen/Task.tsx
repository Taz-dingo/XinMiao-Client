
import React, {Component} from 'react';
import {Button, ListItem} from 'react-native-elements';
import {useShowDetailStore} from '../../../store';
import { MyTouchable } from '../../../components/MyTouchable';

type TaskProps = {
  id: number;
  title: string;
  demand: string;
  type: string;
};
/**任务组件 */
export default function Task({id, title, demand, type}: TaskProps) {
  const [showDetailId, setShowDetail] = useShowDetailStore(state => [
    state.showDetailId,
    state.setShowDetail,
  ]);

  return (
    <ListItem
      Component={MyTouchable}
      containerStyle={{
        backgroundColor: 'rgba(255,255,255,0)',
        paddingHorizontal: 5,
        width: '80%',
        marginBottom: 10,
        // borderWidth: 1,
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


