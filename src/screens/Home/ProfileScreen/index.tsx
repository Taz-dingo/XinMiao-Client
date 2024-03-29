import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPersonalInfo} from '../../../services/api/userService';
import {Avatar, Icon} from 'react-native-elements';
import {OSSBaseURL} from '../../../services';
import IconFA from 'react-native-vector-icons/FontAwesome';
type ListItem = {
  text: string;
  value: string;
};

/**个人信息页面 */
export default function Index() {
  const [userInfo, setUserInfo] = useState<Partial<API.getPersonalInfoResult>>(
    {},
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPersonalInfo({});
      if (response.code === 200) {
        setUserInfo(response.data);
      }
    };
    fetchData();
  }, []);

  const List: ListItem[] = [
    {
      text: '班级号',
      value: userInfo.classId || '',
    },
    {
      text: '性别',
      value: userInfo.sex || '',
    },
    {
      text: '生日',
      value: userInfo.birthday?.slice(0, 10) || '',
    },
    {
      text: '电话',
      value: userInfo.tel || '',
    },
    {
      text: '邮箱',
      value: userInfo.email || '',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      borderWidth: 1,
    },
    icon: {
      width: 40,
      height: 40,
      borderWidth: 1,
      position: 'absolute',
      top: -20,
      zIndex: 99999,
    },
    headerContainer: {
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    id: {
      color: '#888',
      fontSize: 15,
      marginLeft: 10,
      marginBottom: 5,
    },
    name: {
      color: '#333',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },

    bodyContainer: {},
    listItem: {
      marginBottom: 20,
      // flexDirection: 'row',
      // alignItems: 'center',
    },
    text: {
      color: '#333',
      fontSize: 18,
      marginLeft: 10,
    },
    value: {
      color: '#666',
      fontSize: 16,
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* 修改按钮 */}

      <View style={styles.headerContainer}>
        <Avatar
          rounded
          size="large"
          source={{uri: `${OSSBaseURL}/${userInfo.img}`}}
        />
        <View>
          <Text style={styles.id}>{userInfo.id}</Text>
          <Text style={styles.name}>{userInfo.name}</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        {List.map((item, index) => (
          <View style={styles.listItem} key={index}>
            <Text style={styles.text}>{item.text}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
      <IconFA style={styles.icon} name="edit" size={30} color="#333" />
    </View>
  );
}
