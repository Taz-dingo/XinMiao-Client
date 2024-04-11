import React, {Component, useState} from 'react';
import {Button, ListItem} from 'react-native-elements';
import {useShowClosedStore, useShowDetailStore} from '../../../store';
import {MyTouchable} from '../../../components/MyTouchable';

type TaskProps = {
  id: number;
  title: string;
  demand: string;
  type: string;
  isfinish: string;
  dtime: string;
};
/**任务组件 */
export default function Task({
  id,
  title,
  demand,
  type,
  isfinish,
  dtime,
}: TaskProps) {
  const [showDetailId, setShowDetail] = useShowDetailStore(state => [
    state.showDetailId,
    state.setShowDetail,
  ]);
  const [isExpired, setIsExpired] = useState(
    // 是否过期
    new Date(dtime.replace(' ', 'T')).getTime() < new Date().getTime(),
  );
  const {showClosed, setShowClosed} = useShowClosedStore();

  const getColor = ({isfinish, dtime}: {isfinish: string; dtime: string}) => {
    if (isfinish === '1') {
      return 'rgba(33,33,33,0.1)'; // 已完成
    }
    if (
      // 转化回时间码比较，当前时间大于截止时间
      isfinish === '0' &&
      isExpired === true
    ) {
      return 'rgba(256,33,33,0.1)'; // 未完成且已过期
    }

    if (isfinish === '0') {
      return 'rgba(255,255,255,0.1)'; // 未完成
    }
  };

  return (
    <ListItem
      Component={MyTouchable}
      containerStyle={{
        // backgroundColor: 'rgba(255,255,255,0)',
        backgroundColor: getColor({isfinish, dtime}),
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '85%',
        marginBottom: 10,
      }}
      onPress={() => {
        setShowDetail(id.toString());
        console.log(showDetailId);
      }}
      bottomDivider>
      <ListItem.Content
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ListItem.Title style={{textAlign: 'left'}}>
          任务{id} - {title}
        </ListItem.Title>
        {/* 右侧显示完成、过期 */}
        <ListItem.Subtitle
          style={{
            textAlign: 'right',
            color: isfinish === '1' ? 'gray' : 'rgba(255,55,55,0.8)',
          }}>
          {isfinish === '1' ? '已完成' : <>{isExpired && '已过期'}</>}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
