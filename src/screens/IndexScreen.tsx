import {View, Text, Button} from 'react-native';
import React from 'react';
import {MapView, MapType, Marker} from 'react-native-amap3d';
import {Platform} from 'react-native';
import {AMapSdk} from 'react-native-amap3d';
import {PermissionsAndroid} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';

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

Geolocation.getCurrentPosition(({coords}) => {
  Location.latitude = coords.latitude;
  Location.longitude = coords.longitude;
});

export default function IndexScreen(navigation: any) {
  return (
    <MapView
      myLocationEnabled={true}
      myLocationButtonEnabled={true}
      onLoad={() => {
        console.log('onLoad');
        Geolocation.getCurrentPosition(({coords}) => {
          console.log(coords);
        });
      }}
      mapType={MapType.Satellite}
      initialCameraPosition={{
        target: {
          latitude: Location.latitude,
          longitude: Location.longitude,
        },
        zoom: 8,
      }}>
      <Marker
        position={{latitude: 39.806901, longitude: 116.397972}}
        icon={require('../assets/fish.jpg')}
        onPress={() => alert('onPress')}
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
    </MapView>
  );
}
