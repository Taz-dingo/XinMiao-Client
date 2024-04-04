import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Icon} from 'react-native-elements';
import Iconant from 'react-native-vector-icons/AntDesign';
import {f} from '../../oss/aliyun-oss-sdk';
import {
  getPostComments,
  likePost,
  postComment,
} from '../../services/api/forumService';
import {OSSBaseURL} from '../../services';
import {Button, Input, SpeedDial} from '@rneui/base';
import useAuthStore from '../../store/authStore';
import {set} from 'lodash';
import {useForumStore} from '../../store/forumStore';
import {CommentArea} from './CommentArea';

interface PostItemSceenProps {
  route: any;
  navigation: any;
}
/**id,
    title,
    content,
    likenum,
    clicknum,
    ctime,
    poster,
    posterId,
    avatarRelativePath, */
interface PostItemProps {
  id: string;
  title: string;
  content: string;
  likenum: string;
  clicknum: string;
  ctime: string;
  poster: string;
  posterId: string;
  avatarRelativePath: string;
}

export default function PostDetail({route, navigation}: PostItemSceenProps) {
  const [PostArea, setPostArea] = useState<PostItemProps>(route.params);
  const [comment, setComment] = useState<string>('');
  const [userInfo] = useAuthStore(store => [store.userInfo]);
  const {
    commentUpdateSignal,
    postListUpdateSignal,
    setCommentUpdateSignal,
    setPostListUpdateSignal,
  } = useForumStore();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      // borderWidth: 1,
    },
    postContainer: {},
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    ownerName: {
      marginLeft: 20,
      fontSize: 22,
      fontWeight: 'bold',
    },
    bodyContainer: {
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    content: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 60,
      height: 40,
      borderTopWidth: 1,
      borderColor: '#eee',
    },
    IconItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    commentFooter: {
      flexDirection: 'row',
    },
  });

  // 如果是父评论，传入null，否则传入评论内容
  const handleComement = async (faComment: number | null) => {
    try {
      // 首先检测comment是否为空
      if (comment.trim() === '') {
        Alert.alert('评论内容不能为空');
        return;
      }
      const response = await postComment({
        fa_post: parseInt(PostArea.id),
        fa_comment: faComment,
        is_facomment: faComment === null ? 1 : 0,
        reply: PostArea.posterId,
        contain: comment,
      });

      // 评论后刷新页面
      setCommentUpdateSignal(commentUpdateSignal + 1);
      // 弹窗提示
      Alert.alert('评论成功');
      // 清空评论框
      setComment('');
    } catch (e) {
      console.log(e);
    }
  };

  // 点赞文章
  const handleLikePost = async () => {
    try {
      // 更新数据库
      const response = await likePost({postid: PostArea.id});
      // 更新likenum
      const newPostArea = {...PostArea, likenum: response.data.likenum};
      setPostArea(newPostArea);
      // 刷新页面 PostList
      setPostListUpdateSignal(postListUpdateSignal + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const rightIcon = (
    <Icon
      name="checkcircle"
      type="antdesign"
      color="#333"
      size={30}
      onPress={() => {
        // 这里是一级评论（父评论），没有父评论，传入null
        handleComement(null);
      }}
    />
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.headerContainer}>
            <Avatar
              size={60}
              rounded
              source={{
                uri: `${OSSBaseURL}/${PostArea.avatarRelativePath}`,
              }}
            />
            <Text style={styles.ownerName}>{PostArea.poster}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{PostArea.title}</Text>
            <Text style={styles.content}>{PostArea.content}</Text>
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.IconItem}>
              <Iconant
                name="like1"
                size={30}
                color="#000"
                onPress={() => {
                  // 点赞文章
                  handleLikePost();
                }}
              />
              <Text>{PostArea.likenum}</Text>
            </View>
            <View style={styles.IconItem}>
              <Iconant name="eye" size={30} color="#000" />
              <Text>{PostArea.clicknum}</Text>
            </View>
          </View>
        </View>
        <View>
          <CommentArea postId={PostArea.id} />
        </View>
      </ScrollView>
      <View style={styles.commentFooter}>
        <Input
          placeholder="评论"
          containerStyle={{
            borderRadius: 10,
          }}
          leftIcon={{type: 'font-awesome', name: 'comment'}}
          rightIcon={rightIcon}
          value={comment}
          onChangeText={text => setComment(text)}
        />
      </View>
    </>
  );
}
