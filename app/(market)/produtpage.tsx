import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import inventoryData from '../../constants/inventory';
import { useNotifications } from '../../contex/NotificationsContext'; // ✅ import notifications context
import { sendEmail } from '../../utils/sendEmail';

type Product = {
  id: number | string;
  title: string;
  price: string;
  location: string;
  description?: string;
  image?: any;
};

export default function ProductPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product: Product | undefined = inventoryData.find(
    (item: Product) => String(item.id) === String(id)
  );

  const { addNotification } = useNotifications(); // ✅ use context

  const orderPlaced = async () => {
    if (!product) return;

    try {
      const subject = `${product.title} bought by customer`;
      const body = `Subject: Confirmation of Item Purchase - ${Math.floor(Math.random() * 1000000)}
      
      Dear Mohan Das,
      
This is to formally notify you that one of your items listed on our platform has been successfully purchased. The details of the transaction are as follows:

Item Name: ${product.title}

Order ID: ${Math.floor(Math.random() * 1000000)}

Buyer's Name: Akash Dhiyaani

Quantity: 1

Date of Purchase: ${new Date().toLocaleDateString()}

You are kindly requested to initiate the dispatch process at the earliest convenience. Please ensure that the item is properly packed and shipped within the stipulated timeframe. Once dispatched, we request you to provide the shipping details and tracking number for our records.

We appreciate your cooperation and look forward to your continued association with us.

Sincerely,
Annknown`

    await sendEmail(subject, body);
    addNotification(`Order placed for ${product.title} at ${product.price}`);

      // ✅ Add notification to context

      Alert.alert('Order placed', 'An email has been sent to the seller!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to place the order.');
    }
  };

  if (!product) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {product.image ? (
        <Image source={product.image} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.noImage}>
          <Text>No Image Available</Text>
        </View>
      )}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.location}>Available at: {product.location}</Text>
      <Text style={styles.description}>
        {product.description || 'No description available.'}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.buyNow]}
          onPress={orderPlaced}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.addToCart]}
          onPress={() => {
            addNotification(`${product.title} added to cart`);
            Alert.alert('Added to cart');
          }}
        >
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
    borderRadius: 20,
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
    borderRadius: 6,
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
