import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const images = [
  require('../assets/images/1.png'),
  require('../assets/images/2.png'),
  require('../assets/images/3.png'),
  require('../assets/images/4.png'),
  require('../assets/images/5.png'),
  require('../assets/images/6.png'),
  require('../assets/images/7.png'),
  require('../assets/images/8.png'),
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function AdSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      flatListRef.current?.scrollToIndex({ animated: true, index });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedFlatList
      ref={flatListRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={images}
      keyExtractor={(_, index) => index.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ item }) => (
        <Image source={item} style={styles.image} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.9, // slightly smaller
    height: 180,        // reduced height
    resizeMode: 'cover',
    borderRadius: 20,
    marginHorizontal: (width * 0.05) / 2, // margin to center in screen
    backgroundColor: '#fff', // required for shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // for Android shadow
    marginVertical:25,
  },
});
