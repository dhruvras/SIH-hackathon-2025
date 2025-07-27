// components/ProductCards.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function ProductCard({ item, action}) {
  return (
    <View>
    <TouchableOpacity onPress={action}>
      <View style={styles.box}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textBox}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
    {/* <ProductPage data = {item}/> */}
    </View>

  );
}

const styles = StyleSheet.create({
  box: {
    width: 160,
    height: 230,
    backgroundColor: '#d8eebfff',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textBox: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  price: {
    color: 'green',
    marginTop: 4,
    fontSize: 13,
  },
  location: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
});
