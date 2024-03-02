import {View, Text, PermissionsAndroid, Button} from 'react-native';
import React, {useState} from 'react';
import {init, Geolocation} from 'react-native-amap-geolocation';
import {MapView, MapType, Marker, Polyline} from 'react-native-amap3d';
import {Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import {getPathPlaning} from '../../services/api/mapService';

import responseExample from './responseExample.json';
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
});

const line1 = [
  {latitude: 40.006901, longitude: 116.097972},
  {latitude: 40.006901, longitude: 116.597972},
];

const line2 = [
  {latitude: 39.906901, longitude: 116.097972},
  {latitude: 39.906901, longitude: 116.597972},
];

const line3 = [
  {latitude: 39.806901, longitude: 116.097972},
  {latitude: 39.806901, longitude: 116.257972},
  {latitude: 39.806901, longitude: 116.457972},
  {latitude: 39.806901, longitude: 116.457972},
  {latitude: 39.80901, longitude: 116.457972},
  {latitude: 39.806901, longitude: 116.4579723},
  {latitude: 49.80901, longitude: 116.597972},
];

const line4 = [
  {latitude: 31.240326, longitude: 121.432648},
  {latitude: 31.240017, longitude: 121.433585},
  {latitude: 31.240017, longitude: 121.433585},
  {latitude: 31.239931, longitude: 121.433841},
  {latitude: 31.239931, longitude: 121.433841},
  {latitude: 31.239809, longitude: 121.434201},
  {latitude: 31.239809, longitude: 121.434201},
  {latitude: 31.239731, longitude: 121.434371},
  {latitude: 31.239731, longitude: 121.434371},
  {latitude: 31.239714, longitude: 121.434401},
  {latitude: 31.239627, longitude: 121.434566},
];

type line = {latitude: number; longitude: number}[];
export default function Amap({children}: any) {
  const [lineData, setLineData] = useState<line>([]);
  const pathPlaning = async () => {
    const response: any = await getPathPlaning({
      origin: `${Location.longitude},${Location.latitude}`,
      destination: '121.43464,31.239541',
    });
    console.log('response: ');
    console.log(JSON.stringify(response));

    response.route.paths[0].steps.forEach(step => {
      const locArr = step.polyline.split(';'); // 分割成N个坐标
      console.log('locArr :');
      console.log(locArr);
      const locs = locArr.map(loc => {
        const locArr = loc.split(','); // 坐标分割成经、纬度数组
        return {longitude: +locArr[0], latitude: +locArr[1]}; // 第一个是经度longtitude、第二个是维度latitude
      });
      console.log('locs :');
      console.log(locs);
      setLineData(locs);
    });
    console.log(lineData);
    console.log('--------------------');
    // console.log(line3);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View>
        <Text>{Location.latitude}</Text>
        <Button title="getPath" onPress={pathPlaning}></Button>
      </View>
      <MapView
        myLocationEnabled={true}
        myLocationButtonEnabled={true}
        onLoad={() => {
          console.log('onLoad');
          Geolocation.watchPosition(({coords}) => {
            console.log(coords.longitude, coords.latitude);
          });
        }}
        mapType={MapType.Navi}
        initialCameraPosition={{
          target: {
            latitude: Location.latitude,
            longitude: Location.longitude,
          },
          zoom: 8,
        }}>
        <Marker
          position={{latitude: 39.806901, longitude: 116.397972}}
          icon={require('../../assets/fish.jpg')}
          onPress={() => {
            Alert.alert('onPress');
          }}
        />
        <Marker
          position={{latitude: 39.806901, longitude: 116.297972}}
          icon={{
            uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png',
            width: 64,
            height: 64,
          }}
        />
        <Marker position={{latitude: 39.906901, longitude: 116.397972}}>
          <Text
            style={{
              color: '#fff',
              backgroundColor: '#009688',
              alignItems: 'center',
              borderRadius: 5,
              padding: 5,
            }}>
            {new Date().toLocaleString()}
          </Text>
        </Marker>
        <Polyline
          width={5}
          color="rgba(255, 0, 0, 0.5)"
          points={lineData}></Polyline>
      </MapView>
    </View>
  );
}
