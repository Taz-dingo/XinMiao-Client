import * as React from 'react';
import {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, Touchable, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {adClick, getAdList} from '../../services/api/forumService';
import {Image} from 'react-native-elements';
import {OSSBaseURL} from '../../services';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

function App() {
  const width = Dimensions.get('window').width;
  const [adData, setAdData] = useState<API.AdItem[]>([]);
  const navigation = useNavigation();
  const fetchAdData = async () => {
    const response = await getAdList();
    console.log(response.data);
    console.log(response.data[0].name, response.data[0].img);
    setAdData(response.data);
  };

  useEffect(() => {
    fetchAdData();
  }, []);

  const styles = StyleSheet.create({
    adTitle: {
      position: 'absolute',
      zIndex: 10,
      top: 0,
      fontSize: 20,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      borderRadius: 10,
      margin: 5,
    },
  });

  return (
    <View style={{}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={adData}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            {/* 轮流渲染 */}
            {adData.length > 0 && (
              <TouchableOpacity
                onPress={async () => {
                  const response = await adClick({
                    ad_id: adData[index].id,
                  });
                  const {
                    id,
                    title,
                    contain,
                    likenum,
                    clicktnum,
                    ctime,
                    creator,
                    name,
                    img,
                  } = response.data;
                  navigation.navigate('PostDetail', {
                    id: id,
                    title: title,
                    content: contain,
                    likenum: likenum,
                    clicknum: clicktnum,
                    ctime: ctime,
                    poster: name,
                    posterId: creator,
                    avatarRelativePath: img,
                  });
                }}>
                <Text style={styles.adTitle}>{adData[index]?.name}</Text>
                <Image
                  source={{uri: `${OSSBaseURL}/${adData[index].img}`}}
                  style={{width: width, height: width / 2}}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

export default App;
