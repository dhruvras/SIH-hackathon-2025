import CategorySlider from '@/components/CategorySlider';
import NotificationModal from '@/components/NotificationsModal';
import ProfileModal from '@/components/ProfilePopup';
import SideSlider from '@/components/SideSlider'; // Make sure it's imported
import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AdSlider from "../../components/AdSlider";
import ProductCard from '../../components/ProductCards'; // path may vary
import inventoryData from '../../constants/inventory';

export default function DetailedPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const onPressNotifications = () => {
    setNotificationModalVisible(true);
  };

  const onPressProfile = () => {
    setModalVisible(true);
  };

  const onPressMenu = () => {
    setSideMenuVisible(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={onPressMenu}>
            <Icon name="menu" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Bazaar</Text>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={onPressNotifications}>
              <Icon name="bell" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onPressProfile}>
              <Icon name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.content}>
          {/* Search Box */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#777"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
            <Icon name="search" size={20} color="#333" style={styles.searchIcon} />
          </View>
          <AdSlider />
          <CategorySlider onSelectCategory={(category) => console.log('Selected:', category)} />
          <View style={styles.grid}>
            <FlatList
              data={inventoryData}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={{ padding: 2 }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
            />
            


          </View>
        </ScrollView>

        {/* Modals */}
        <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        <NotificationModal visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} />
        <SideSlider visible={sideMenuVisible} onClose={() => setSideMenuVisible(false)} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 30,
    width: '100%',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: 40,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 0,
  },
});
