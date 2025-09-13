// components/NotificationModal.tsx

import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNotifications } from "../contex/NotificationsContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function NotificationModal({ visible, onClose }: Props) {
  const { notifications } = useNotifications();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
        <View style={styles.modalContent}>
          {/* Close / Back Button */}
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="#333" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Notifications</Text>

          {/* If no notifications */}
          {notifications.length === 0 ? (
            <View style={styles.contentWrapper}>
              <Ionicons
                name="notifications-off-outline"
                size={40}
                color="#999"
              />
              <Text style={styles.label}>No Notifications</Text>
            </View>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                  <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="#555"
                  />
                  {/* FIXED: use item.text instead of item.message */}
                  <Text style={styles.notificationText}>{item.text}</Text>
                </View>
              )}
            />
          )}
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    color: "#666",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
