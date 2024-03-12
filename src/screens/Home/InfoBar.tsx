import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {shadowStyle} from '../../style';

export default function InfoBar() {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '50%',
      height: 40,
      borderColor: 'black',
      borderRadius: 10,
      textAlign: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      margin: 10,
      ...shadowStyle,
    },
    infoText: {
      fontSize: 18,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>当前任务：</Text>
    </View>
  );
}
