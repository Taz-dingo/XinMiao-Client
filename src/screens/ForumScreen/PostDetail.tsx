import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Icon} from 'react-native-elements';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import {f} from '../../oss/aliyun-oss-sdk';
import {
  getPostComments,
  likePost,
  postComment,
} from '../../services/api/forumService';
import {OSSBaseURL} from '../../services/config';
import {Button, Input, SpeedDial} from '@rneui/base';
import useAuthStore from '../../store/authStore';
import {set} from 'lodash';
import {useForumStore} from '../../store/forumStore';

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
  const [
    commentUpdateSignal,
    postListUpdateSignal,
    setCommentUpdateSignal,
    setPostListUpdateSignal,
  ] = useForumStore(store => [
    store.commentUpdateSignal,
    store.postListUpdateSignal,
    store.setCommentUpdateSignal,
    store.setPostListUpdateSignal,
  ]);

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

/*---------------------------------------------------------------------- */

type CommentItemProps = {
  id: string;
  faPost: string; // 父帖子id
  faComment: string; // 父评论id
  creator: string; // 评论者id
  creatorname: string; // 评论者昵称
  creatorimg: string; // 评论者头像
  ctime: string;
  likenum: string;
  isFacomment: number; // 是否为父评论
  reply: string; // 回复对象（楼主/一级评论者）
  replyname: string; // 回复者昵称
  replyimg: string; // 回复者头像
  contain: string; // 评论内容
  replyread: string; // 回复是否已读
};

interface CommentItemWithChildren extends CommentItemProps {
  children: CommentItemProps[];
}
const CommentArea = ({postId, updateSignal}: any) => {
  const [commentList, setCommentList] = useState<CommentItemWithChildren[]>([]);
  const [commentUpdateSignal, setCommentUpdateSignal] = useForumStore(store => [
    store.commentUpdateSignal,
    store.setCommentUpdateSignal,
  ]);

  const updatePostComment = async () => {
    try {
      const response = await getPostComments({
        postid: postId,
        time_order: '1', // 从上往下：1-发布顺序；0-最新发布
        like_order: '0',
      });

      // 将评论列表按照父评论和子评论分类
      const parentComments: CommentItemWithChildren[] & {
        children: CommentItemProps[];
      } = response.data.filter(
        (comment: CommentItemProps) => comment.isFacomment === 1,
      );
      const childComments: CommentItemProps[] = response.data.filter(
        (comment: CommentItemProps) => comment.isFacomment === 0,
      );

      // 为每个父评论添加一个children属性，用来存储对应的子评论
      parentComments.forEach(parentComment => {
        parentComment.children = childComments.filter(
          childComment => childComment.faComment === parentComment.id,
        );
      });

      setCommentList(parentComments);
    } catch (e) {
      console.log(e);
    }
  };

  // 如果是父评论，传入null，否则传入父评论id
  // 这里是评论区回复，都是子评论
  const handleComement = async (faComment: number | null) => {
    try {
      const response = await postComment({
        fa_post: id,
        fa_comment: faComment,
        creator: userInfo.id,
        is_facomment: faComment === null ? 1 : 0,
        reply: posterId,
        contain: comment,
      });

      // 评论后刷新页面
      updatePostComment();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updatePostComment();
  }, [commentUpdateSignal]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      // borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    avatar: {
      margin: 10,
    },
    rightContainer: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
    },
    commentatorName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 3,
    },
    contain: {
      fontSize: 16,
      lineHeight: 24,
      marginVertical: 8,
    },
    footerContainer: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    IconItem: {
      flexDirection: 'row',

      marginRight: 20,
    },
    childCommentContainer: {
      flexDirection: 'row',
      // borderWidth: 1,
    },
    childRightContainer: {
      paddingTop: 8,
    },
    childCommentatorName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <>
      {commentList.map(item => {
        return (
          <View key={item.id} style={styles.container}>
            <Avatar
              containerStyle={styles.avatar}
              size={50}
              rounded
              source={{
                uri: `${OSSBaseURL}/${item.creatorimg}`,
              }}
            />

            <View style={styles.rightContainer}>
              <Text style={styles.commentatorName}>{item.creatorname}</Text>
              <Text>{item.ctime}</Text>
              <Text style={styles.contain}>{item.contain}</Text>
              <View style={styles.footerContainer}>
                <View style={styles.IconItem}>
                  <Iconant name="like1" size={20} color="#000" />
                  <Text> {' ' + item.likenum}</Text>
                </View>
                <View style={styles.IconItem}>
                  <Iconfa
                    name="comment"
                    size={20}
                    color="#000"
                    onPress={() => {
                      // 拉起评论块
                    }}
                  />
                </View>
              </View>
              {item.children &&
                item.children.map(childComment => (
                  <View
                    key={childComment.id}
                    style={styles.childCommentContainer}>
                    <Avatar
                      containerStyle={styles.avatar}
                      size={40}
                      rounded
                      source={{
                        uri: `${OSSBaseURL}/${item.creatorimg}`,
                      }}
                    />
                    <View style={styles.childRightContainer}>
                      <Text style={styles.childCommentatorName}>
                        {childComment.creatorname}
                      </Text>
                      <Text>{childComment.ctime}</Text>
                      <Text>{childComment.contain}</Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        );
      })}
    </>
  );
};
