import {View, Text, Button} from 'react-native';
import React from 'react';
import {MapView, MapType, Marker} from 'react-native-amap3d';
import {Platform} from 'react-native';
import {AMapSdk} from 'react-native-amap3d';
import {PermissionsAndroid} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';

AMapSdk.init(
  Platform.select({
    android: 'f019fb81b5b31eb6b752adae968cea64',
  }),
);

export default function IndexScreen(navigation: any) {
  return (
    <MapView
      myLocationEnabled
      onLoad={() => console.log('onLoad')}
      onPress={({nativeEvent}) => console.log(nativeEvent)}
      onCameraIdle={({nativeEvent}) => console.log(nativeEvent)}
      onLocation={({nativeEvent}) =>
        console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
      }
      mapType={MapType.Satellite}
      initialCameraPosition={{
        target: {
          latitude: 39.91095,
          longitude: 116.37296,
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
