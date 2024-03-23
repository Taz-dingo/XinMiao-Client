import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSubScreenStore} from '../../store';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import {Icon} from 'react-native-elements';
import {StackNavigationState, useNavigation} from '@react-navigation/native';



export default function MenuButtons() {
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

  const items = [
    {
      name: '任务',
      icon: {
        name: 'book',
        type: 'font-awesome',
        color: 'rgba(255,153,51,0.9)',
        size: 40,
      },
      onPress: () => {
        // 打开任务栏
        setScreenState('TaskScreen');
      },
    },

    {
      name: '论坛',
      icon: {
        name: 'chat',
        type: 'Entypo',
        color: 'rgba(255,153,51,0.9)',
        size: 40,
      },
      onPress: () => {
        // 打开论坛栏
        navigation.navigate('Forum');
      },
    },

    {
      name: '背包',
      icon: {
        name: 'backpack',
        type: 'MaterialIcons',
        color: 'rgba(255,153,51,0.9)',
        size: 40,
      },
      onPress: () => {
        setScreenState('BagScreen');
      },
    },
  ];

  return (
    <View style={styles.iconsContainer}>
      {items.map((item, index) => {
        return (
          <View key={index} style={styles.icon}>
            <Icon
              name={item.icon.name}
              type={item.icon.type}
              style={{pointerEvents: 'auto'}}
              onPress={item.onPress}
              size={40}
              color="rgba(255,153,51,0.9)"
            />
            <Text style={styles.iconText}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
