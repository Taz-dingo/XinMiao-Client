import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-elements';

export const CommentArea = () => {
  const commentList = [
    {
      id,
    },
  ];

  const styles = StyleSheet.create({
    midContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

  return (
    <>
      {commentList.map((item: any, index: number) => {
        return (
          <>
            <Avatar />
            <View style={styles.midContainer}>
              <Text>评论人：{item.creatorname}</Text>
              <Text>{item.ctime}</Text>
              <Text>{item.contain}</Text>
            </View>
            <Text>title</Text>
            <Text>content</Text>
          </>
        );
      })}
    </>
  );
};
