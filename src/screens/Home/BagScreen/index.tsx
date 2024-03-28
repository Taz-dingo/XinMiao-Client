import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getBagInfo} from '../../../services/api/userService';
import {OSSBaseURL} from '../../../services';

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
      {data.item && <Text style={styles.itemName}>{data.item.name}</Text>}
    </View>
  );

  const updateBagData = async () => {
    try {
      const response = await getBagInfo({});
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
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#333',
    },
    infoContainer: {
      // 介绍物品信息
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      marginBottom: 20,
      padding: 10,
      position: 'relative',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'gray',
    },
    itemImage: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    flatList: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      // flex: 1,
      padding: 5,
      height: 400,
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      aspectRatio: 1, // 保持格子为正方形
      backgroundColor: '#ddd',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 1,
      margin: 2, // 调整格子之间的间距
    },
    itemName: {
      fontSize: 12,
    },
  });

  return (
    <View
      style={
        {
          // flex: 1,
          // borderWidth: 1
        }
      }>
      <Text style={styles.title}>{'背  包'}</Text>
      <View style={styles.infoContainer}>
        <Text
          style={{
            fontSize: 16,
            color: '#333',
            position: 'absolute',
            top: 0,
            left: 10,
            marginVertical: 10,
            // overflow: 'hidden',
          }}>
          这里是物品信息
        </Text>
      </View>
      <FlatList
        data={gridsArray}
        numColumns={5} // 每行显示3列，可以根据需要调整
        renderItem={({item}) => <ItemComp data={item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
}
