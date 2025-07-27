import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import inventoryData from '../../constants/inventory';

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const orderplaced = ()=>{
    // order placed, send email, show an alert of order placed,
  }
  const product = inventoryData.find((item) => String(item.id) === String(id));

  if (!product)
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      {product.image ? (
        // If product.image is a local require/import
        <Image source={product.image} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.noImage}>
          <Text>No Image Available</Text>
        </View>
      )}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.location}>Available at: {product.location}</Text>

      {/* Added Product Description */}
      <Text style={styles.description}>{product.description || 'No description available.'}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.buyNow]} onPress={orderplaced}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.addToCart]} onPress={() => alert('Add to Cart pressed')}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F1F8E9',
  },
  notFound: {
    fontSize: 18,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius:20,
  },
  noImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B12704',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#007600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buyNow: {
    backgroundColor: '#FF9900',
  },
  addToCart: {
    backgroundColor: '#FFD814',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
