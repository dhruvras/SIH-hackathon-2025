// components/ProfileModal.tsx

import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ProfileModal({ visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
        <View style={styles.modalContent}>
          {/* Back Button */}
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Profile Content */}
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.label}>Name: John Doe</Text>
          <Text style={styles.label}>Email: john@example.com</Text>
          <Text style={styles.label}>Email: john@example.com</Text>
          <Text style={styles.label}>Email: john@example.com</Text>
          <Text style={styles.label}>Email: john@example.com</Text>
          <Text style={styles.label}>Email: john@example.com</Text>
          <Text style={styles.label}>Email: john@example.com</Text>
          {/* Add more profile fields here */}
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
