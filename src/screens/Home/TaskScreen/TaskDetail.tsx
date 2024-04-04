import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useDestinationStore,
  useShowDetailStore,
  useSubScreenStore,
  useTaskInfoStore,
  useTaskLocationStore,
} from '../../../store';
import {confirmAnn, getTaskDetail} from '../../../services/api/taskService';
import {Button, Divider} from '@rneui/base';
import IconIon from 'react-native-vector-icons/Ionicons';
import {
  getCurrentDate,
  getCurrentDateTime,
} from '../../../utils/getCurrenTimeUtils';
import {Geolocation} from 'react-native-amap-geolocation';
import * as geolib from 'geolib';
import {ScrollText} from '../../../components/ScrollText';
import ImagePicker, {Image, ImageOrVideo} from 'react-native-image-crop-picker';
import {uploadImage} from '../../../services/api/OSSService';
import {OSSBaseURL} from '../../../services';
import useAuthStore from '../../../store/authStore';

type buttonType = {
  title: string;
  buttonStyle: object;
  icon: any;
  onPress: () => void;
};

type buttonsType = {
  [key: string]: buttonType[];
};

export default function TaskDetail() {
  const {screenState, setScreenState, clearScreenState} = useSubScreenStore();
  const {showDetailId, setShowDetail, clearShowDetail} = useShowDetailStore();
  const taskLocation = useTaskLocationStore();
  const {destLngLat, setDestLngLat, clearDestLngLat} = useDestinationStore();
  const {taskInfo, taskLoc, setTaskInfo, setTaskLoc} = useTaskInfoStore();
  const {userInfo} = useAuthStore();

  const Buttons: buttonsType = {
    // 定位打卡
    LocCheckIn: [
      {
        title: '导航任务点',
        buttonStyle: {borderWidth: 3},
        icon: <IconIon name="navigate" size={24} />,
        onPress: () => {
          handleNavi();
        },
      },
      {
        title: '定位打卡',
        buttonStyle: {borderWidth: 3},
        icon: <IconIon name="arrow-back" size={24} />,
        onPress: () => {
          handleLocCheckIn();
        },
      },
    ],
    // 公告通知
    AnnConfirm: [
      {
        title: '确认',
        buttonStyle: {borderWidth: 3},
        icon: <IconIon name="checkmark-circle-outline" size={24} />,
        onPress: () => {
          handleConfirm();
        },
      },
    ],
    // 人脸打卡
    FaceCheckIn: [
      {
        title: '导航任务点',
        buttonStyle: {borderWidth: 3},
        icon: <IconIon name="navigate" size={24} />,
        onPress: () => {
          handleNavi();
        },
      },
    ],
    // 照片上传
    PhotoUpload: [
      {
        title: '拍照上传',
        buttonStyle: {borderWidth: 3},
        icon: <IconIon name="camera" size={24} />,
        onPress: () => {
          handleTakePhoto();
        },
      },
      {
        title: '相册上传',
        buttonStyle: {borderWidth: 3},
        icon: <IconIon name="image-outline" size={24} />,
        onPress: () => {
          handleAlbumUpload();
        },
      },
    ],
  };

  // 按钮映射
  const buttonMap = new Map<string, buttonType[]>([
    ['定位打卡', Buttons['LocCheckIn']],
    ['公告通知', Buttons['AnnConfirm']],
    ['人脸打卡', Buttons['FaceCheckIn']],
    ['照片上传', Buttons['PhotoUpload']],
  ]);

  const updateTaskDetail = async () => {
    try {
      const response = await getTaskDetail({
        taskid: showDetailId,
      });

      setTaskInfo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 确认公告
  const handleConfirm = async () => {
    try {
      const response = await confirmAnn({
        taskid: taskInfo.id.toString(),
        time: getCurrentDateTime(),
      });
      if (response.code === 200) {
        Alert.alert('确认成功', '公告确认成功');
        clearShowDetail();
      } else {
        Alert.alert('确认失败', response.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // 定位打卡
  const handleLocCheckIn = () => {
    // 检查当前位置是否在任务点范围内
    Geolocation.getCurrentPosition(({coords}) => {
      const distance = geolib.getDistance(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        {
          latitude: parseFloat(taskInfo.lngLat.split(',')[1]),
          longitude: parseFloat(taskInfo.lngLat.split(',')[0]),
        },
      );

      if (distance < 5000) {
        Alert.alert('打卡成功', '定位点在任务点范围内');
        clearScreenState();
      } else {
        Alert.alert('打卡失败', '距离任务点过远，无法定位打卡');
      }
    });
  };
  // 导航
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

  const handleTakePhoto = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 2000,
      cropping: true,
      includeBase64: true,
    }).then(async (image: Image) => {
      // 上传图片
      const response = await uploadImage({
        filename: `${userInfo.id}_${taskInfo.id}_${getCurrentDate()}`,
        base64: `data:image/png;base64,${image.data}`,
      });
      if (response.code === 200) {
        Alert.alert('上传成功', '照片已经成功上传啦');
      } else {
        Alert.alert('上传失败', response.msg);
      }
    });
  };

  const handleAlbumUpload = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 2000,
      cropping: true,
      includeBase64: true,
    }).then(async (image: Image) => {
      // 上传图片
      const response = await uploadImage({
        filename: `${userInfo.id}_${taskInfo.id}_${getCurrentDate()}`,
        base64: `data:image/png;base64,${image.data}`,
      });
      if (response.code === 200) {
        Alert.alert('上传成功');
      } else {
        Alert.alert('上传失败', response.msg);
      }
    });
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
            <ScrollText
              styles={styles.title}
              text={`任务${taskInfo.id} - ${taskInfo.title}`}
            />
          </View>

          <Divider inset insetType="middle" style={styles.divider} />

          <Text style={styles.demand}>
            {'        '}
            {taskInfo.demand}
          </Text>

          <Text>{taskInfo.type}123</Text>
          {/* <Image
            source={{
              uri: `${OSSBaseURL}/testbase64/myphoto.jpg.jpg`,
            }}
            style={{width: 200, height: 200}}
          /> */}

          <View style={styles.buttonContainer}>
            <>
              {buttonMap.get(taskInfo.type)?.map(button => (
                <Button
                  key={button.title}
                  type="outline"
                  radius={10}
                  containerStyle={styles.button}
                  buttonStyle={button.buttonStyle}
                  icon={button.icon}
                  title={button.title}
                  onPress={button.onPress}
                />
              ))}
            </>
          </View>
        </>
      )}
    </View>
  );
}
