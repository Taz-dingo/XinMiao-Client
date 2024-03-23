import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {shadowStyle} from '../../../style';
import TaskList from './TaskList';
import TaskTpyeItem from './TaskTpyeItem';
import IconIon from 'react-native-vector-icons/Ionicons';
import {
  useShowClosedStore,
  useShowDetailStore,
  useSubScreenStore,
  useTaskStore,
} from '../../../store';
import {getTaskSets} from '../../../services/api/taskService';
import {Divider} from '@rneui/base';
import {CheckBox} from 'react-native-elements';
import TaskDetail from './TaskDetail';

export default function TaskScreen() {
  const clearScreenState = useSubScreenStore(store => store.clearScreenState);
  const [showDetailId, setShowDetail, clearShowDetail] = useShowDetailStore(
    state => [state.showDetailId, state.setShowDetail, state.clearShowDetail],
  );
  const [showClosed, setShowClosed] = useShowClosedStore(state => [
    state.showClosed,
    state.setShowClosed,
  ]);
  const toggleShowClosed = () => {
    setShowClosed(showClosed === '0' ? '1' : '0');
  };
  const styles = StyleSheet.create({
    divider: {
      // width: '80%',
      marginTop: 10,
      marginBottom: 15,
    },
    icon: {
      marginTop: 10,
      left: 0,
      width: 40,
      height: 40,
      // borderWidth: 3,
    },
  });
  return (
    <>
      {showDetailId === '' ? (
        <>
          <TaskTpyeItem></TaskTpyeItem>

          {/* <Divider inset={true} insetType="middle" style={styles.divider} /> */}
          <TaskList></TaskList>

          {/* <Divider inset={true} insetType="middle" style={styles.divider} /> */}
          <CheckBox
            title="显示已关闭任务"
            checked={showClosed === '0' ? true : false}
            onPress={toggleShowClosed}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          />
        </>
      ) : (
        <>
          <IconIon
            name="arrow-back"
            style={styles.icon}
            size={30}
            onPress={() => clearShowDetail()}
          />
          <TaskDetail></TaskDetail>
        </>
      )}
    </>
  );
}
