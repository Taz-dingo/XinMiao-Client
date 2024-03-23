import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import ForumStackScreen from './ForumStackScreen';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import IconEtp from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';

import {Picker} from '@react-native-picker/picker';
import {Button, Input, Tab, TabView} from '@rneui/base';
import {postNormal, postTask} from '../../services/api/forumService';
import useAuthStore from '../../store/authStore';
import {AxiosResponse} from 'axios';
import PostList from './PostList';

const TabNavi = createBottomTabNavigator();

export default function ForumScreen() {
  return (
    <TabNavi.Navigator
      initialRouteName="ForumHome"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Post') {
            iconName = focused ? 'circle-with-plus' : 'circle-with-plus';
            size = 30;
          } else if (route.name === 'My') {
            iconName = focused ? 'user' : 'user';
          }

          if (route.name === 'My')
            return <IconAnt name={iconName} size={size} color={color} />;

          return <IconEtp name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <TabNavi.Screen
        name="Home"
        options={{headerShown: false}}
        component={ForumStackScreen}
      />
      <TabNavi.Screen
        name="Post"
        options={{headerShown: false}}
        component={PostScreen}
      />
      <TabNavi.Screen
        name="My"
        options={{headerShown: false}}
        component={MyScreen}
      />
    </TabNavi.Navigator>
  );
}

const PostScreen = () => {
  const [selectedValue, setSelectedValue] = useState('normal');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userInfo] = useAuthStore(store => [store.userInfo]);

  const handlePost = async () => {
    // 首先检测是否都填写了
    if (title === '' || content === '') {
      Alert.alert('请填写完整信息');
      return;
    }

    // 然后根据不同类型发表不同帖子
    try {
      if (selectedValue === 'normal') {
        console.log('normal');
        const response: any = await postNormal({
          creator: userInfo.id.toString(),
          title: title,
          contain: content,
          ctime: new Date().getTime().toString(),
        });
        if (response.code === 200) {
          Alert.alert('发表成功');
        } else {
          Alert.alert('发表失败，请稍后再试');
        }
      } else if (selectedValue === 'task') {
        // 暂时不支持发布任务帖
        // const response = await postTask({});
        console.log('task');
      }
    } catch (e) {
      Alert.alert('发表失败，请稍后再试');
    }
    // 清空表单，并返回首页
    setSelectedValue('normal');
    setTitle('');
    setContent('');
  };

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
  });
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={styles.title}>帖子类型</Text>
      <Picker
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="常规帖" value="normal" />
        <Picker.Item label="任务帖" value="task" />
      </Picker>
      {selectedValue === 'task' && (
        <>
          <Text style={styles.title}>对应任务</Text>
          <Picker>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C++" value="cpp" />
          </Picker>
        </>
      )}

      <Text style={styles.title}>标题</Text>
      <Input
        placeholder="请输入标题"
        value={title}
        onChangeText={value => setTitle(value)}
      />
      <Text style={styles.title}>内容</Text>
      <Input
        placeholder="请输入帖子内容"
        value={content}
        multiline={true}
        numberOfLines={10}
        onChangeText={value => setContent(value)}
        style={{
          textAlignVertical: 'top',
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
        }}
        value={content}
      />

      <Button
        buttonStyle={{
          borderRadius: 10,
        }}
        title="发表帖子"
        onPress={() => handlePost()}
      />
    </View>
  );
};

const MyScreen = () => {
  const [index, setIndex] = React.useState(0);
  const styles = StyleSheet.create({
    tabItemContainer: {},
  });
  const items = [
    {
      title: '我的帖子',
      icon: {name: 'timer', type: 'ionicon', color: 'white'},
    },
    {
      title: '我的收藏',
      icon: {name: 'bookmark', type: 'Feather', color: 'white'},
    },
    {
      title: '回复我的',
      icon: {name: 'cart', type: 'ionicon', color: 'white'},
    },
  ];
  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'gray',
          height: 3,
        }}
        variant="default">
        {items.map((item, index) => {
          return (
            <Tab.Item
              key={index}
              title={item.title}
              containerStyle={active => ({
                backgroundColor: active ? 'tomato' : '#rgba(128,128,128,0.8)',
              })}
              titleStyle={{fontSize: 12, color: 'white'}}
              icon={item.icon}
            />
          );
        })}
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{}}>
          <ScrollView>
            <PostList type="userOnly" />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{flex: 1}}>
          <ScrollView style={{backgroundColor: 'white'}}>
            <PostList type="userCollect" />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{flex: 1}}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};
