import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useDestinationStore,
  useShowDetailStore,
  useSubScreenStore,
  useTaskInfoStore,
  useTaskLocationStore,
} from '../../../store';
import {getTasksDetail} from '../../../services/api/taskService';
import {Button, Divider} from '@rneui/base';
import IconIon from 'react-native-vector-icons/Ionicons';

type detailDataType = {
  id: string;
  title: string;
  demand: string;
  ctime: string;
  btime: string;
  dtime: string;
  type: string;
  location: string;
  lngLat: string;
};

export default function TaskDetail() {
  const [screenState, setScreenState, clearScreenState] = useSubScreenStore(
    store => [store.screenState, store.setScreenState, store.clearScreenState],
  );
  const [showDetailId, setShowDetail, clearShowDetail] = useShowDetailStore(
    store => [store.showDetailId, store.setShowDetail, store.clearShowDetail],
  );
  const taskLocation = useTaskLocationStore(store => store.taskLocation);
  const [destLngLat, setDestLngLat, clearDestLngLat] = useDestinationStore(
    store => [store.destLngLat, store.setDestLngLat, store.clearDestLngLat],
  );

  const [taskInfo, taskLoc, setTaskInfo, setTaskLoc] = useTaskInfoStore(
    store => [
      store.taskInfo,
      store.taskLoc,
      store.setTaskInfo,
      store.setTaskLoc,
    ],
  );

  const updateTaskDetail = async () => {
    try {
      const response = await getTasksDetail({
        taskid: showDetailId,
      });

      setTaskInfo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNavi = () => {
    /**
     * 1. 设置终点坐标为当前任务坐标
     * 2. 更新顶部任务条
     * 3. 关闭任务栏（subScreen）
     */
    const lngLatData = taskInfo.lngLat.split(',');
    // console.log(lngLatData);
    setDestLngLat({
      longitude: parseFloat(lngLatData[0]),
      latitude: parseFloat(lngLatData[1]),
    });
    // console.log(destLngLat);
    clearScreenState();
  };

  useEffect(() => {
    updateTaskDetail();
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '95%',
      position: 'relative',
      top: 0,
      // paddingTop: 20,
      pointerEvents: 'box-none',
      // borderWidth: 1,
    },
    title: {
      width: '100%',
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      // borderWidth: 1,
    },
    divider: {
      marginVertical: 20,
    },
    demand: {
      fontSize: 18,
    },
    buttonContainer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      bottom: 10,
      width: '100%',
      //   borderWidth: 1,
    },
    button: {
      marginHorizontal: 20,
    },
  });

  return (
    <View style={styles.container}>
      {taskInfo && (
        <>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>
              任务{taskInfo.id} - {taskInfo.title}
            </Text>
          </View>

          <Divider inset insetType="middle" style={styles.divider} />

          <Text style={styles.demand}>
            {'        '}
            {taskInfo.demand}
          </Text>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                type="outline"
                radius={10}
                buttonStyle={{borderWidth: 3}}
                icon={<IconIon name="navigate" size={24} />}
                title="导航此任务"
                onPress={() => {
                  handleNavi();
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                type="outline"
                radius={10}
                buttonStyle={{borderWidth: 3}}
                icon={<IconIon name="arrow-back" />}
                title="提交任务"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}
