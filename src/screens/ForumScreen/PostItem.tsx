import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar, Divider} from 'react-native-elements';
import {Button} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import Iconant from 'react-native-vector-icons/AntDesign';
import {OSSBaseURL} from '../../services/config';

type postItemProps = {
  id: string;
  title: string;
  content: string;
  likenum: string;
  clicknum: string;
  ctime: string;
  /* ------------------ */
  poster: string;
  avatarRelativePath: string;
};

export default function PostItem({
  id,
  title,
  content,
  likenum,
  clicknum,
  ctime,
  poster,
  avatarRelativePath,
}: postItemProps) {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    button: {
      marginHorizontal: 20,
    },
    container: {
      marginHorizontal: 20,
      marginVertical: 10,
      width: '100%',
      // borderWidth:1
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      // borderWidth: 1,
    },
    ownerName: {
      marginLeft: 5,
      fontSize: 20,
    },
    bodyContainer: {
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginVertical: 5,
    },
    content: {
      fontSize: 16,
    },
    footerContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      // borderTopWidth: 1,
      borderColor: '#eee',
    },
    IconItem: {
      flexDirection: 'row',
      marginRight: 20,
      alignItems: 'center',
    },
  });

  return (
    <>
      <Button
        radius={10}
        containerStyle={styles.button}
        type="clear"
        onPress={() => {
          // 1. 跳转到帖子详情页面
          navigation.navigate('PostDetail', {
            id: id,
            title: title,
            content: content,
            likenum: likenum,
            clicknum: clicknum,
            ctime: ctime,
            poster: poster,
            avatarRelativePath: avatarRelativePath,
          });
        }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Avatar
              rounded
              source={{
                uri: `${OSSBaseURL}/${avatarRelativePath}`,
              }}
            />
            <Text style={styles.ownerName}>{poster}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{title}</Text>
            {content.length > 30 ? (
              <Text style={styles.content}>{content.slice(0, 30)}...</Text>
            ) : (
              <Text style={styles.content}>{content}</Text>
            )}
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.IconItem}>
              <Iconant name="like1" size={20} color="#000" />
              <Text>{likenum}</Text>
            </View>
            <View style={styles.IconItem}>
              <Iconant name="eye" size={20} color="#000" />
              <Text>{clicknum}</Text>
            </View>
            <Text style={{position: 'absolute', right: 10}}>
              {ctime.substring(0, 10) + ' ' + ctime.substring(11, 19)}
            </Text>
          </View>
        </View>
      </Button>

      <Divider inset insetType="middle" />
    </>
  );
}
