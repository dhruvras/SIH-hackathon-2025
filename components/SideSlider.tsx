import { BlurView } from 'expo-blur';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.75;

export default function SideSlider({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const onProfilePress = () => {
    console.log('Profile Pressed');
  };

  const onAddProductPress = () => {
    console.log('Add Product Pressed');
  };

  const onContactUsPress = () => {
    console.log('Contact Us Pressed');
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Sliding Menu */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <BlurView intensity={110} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.content}>
          <Text style={styles.title}>Menu</Text>

          <TouchableOpacity style={styles.item} onPress={onProfilePress}>
            <Text style={styles.itemText}>👤 Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onAddProductPress}>
            <Text style={styles.itemText}>➕ Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onContactUsPress}>
            <Text style={styles.itemText}>📞 Contact Us</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
  },
  item: {
    marginBottom: 24,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
});
