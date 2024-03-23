import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {init, Geolocation} from 'react-native-amap-geolocation';
import {MapView, MapType, Marker, Polyline, Cluster} from 'react-native-amap3d';
import {Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import {getPathPlaning} from '../../services/api/mapService';
import TaskScreen from './TaskScreen';
import {
  useCurLocationStore,
  useDestinationStore,
  useSubScreenStore,
  useTaskLocationStore,
} from '../../store';
import MenuButtons from './MenuButtons';
import InfoBar from './InfoBar';
import {getTaskCoords} from '../../services/api/taskService';
import useAuthStore from '../../store/authStore';
import {OSSBaseURL} from '../../services/config';

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

export default function Amap({children, navigation}: any) {
  const iniMap = () => {
    // 对于 Android 需要自行根据需要申请权限
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    // 使用自己申请的高德 App Key 进行初始化
    init({
      ios: 'f019fb81b5b31eb6b752adae968cea64',
      android: 'f019fb81b5b31eb6b752adae968cea64',
    });
  };
  iniMap();

  const myLocation = {
    latitude: 0,
    longitude: 0,
  };

  Geolocation.watchPosition(({coords}) => {
    myLocation.latitude = coords.latitude;
  });

  useEffect(() => {
    setCurLocation(myLocation);
  }, []);

  const [lineData, setLineData] = useState<points>([]);

  const [taskLocation, setTaskLocation] = useTaskLocationStore(store => [
    store.taskLocation,
    store.setTaskLocation,
  ]);

  const [screenState, setScreenState, clearScreenState] = useSubScreenStore(
    store => [store.screenState, store.setScreenState, store.clearScreenState],
  );
  const [destLngLat, setDestLngLat, clearDestLngLat] = useDestinationStore(
    store => [store.destLngLat, store.setDestLngLat, store.clearDestLngLat],
  );
  const [curLocation, setCurLocation] = useCurLocationStore(store => [
    store.curLocation,
    store.setCurLocation,
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
    const points = [];

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
  const putMarker = async () => {
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

  useEffect(() => {
    // 初值都为-1 更新了才刷新
    if (destLngLat.latitude !== -1 && destLngLat.longitude !== -1)
      Geolocation.getCurrentPosition(({coords}) => {
        console.log(coords);
        pathPlaning({
          longitude: coords.longitude,
          latitude: coords.latitude,
        });
      });
  }, [destLngLat]);

  useEffect(() => {
    putMarker();
  }, []);

  const styles = StyleSheet.create({
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
      </View>
      {/* 左边栏 */}
      <View style={styles.leftContainer}>
        <MenuButtons />
      </View>
      {/* 右边栏 */}
      <View style={styles.rightContainer}></View>

      {/* 悬浮窗容器（子屏幕） */}
      <View style={styles.subScreens}>
        {screenState === 'TaskScreen' && <TaskScreen />}
        {screenState === 'BagScreen' && <TaskScreen />}
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
