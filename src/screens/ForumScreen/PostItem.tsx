import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar, Divider} from 'react-native-elements';

type postItemProps = {
  title: string;
  content: string;
};

export default function PostItem({title, content}: postItemProps) {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ownerName: {
      marginLeft: 5,
      fontSize: 20,
    },
    bodyContainer: {
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    content: {
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
        />
        <Text style={styles.ownerName}>owner</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <Divider />
    </View>
  );
}
