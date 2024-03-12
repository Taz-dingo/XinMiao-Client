import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PostItem from './PostItem';

export default function PostList() {
  const data = [
    {
      id: 1,
      title: 'Post 1',
      content: 'This is the content of post 1.',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the content of post 3.',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'This is the content of post 3.',
    },
    {
      id: 4,
      title: 'Post 4',
      content: 'This is the content of post 4.',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
  });
  return (
    <View style={styles.container}>
      {data.map(item => {
        return (
          <PostItem key={item.id} title={item.title} content={item.content} />
        );
      })}
    </View>
  );
}
