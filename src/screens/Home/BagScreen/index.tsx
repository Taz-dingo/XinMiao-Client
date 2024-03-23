import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getBagInfo} from '../../../services/api/personalService';
import {OSSBaseURL} from '../../../services/config';

interface item {
  id: number; // 物品id
  name: string; // 物品名称
  desc: string; // 描述
  creator: string; // 创建者
  ctime: string; // 创建时间
  dtime: string; // 到期时间
  stackLimit: number; // 堆叠上限
  img: string; // 物品图片
  ownNum: number; // 物品数量
  userId: string; // 用户id
  possPk: number; // 可能的pk
}

interface gridData {
  id: number;
  item: item;
}

export default function index() {
  // const gridsArray: gridData[] =

  const [gridsArray, setGridsArray] = useState<gridData[]>(
    new Array(30).fill(null).map((_, index) => ({
      id: index + 1,
      item: {
        id: index + 1,
        name: '',
        desc: '',
        creator: '',
        ctime: '',
        dtime: '',
        stackLimit: 0,
        img: '',
        ownNum: 0,
        userId: '',
        possPk: 0,
      },
    })),
  );

  const ItemComp = ({data}: {data: gridData}) => (
    <View style={styles.item}>
      <Image
        style={styles.itemImage}
        source={{uri: `${OSSBaseURL}/${data.item.img}`}}
      />
      {data.item && <Text>{data.item.name}</Text>}
    </View>
  );

  const updateBagData = async () => {
    try {
      const response = await getBagInfo();
      // 获取到多少个数据，就更新多少个格子的item部分
      // 数组总量保持不变，只更新item部分
      // 这里假设获取到的response.data是一个数组，每个元素是一个item对象

      // 创建一个新的数组，确保状态的引用发生变化
      const newGridsArray = gridsArray.map((grid, index) => {
        const item = response.data[index];
        if (item) {
          return {...grid, item};
        }
        return grid;
      });

      // 更新状态，触发组件重新渲染
      setGridsArray(newGridsArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 获取背包信息
    updateBagData();
  }, []);

  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
    },
    itemImage: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      aspectRatio: 1, // 保持格子为正方形
      margin: 1, // 调整格子之间的间距
      backgroundColor: '#f9c2ff',
      height: 100, // 可根据需要调整格子的高度
    },
  });

  return (
    <FlatList
      data={gridsArray}
      numColumns={5} // 每行显示3列，可以根据需要调整
      renderItem={({item}) => <ItemComp data={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
}
