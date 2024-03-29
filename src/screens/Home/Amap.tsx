import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {init, Geolocation} from 'react-native-amap-geolocation';
import {MapView, MapType, Marker, Polyline, Cluster} from 'react-native-amap3d';
import {Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import {getPathPlaning} from '../../services/api/mapService';
import TaskScreen from './TaskScreen';
import BagScreen from './BagScreen';
import IconEtp from 'react-native-vector-icons/Entypo';
import {
  taskPoint,
  useCurLocationStore,
  useDestinationStore,
  useSubScreenStore,
  useTaskLocationStore,
} from '../../store';
import MenuButtons from './MenuButtons';
import InfoBar from './InfoBar';
import {
  getTaskCoords,
  sendLocIn,
  sendLocOut,
} from '../../services/api/taskService';
import useAuthStore from '../../store/authStore';
import {OSSBaseURL} from '../../services';
import {shadowStyle} from '../../style';
// import geolib from 'geolib';
import {set} from 'lodash';
import {Button} from 'react-native-elements';
import ProfileScreen from './ProfileScreen';
import RankScreen from './RankScreen';

const geolib = require('geolib');
type point = {latitude: number; longitude: number};
type points = {latitude: number; longitude: number}[];

interface taskAllInfo {
  id: number;
  title: string | null;
  demand: string | null;
  ctime: string | null;
  btime: string | null;
  dtime: string | null;
  type: string | null;
  location: string | null;
  lngLat: string;
  name: string;
  img: string;
  examplePic: string | null;
  isAI: number | null;
  setId: number | null;
  isMainline: number;
}
const iniMap = async () => {
  try {
    // 对于 Android 需要自行根据需要申请权限
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    // 检查权限是否被授予
    if (
      granted['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_COARSE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      // 使用自己申请的高德 App Key 进行初始化
      init({
        ios: 'f019fb81b5b31eb6b752adae968cea64',
        android: 'f019fb81b5b31eb6b752adae968cea64',
      });
    } else {
      // 处理权限未被授予的情况
      console.log('Location permissions not granted.');
    }
  } catch (err) {
    console.error('Error requesting location permissions:', err);
  }
};

iniMap();

export default function Amap({children, navigation}: any) {
  const myLocation = {
    latitude: 0,
    longitude: 0,
  };

  useEffect(() => {
    setCurLocation(myLocation);
  }, []);

  const [lineData, setLineData] = useState<points>([]);

  const {taskLocation, setTaskLocation} = useTaskLocationStore();

  const [screenState, setScreenState, clearScreenState] = useSubScreenStore(
    store => [store.screenState, store.setScreenState, store.clearScreenState],
  );
  const [destLngLat, setDestLngLat, clearDestLngLat] = useDestinationStore(
    store => [store.destLngLat, store.setDestLngLat, store.clearDestLngLat],
  );
  const [curLocation, taskPointsCurIn, setCurLocation, setTaskPointsCurIn] =
    useCurLocationStore(store => [
      store.curLocation,
      store.taskPointsCurIn,
      store.setCurLocation,
      store.setTaskPointsCurIn,
    ]);

  const [userInfo] = useAuthStore(store => [store.userInfo]);

  // 步行路径规划
  const pathPlaning = async ({longitude, latitude}: point) => {
    console.log(longitude, latitude);
    console.log('destination' + JSON.stringify(destLngLat));
    const response: any = await getPathPlaning({
      origin: `${longitude},${latitude}`,
      destination: `${destLngLat.longitude},${destLngLat.latitude}`,
    });
    console.log('response: ');
    console.log(JSON.stringify(response));

    // 提取经纬度点和提示信息
    const steps: any = response.route.paths[0].steps;
    const points: React.SetStateAction<points> = []; // 中间变量

    steps.forEach((step: {polyline: string; instruction: any}) => {
      const polyline = step.polyline.split(';');
      // 遍历所有经纬度点
      polyline.forEach(point => {
        const [longitude, latitude] = point.split(',');
        // 创建包含经纬度点和提示信息的对象
        const pointObj = {
          longitude: Number(longitude),
          latitude: Number(latitude),
          instruction: step.instruction,
        };
        points.push(pointObj);
      });
    });
    setLineData(points);
    console.log(points);
  };
  // 获取并设置任务点
  const putTaskMarkers = async () => {
    const response = await getTaskCoords({userid: userInfo.id.toString()});
    console.log(response.data);
    const extractedData = response.data.map((item: taskAllInfo) => {
      const [longitude, latitude] = item.lngLat.split(',');
      const lngLatObj = {
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      };

      return {
        position: lngLatObj,
        properties: {
          id: item.id,
          name: item.name,
          img: item.img,
        },
      };
    });
    console.log(extractedData);
    setTaskLocation([...extractedData]);
  };

  const naviCurTask = () => {
    Geolocation.getCurrentPosition(({coords}) => {
      console.log(coords);
      pathPlaning({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    });
  };

  // 监听目标点变化
  useEffect(() => {
    // 初值都为-1 更新了才刷新，导航当前任务点
    if (destLngLat.latitude !== -1 && destLngLat.longitude !== -1) {
      naviCurTask();
    }
  }, [destLngLat]);

  useEffect(() => {
    putTaskMarkers();
  }, []);

  // 持续获取当前位置（不能存储位置状态，会引发无限回调，原因暂时不明）

  /**
   * 定时检测当前位置
   * 检查上一次taskPointsCurIn有值吗 （有值要处理离开情况）
   * ? 处理进入、离开（之前有值）: 处理进入（之前没有值，只有进入）
   *
   */
  const checkCurInLocs = () => {
    Geolocation.getCurrentPosition(({coords}) => {
      // 计算当前坐标点是否在任务点中
      const taskPoints = taskLocation.filter(item =>
        geolib.isPointWithinRadius(
          {latitude: coords.latitude, longitude: coords.longitude},
          {
            latitude: parseFloat(item.position.latitude),
            longitude: parseFloat(item.position.longitude),
          },
          50, // 半径（米）
        ),
      );
      // 处理离开情况
      // 保存上一次的taskPointsCurIn
      // 对比两次结果，对于减少的元素,发出离开信号
      if (taskPointsCurIn.length > 0) {
        const leavePoints = taskPointsCurIn.filter(
          item =>
            !taskPoints.some(
              item2 =>
                item2.properties.id === item.properties.id &&
                item2.position.latitude === item.position.latitude &&
                item2.position.longitude === item.position.longitude,
            ),
        );
        console.log('leavePoints: ', leavePoints);
        if (leavePoints.length > 0) {
          leavePoints.forEach(async item => {
            console.log('离开点：' + item.properties.id);
            const response = await sendLocOut({
              taskid: item.properties.id,
            });
          });
        }
      }

      console.log(taskPoints);
      setTaskPointsCurIn(taskPoints);

      // 每次记录上一次的数组
      // 找出新增元素，发送信息
      if (taskPoints.length > 0) {
        const newPoints = taskPoints.filter(
          item =>
            !taskPointsCurIn.some(
              item2 =>
                item2.properties.id === item.properties.id &&
                item2.position.latitude === item.position.latitude &&
                item2.position.longitude === item.position.longitude,
            ),
        );
        newPoints.forEach(async item => {
          console.log('新增点：' + item.properties.id);
          const response = await sendLocIn({
            taskid: item.properties.id,
          });
        });
      }
    });
  };

  // 无奈之举，通过useEffect设置时钟来避免直接setInterval导致的无限回调
  const [timeSignal, setTimeSignal] = useState(0);
  useEffect(() => {
    checkCurInLocs();
    const timer = setTimeout(() => {
      setTimeSignal(timeSignal + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [timeSignal]);

  const styles = StyleSheet.create({
    subScreenContainer: {
      // 任务栏容器
      width: '90%',
      height: '80%',
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 25,
      position: 'relative',
      padding: 10,
      paddingHorizontal: 20,
      // alignItems: 'center',
      // borderWidth: 1,
      ...shadowStyle,
    },
    icon: {
      marginTop: 10,
      left: 0,
      width: 40,
      height: 40,
      // borderWidth: 3,
    },
    subScreens: {
      // 各种悬浮窗的容器
      justifyContent: 'center', // 居中
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'box-none', // 让上层view不遮挡交互
    },
    /* ------------------------------------------- */
    topContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'box-none', // 让上层view不遮挡交互
      alignItems: 'center',
    },
    leftContainer: {
      width: '1%',
      height: '100%',
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'box-none', // 让上层view不遮挡交互
      left: 0,
      justifyContent: 'center',
    },
    rightContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'box-none', // 让上层view不遮挡交互
      right: -300,
      justifyContent: 'center',
    },
    iconsContainer: {
      flexDirection: 'row',
    },
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 上边栏 */}
      <View style={styles.topContainer}>
        <InfoBar />

        <Button title={'当前位置'} onPress={checkCurInLocs} />
      </View>
      {/* 左边栏 */}
      <View style={styles.leftContainer}>
        <MenuButtons />
      </View>
      {/* 右边栏 */}
      <View style={styles.rightContainer}></View>

      {/* 悬浮窗容器（子屏幕） */}
      <View style={styles.subScreens}>
        {screenState !== '' && (
          <View style={styles.subScreenContainer}>
            <IconEtp
              style={styles.icon}
              name="cross"
              onPress={() => clearScreenState()}
              size={30}
            />
            {screenState === 'TaskScreen' && <TaskScreen />}
            {screenState === 'BagScreen' && <BagScreen />}
            {screenState === 'ProfileScreen' && <ProfileScreen />}
            {screenState === 'RankScreen' && <RankScreen />}
          </View>
        )}
      </View>

      <MapView
        buildingsEnabled={true}
        myLocationEnabled={true}
        myLocationButtonEnabled={true}
        zoomControlsEnabled={false}
        onLoad={() => {
          console.log('onLoad');
        }}
        mapType={MapType.Navi}
        initialCameraPosition={{
          target: {
            latitude: 31.674473,
            longitude: 119.5759852,
          },
          zoom: 16,
        }}>
        {/* <Cluster
          points={markerData}
          renderMarker={item => (
            <Marker
              key={item.properties.id}
              icon={require('../../assets/fish.jpg')}
              position={item.position}
            />
          )}
        /> */}

        {taskLocation.map(item => {
          return (
            <View key={item.properties.id}>
              <Text
                style={{
                  color: '#fff',
                  backgroundColor: '#009688',
                  alignItems: 'center',
                  borderRadius: 5,
                  padding: 5,
                }}>
                {item.properties.name}
              </Text>
              <Marker
                icon={{
                  uri: `${OSSBaseURL}/${item.properties.img}`,
                }}
                position={{
                  latitude: parseFloat(item.position.latitude),
                  longitude: parseFloat(item.position.longitude),
                }}
              />
              <Marker
                position={{
                  latitude: parseFloat(item.position.latitude),
                  longitude: parseFloat(item.position.longitude),
                }}>
                <Text
                  style={{
                    color: 'black',
                    height: 45,
                  }}>
                  {item.properties.name}
                </Text>
              </Marker>
            </View>
          );
        })}

        <Polyline width={5} color="rgba(255, 0, 0, 0.5)" points={lineData} />
      </MapView>
    </View>
  );
}
