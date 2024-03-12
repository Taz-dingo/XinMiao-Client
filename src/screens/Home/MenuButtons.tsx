import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSubScreenStore} from '../../store';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

type MenuButtonsProps = {
  pathPlaning: () => void;
};

export default function MenuButtons({pathPlaning}: MenuButtonsProps) {
  const setScreenState = useSubScreenStore(store => store.setScreenState);
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    iconsContainer: {
      flexDirection: 'column',
    },
    icon: {
      margin: 5,
      width: 50,
      alignItems: 'center',
      flexDirection: 'column',
      // backgroundColor: 'black',
    },
    iconText: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.icon}>
        <IconFA6
          name="book-tanakh"
          style={{pointerEvents: 'auto'}}
          onPress={() => {
            // 打开任务栏
            setScreenState('TaskScreen');
          }}
          size={40}
          color="rgba(255,153,51,0.9)"
        />
        <Text style={styles.iconText}>任务</Text>
      </View>
      <View style={styles.icon}>
        <IconFA6
          name="rocket"
          size={40}
          color="rgba(255,153,51,0.9)"
          onPress={pathPlaning}
        />
        <Text style={styles.iconText}>火箭</Text>
      </View>
      <View style={styles.icon}>
        <IconFA6
          name="house"
          size={40}
          color="rgba(255,153,51,0.9)"
          onPress={() => navigation.navigate('Forum')}
        />
        <Text style={styles.iconText}>论坛</Text>
      </View>
    </View>
  );
}
