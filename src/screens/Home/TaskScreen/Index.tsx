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
import {CheckBox, Icon} from 'react-native-elements';
import TaskDetail from './TaskDetail';
import {Tooltip} from '@rneui/themed';
import IconFontisto from 'react-native-vector-icons/Fontisto';

export default function TaskScreen() {
  const clearScreenState = useSubScreenStore(store => store.clearScreenState);
  const {showDetailId, setShowDetail, clearShowDetail} = useShowDetailStore();
  const {showClosed, setShowClosed} = useShowClosedStore();
  const [open, setOpen] = React.useState(false);

  const styles = StyleSheet.create({
    divider: {
      // width: '80%',
      marginTop: 10,
      marginBottom: 15,
    },
    icon: {
      position: 'absolute',
      top: -40,
      // marginTop: 10,
      right: 0,
      width: 40,
      height: 40,
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              // title="显示已结束任务"
              checked={showClosed === '1' ? true : false}
              onPress={() => setShowClosed(showClosed === '0' ? '1' : '0')}
              containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            />
            <Tooltip
              visible={open}
              containerStyle={{
                backgroundColor: 'rgba(33,33,33,0.8)',
                width: 250,
                // height: 300,
              }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              popover={
                <Text style={{color: '#fff'}}>
                  包含已完成任务、过期未完成任务
                </Text>
              }>
              {!open ? (
                <Text style={{color: '#333', fontSize: 16}}>
                  显示已结束任务
                </Text>
              ) : (
                <Text>{'                            '}</Text>
              )}
            </Tooltip>
            {/* 感叹号 */}
            <IconFontisto
              name="question"
              size={11}
              style={{
                borderWidth: 2,
                width: 20,
                height: 20,
                borderColor: 'rgba(33,33,33,0.8)',
                borderRadius: 50,
                padding: 5,
                marginLeft: 10,
              }}
            />
          </View>
          {/* <Text>showClosed: {showClosed}</Text> */}
        </>
      ) : (
        <View style={{position: 'relative', borderWidth: 0}}>
          <IconIon
            name="arrow-back"
            style={styles.icon}
            size={30}
            onPress={() => clearShowDetail()}
          />
          <TaskDetail />
        </View>
      )}
    </>
  );
}
