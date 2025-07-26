import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function NewCard({ item }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Card */}
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textWrapper}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title || 'No Title'}
              </Text>
              <Text numberOfLines={5} ellipsizeMode="tail" style={styles.text}>
                {item.content}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Image source={item.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{item.title || 'No Title'}</Text>
              <Text style={styles.modalText}>{item.content}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    backgroundColor: '#f1fbe6ff',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: screenWidth - 32,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
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

  // Modal styles
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: screenHeight * 0.85,
  },
  modalContent: {
    padding: 16,
    alignItems: 'center',
  },
  modalImage: {
    width: screenWidth - 64,
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
  },
  closeButton: {
    backgroundColor: '#333',
    paddingVertical: 14,
    alignItems: 'center',
  },
});
