import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import {init, Geolocation} from 'react-native-amap-geolocation';
import {MapView, MapType, Marker, Polyline, Cluster} from 'react-native-amap3d';
import {Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import {getPathPlaning} from '../../services/api/mapService';
import TaskScreen from './TaskScreen/Index';
import {useSubScreenStore} from '../../store';
import MenuButtons from './MenuButtons';
import InfoBar from './InfoBar';
import {getTaskCoords} from '../../services/api/taskService';
import {ClusterPoint} from 'react-native-amap3d/lib/src/cluster';
import {Button} from '@rneui/base';

type point = {latitude: number; longitude: number}[];

export default function Amap({children, navigation}: any) {
  const markers = Array(1000)
    .fill(0)
    .map((_, i) => ({
      position: {
        latitude: 39.5 + Math.random(),
        longitude: 116 + Math.random(),
      },
      properties: {key: `Marker${i}`},
    }));
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
  const Location = {
    latitude: 0,
    longitude: 0,
  };

  Geolocation.watchPosition(({coords}) => {
    Location.latitude = coords.latitude;
    Location.longitude = coords.longitude;
    // console.log(Location);
  });

  const [lineData, setLineData] = useState<point>([]);

  const [markerData, setMarkerData] = useState<ClusterPoint[]>([]);

  const [screenState, setScreenState, clearScreenState] = useSubScreenStore(
    store => [store.screenState, store.setScreenState, store.clearScreenState],
  );
  // 步行路径规划
  const pathPlaning = async () => {
    const response: any = await getPathPlaning({
      origin: `${Location.longitude},${Location.latitude}`,
      destination: '119.580577,31.67414',
    });
    console.log('response: ');
    console.log(JSON.stringify(response));

    // 提取经纬度点和提示信息
    const steps = response.route.paths[0].steps;
    const points = [];

    steps.forEach(step => {
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
    const response = await getTaskCoords({userid: '1111111111'});
    console.log(response.data);
    const extractedData = response.data.map(
      (item: {
        lngLat: {split: (arg0: string) => [string, string]};
        id: string;
        name: string;
      }) => {
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
          },
        };
      },
    );
    console.log(extractedData);
    setMarkerData([...extractedData]);
    console.log(markerData);
  };

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
        <MenuButtons pathPlaning={pathPlaning} />
      </View>
      {/* 右边栏 */}
      <View style={styles.rightContainer}></View>

      {/* 悬浮窗容器（子屏幕） */}
      <View style={styles.subScreens}>
        {screenState === 'TaskScreen' && <TaskScreen />}
      </View>

      <MapView
        buildingsEnabled={true}
        myLocationEnabled={true}
        myLocationButtonEnabled={true}
        zoomControlsEnabled={false}
        onLoad={() => {
          console.log('onLoad');
          putMarker();
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

        {markerData.map(item => {
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
                icon={require('../../assets/fish.jpg')}
                position={{
                  latitude: item.position.latitude,
                  longitude: item.position.longitude,
                }}></Marker>
            </View>
          );
        })}

        <Polyline width={5} color="rgba(255, 0, 0, 0.5)" points={lineData} />
      </MapView>
    </View>
  );
}
