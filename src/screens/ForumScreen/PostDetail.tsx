import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Icon} from 'react-native-elements';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import {f} from '../../oss/aliyun-oss-sdk';
import {getPostComments} from '../../services/api/forumService';
import {OSSBaseURL} from '../../services/config';

interface PostItemSceenProps {
  route: any;
  navigation: any;
}
export default function PostDetail({route, navigation}: PostItemSceenProps) {
  const {
    id,
    title,
    content,
    likenum,
    clicknum,
    ctime,
    poster,
    avatarRelativePath,
  } = route.params;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
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
  });

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Avatar
            size={60}
            rounded
            source={{
              uri: `https://newgoodwork.oss-cn-hangzhou.aliyuncs.com/${avatarRelativePath}`,
            }}
          />
          <Text style={styles.ownerName}>{poster}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
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
        </View>
      </View>
      <View>
        <CommentArea postId={id} />
      </View>
    </ScrollView>
  );
}

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
const CommentArea = ({postId}: any) => {
  const [commentList, setCommentList] = useState<CommentItemWithChildren[]>([]);

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
  useEffect(() => {
    updatePostComment();
  }, []);

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
                  <Iconfa name="comment" size={20} color="#000" />
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
