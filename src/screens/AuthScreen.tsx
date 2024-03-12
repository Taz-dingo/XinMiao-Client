import {View, Text} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from '@rneui/themed';

// 身份认证
// 需要上传图片、输入身份证号
export default function AuthScreen(navigation: any) {
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      ({didCancel}) => {
        // 处理回调
        if (didCancel) console.log('canceled');
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        // console.log(response.assets[0].uri);
      },
    );
  };

  return (
    <View>
      <Button onPress={openCamera}>打开相机</Button>
      <Button onPress={openGallery}>打开相册</Button>
    </View>
  );
}
