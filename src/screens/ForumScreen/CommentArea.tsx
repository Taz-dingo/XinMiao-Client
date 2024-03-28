import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {OSSBaseURL} from '../../services';
import {getPostComments, postComment} from '../../services/api/forumService';
import {useForumStore} from '../../store/forumStore';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';

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

export const CommentArea = ({postId}: any) => {
  const [commentList, setCommentList] = useState<CommentItemWithChildren[]>();
  const {commentUpdateSignal, setCommentUpdateSignal} = useForumStore();

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
  //   const handleComement = async (faComment: number | null) => {
  //     try {
  //       const response = await postComment({
  //         fa_post: id,
  //         fa_comment: faComment,
  //         is_facomment: faComment === null ? 1 : 0,
  //         reply: posterId,
  //         contain: comment,
  //       });

  //       // 评论后刷新页面
  //       updatePostComment();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

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
      {commentList?.map(item => {
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
