import PostList from './PostList';
import {SearchBar} from '@rneui/themed';
import Carousel from './Carousel';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ForumStack = createNativeStackNavigator();

export default function ForumStackScreen() {
  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
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
      <ScrollView>
        <PostList type="all" />
      </ScrollView>
    </View>
  );
}
