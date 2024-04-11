import PostList from './PostList';
import {SearchBar} from '@rneui/themed';
import Carousel from './Carousel';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useForumStore} from '../../store/forumStore';
import {throttle} from '../../utils/throttleAndDebounceUtils';

const ForumStack = createNativeStackNavigator();

export default function ForumStackScreen() {
  const [search, setSearch] = useState('');
  const {curPage, setCurPage} = useForumStore();

  const updateSearch = (search: string) => {
    setSearch(search);
  };
  const throttledAddCurPage = () => {
    throttle(() => setCurPage(curPage + 1), 1000);
  };

  const handleAddPost = () => {
    // 页码++
    // throttledAddCurPage();
    setCurPage(curPage + 1);
    console.log('add post', curPage);
  };

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: 'white',
      borderWidth: 1,
    },
  });
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="请输入..."
        onChangeText={search => updateSearch(search)}
        round
        lightTheme
        containerStyle={{backgroundColor: 'white'}}
        value={search}
      />
      <Carousel />
      <ScrollView
        onScrollEndDrag={() => {
          handleAddPost();
        }}>
        <PostList type="all" />
      </ScrollView>
    </View>
  );
}
