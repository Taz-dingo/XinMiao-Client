import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import PostList from './PostList';
import {SearchBar} from '@rneui/themed';

export default function ForumScreen() {
  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
  };
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: 'white',
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
      <PostList />
    </View>
  );
}
