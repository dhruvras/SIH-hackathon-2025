import LanguageSwitcher from '@/components/LanguageSwitcher';
import NotificationModal from '@/components/NotificationsModal';
import ProfileModal from '@/components/ProfilePopup';
import '@/i18n'; // must come before any component
import i18n from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import foot from '../assets/images/footimage.png';
import logo from '../assets/images/logo.png';
import AdSlider from '../components/AdSlider';
import NewCard from '../components/NewCard';
import newsletterData from '../constants/data';
export default function Index() {
  const { t } = useTranslation(); // ← translation hook
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  const chatnav = () => {
    router.navigate("/(chatbot)");
  };
  const marketnav = () => {
    router.navigate("/(market)");
  };
  const onPressNotifications = () => {
    console.log('Notifications button pressed');
    setNotificationModalVisible(true);
  };

  const onPressProfile = () => {
    console.log('Profile button pressed');
    setModalVisible(true);
  };
  const hasData = Array.isArray(newsletterData) && newsletterData.length > 0;

  return (
    <I18nextProvider i18n={i18n}>
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <LanguageSwitcher />
          <View style={{ flex: 1 }} />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={onPressNotifications}>
              <Icon name="bell" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onPressProfile}>
              <Icon name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.contentframe} contentContainerStyle={{ alignItems: 'center' }}>
          <Image source={logo} style={styles.image} />

          <View style={styles.navmenu}>
            <TouchableOpacity onPress={marketnav}>
              <View style={styles.marketbutton}>
                <Ionicons name="storefront-outline" style={{paddingRight:6}} size={32} color="black" />
                <Text style={styles.textframe}>{t('access_marketplace')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={chatnav}>
              <View style={styles.chatbutton}>
                <Ionicons name="chatbubble-ellipses-outline" style={{paddingRight:6}} size={32} color="black" />
                <Text style={styles.textframe}>{t('access_chatbot')}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.textframe1}>{t('something_new')}</Text>
          <AdSlider />

          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            {t('latest_news')}
          </Text>

          {hasData ? (
            newsletterData.map((item) => (
              <NewCard key={item.id} item={item} />
            ))
          ) : (
            <Text style={{ textAlign: 'center' }}>{t('no_data')}</Text>
          )}

          <Image source={foot} style={styles.footimage} />
        </ScrollView>

        <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        <NotificationModal visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} />
      </SafeAreaView>
    </ImageBackground>
    </I18nextProvider>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex:1,
    alignItems:'center',
    // backgroundColor:'red',
    width:'100%',
    },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#FFC107',
    padding: 15,
    paddingTop: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10 // Use margin instead of gap
  },
  iconButton: {
    marginLeft: 10
  },
  contentframe:{
    flex:1,
    // backgroundColor:'red',
    width:'100%',
  },
  image: {
  width: '80%',         // increase width
  height: 90,
  marginBottom:30,
},
  navmenu:{
    alignItems:'center',
    flexDirection:'row',
    // backgroundColor:'red'
    height:60,
    marginTop:30,
    width:'100%',
    justifyContent: 'space-between',
  },
  marketbutton:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:20,
    justifyContent:'center',

  },
  chatbutton:{
    flexDirection:'row',
    // backgroundColor:'blue',
    marginRight:20,
    justifyContent:'center',
    alignItems:'center',

  },
  textframe:{
    fontWeight:'bold',
    fontSize:16,
  },
  textframe1:{
    fontWeight:'bold',
    fontSize:20,
    paddingTop:20,
  },
  footimage:{
    width:170,
    height:100,
  }
});
