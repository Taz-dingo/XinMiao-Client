import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {shadowStyle} from '../../style';
import {useTaskInfoStore} from '../../store';
import {Tooltip} from '@rneui/themed';

export default function InfoBar() {
  const taskInfo = useTaskInfoStore(store => store.taskInfo);
  const [open, setOpen] = useState(false);

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
      <Tooltip
        visible={open}
        containerStyle={{
          backgroundColor: 'rgba(33,33,33,0.8)',
          width: 200,
          height: 300,
        }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        popover={<Text style={{color: '#fff'}}>{taskInfo.demand}</Text>}>
        {!open && (
          <>
            {taskInfo.title !== '' ? (
              <Text>当前任务： {taskInfo.title}</Text>
            ) : (
              <Text>当前无任务噢，快去添加吧！</Text>
            )}
          </>
        )}
      </Tooltip>
    </View>
  );
}
