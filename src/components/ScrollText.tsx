import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

type Props = {
  text: string;
  styles?: {};
};
export const ScrollText: React.FC<Props> = ({ text, styles }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 自动滚动的逻辑
    const handleAutoScroll = () => {
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          scrollX.setValue(0);
          handleAutoScroll();
        }
      });
    };

    handleAutoScroll();

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  // 处理滚动事件
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const viewWidth = event.nativeEvent.layoutMeasurement.width;
    const offsetX = event.nativeEvent.contentOffset.x;

    // 在接近末尾时暂时禁用滚动，防止内容跳动
    if (contentWidth - viewWidth - offsetX < 10) {
      setScrollEnabled(false);

      setTimeout(() => {
        setScrollEnabled(true);
      }, 1000);
    }
  };

  const translateX = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // 设置滚动距离
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      onScroll={handleScroll}>
      <Animated.View
        style={[defaultStyles.textContainer, { transform: [{ translateX }] }]}>
        <Text
          numberOfLines={1}
          style={styles === undefined ? defaultStyles.text : styles}>
          {text}
        </Text>
      </Animated.View>
    </ScrollView>
  );
};

const defaultStyles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    width: 200,
  },
});