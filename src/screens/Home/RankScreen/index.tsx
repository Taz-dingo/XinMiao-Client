import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getRankList} from '../../../services/api/userService';
import {Avatar, Button} from 'react-native-elements';
import {OSSBaseURL} from '../../../services';

export default function index() {
  const [RankData, setRankData] = useState<API.getRankListResult>([]);
  const Buttons = [
    {title: '速通榜', onPress: () => {}},
    {title: '积分榜', onPress: () => {}},
  ];

  const updateRankData = async () => {
    const response = await getRankList();
    if (response.code === 200) {
      setRankData(response.data);
    }
  };

  useEffect(() => {
    updateRankData();
  }, []);

  const styles = StyleSheet.create({
    container: {},
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 80,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
      paddingBottom: 20,
    },
    button: {
      borderRadius: 5,
      borderWidth: 1,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    rankNum: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      color: '#333',
      marginLeft: 10,
    },
    score: {
      fontSize: 16,
      color: '#999',
      marginLeft: 10,
    },
  });

  return (
    <View>
      <View style={styles.buttonsContainer}>
        {Buttons.map(item => (
          <Button
            key={item.title}
            title={item.title}
            type="outline"
            buttonStyle={styles.button}
            onPress={item.onPress}
          />
        ))}
      </View>
      <ScrollView>
        {RankData &&
          RankData.map((item, index) => {
            return (
              <View style={styles.itemContainer} key={item.userid}>
                <Text style={styles.rankNum}>{index + 1}</Text>
                <Avatar
                  size={'medium'}
                  rounded
                  source={{uri: `${OSSBaseURL}/${item.img}`}}
                />
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.score}>完成数：{item.passnum}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
