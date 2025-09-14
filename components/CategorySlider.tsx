import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCategory } from "../contex/CategoryContext"; // adjust path



const categories = ['All', 'Crops', 'Seeds', 'Tools', 'Machinery', 'Pesticides', 'Fertilizers', 'Essentials'];


export default function CategorySlider() {
  const { setSelectedCategory } = useCategory();
  return (
    <View style={styles.container}>
        <Text style={{
            fontSize: 16,
    color: '#333',
    fontWeight: '600',
        }}>Categories: </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton} onPress={() => setSelectedCategory(category)}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    // paddingVertical: 10,
    paddingBottom:10,
    flexDirection:'row',
    alignItems:'center'
  },
  categoryButton: {
    backgroundColor: '#f1fbe6',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom:10,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
