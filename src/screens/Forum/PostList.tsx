import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import PostItem from './PostItem';
import {
  getPosts,
  getUserCollectPosts,
  getUserPosts,
} from '../../services/api/forumService';
import {useForumStore} from '../../store/forumStore';

type PostListProps = {
  type: string; // 'all' or 'userOnly'
};

export default function PostList({type}: PostListProps) {
  const [postData, setPostData] = React.useState<API.PostItem[]>([]);
  const [msg, setMsg] = React.useState('');
  const {
    postListUpdateSignal,
    setPostListUpdateSignal,
    curPage,
    setCurPage,
    pagesize,
    clearCurPage,
  } = useForumStore();

  const updatePosts = async () => {
    try {
      let response;
      if (type === 'all') {
        // 查所有
        response = await getPosts({
          page: curPage,
          pagesize: pagesize,
          order: 0,
        });
      } else if (type === 'userOnly') {
        // 查个人帖子
        response = await getUserPosts({});
      } else if (type === 'userCollect') {
        // 查个人收藏的帖子
        response = await getUserCollectPosts({});
      }

      // 如果返回数据是数组则有数据，
      // 否则返回说明字符串信息（为空）
      if (Array.isArray(response?.data)) {
        // 加到现有数组后方
        setPostData([...postData, ...response.data]);
      } else {
        setMsg(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updatePosts();
  }, [postListUpdateSignal, curPage]);

  useEffect(() => {
    clearCurPage();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
  });
  return (
    <View style={styles.container}>
      {postData.length > 0 ? (
        postData.map(item => {
          return (
            <PostItem
              key={item.id ? item.id : `${item.adid}_${item.name}`}
              id={item.id}
              title={item.title}
              content={item.contain}
              likenum={item.likenum}
              clicknum={item.clicktnum}
              ctime={item.ctime}
              poster={item.name}
              posterId={item.creator}
              avatarRelativePath={item.img}
              adid={item.adid}
              is_adpost={item.is_adpost}
            />
          );
        })
      ) : (
        <Text
          style={{
            fontSize: 20,
            color: 'gray',
            textAlign: 'center',
            marginTop: 20,
          }}>
          {msg}
          {"\n\n(o '◡' o)"}
        </Text>
      )}
    </View>
  );
}
