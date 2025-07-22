import NotificationModal from '@/components/NotificationsModal';
import ProfileModal from '@/components/ProfilePopup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import foot from '../assets/images/footimage.png'; // Adjust the path accordingly
import logo from '../assets/images/logo.png'; // Adjust the path accordingly
import AdSlider from '../components/AdSlider'; // Adjust path if needed
export default function index() {
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

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}  // adjust the path if needed
      style={styles.background}
      resizeMode="cover" // or "contain"
    >
      <SafeAreaView style={styles.overlay}>
        {/* You can place buttons/text/etc. here */}
        <View style={styles.header}>
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
          {/* <Button onPress={action} title="click"></Button> */}
          <View style={styles.navmenu}>
            <TouchableOpacity onPress={marketnav}>
              <View style={styles.marketbutton}>
                <View>
                  <Text style={styles.textframe}>Acess Our</Text>
                  <Text style={styles.textframe}>Marketplace</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={chatnav}>
              <View style={styles.chatbutton}>
                {/* icons */}
                <View>
                  <Text style={styles.textframe}>Acess Our</Text>
                  <Text style={styles.textframe}>ChatBot</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.textframe1}>Something New !</Text>
          <AdSlider />

       

        </ScrollView>
        <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        <NotificationModal visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} />
        <Image source={foot} style={styles.footimage}/>
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: '#FFC107',
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
    // backgroundColor:'yellow',
    marginLeft:20,

  },
  chatbutton:{
    flexDirection:'row',
    // backgroundColor:'blue',
    marginRight:20,

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
