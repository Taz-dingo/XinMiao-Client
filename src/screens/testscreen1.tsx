import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {
  Camera,
  Frame,
  runAsync,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
// import {
//   detectFaces,
//   DetectionResult,
// } from 'react-native-vision-camera-face-detector';
// import {Worklets} from 'react-native-worklets-core';

export default function FaceRecognitionPunch() {
  const device = useCameraDevice('front');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log({status});
    })();
  }, [device]);

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   console.log("I'm running synchronously at 60 FPS!");

  //   runAsync(frame, () => {
  //     'worklet';
  //     console.log("I'm running asynchronously, possibly at a lower FPS rate!");
  //   });
  // }, []);

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      // frameProcessor={frameProcessor}
    />
  );
}
