import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function NewCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={item.image}  // <-- just use it as is
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <Text numberOfLines={2} style={styles.title}>{item.title || 'No Title'}</Text>
          <Text numberOfLines={5} ellipsizeMode="tail" style={styles.text}>{item.content}</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16, // slightly more padding
    backgroundColor: '#f1fbe6ff',
    borderRadius: 16,
    elevation: 6, // a bit stronger shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // deeper shadow
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: screenWidth - 32, // Keeps card within screen
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16, // a bit more gap between image and text
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    textAlign: 'justify',
  },
});
