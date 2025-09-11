import LanguageSwitcher from '@/components/LanguageSwitcher';
import NotificationModal from '@/components/NotificationsModal';
import ProfileModal from '@/components/ProfilePopup';
import SubmitButton from '@/components/SubmitButton';
import i18n from '@/i18n';
import { sendPrompt } from '@/utils/ai';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/images/logo.png'; // Adjust the path accordingly

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { fetchCsvData } from "../../utils/data_collect";



export default function Index() {
  const [data, setData] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomOffset] = useState(new Animated.Value(0));
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [loading, setLoading] = useState(false);
  const [csvdata, setcsvData] = useState([]);   // to store CSV data
  const [error, setError] = useState(null); // to store error

  useEffect(() => {
    fetchCsvData()
      .then(setcsvData)     // if successful, put data in state
      .catch(setError);  // if error, put error in state
  }, []);
  const speak = (text: string) => {
    if(speaker){
    Speech.speak(text);
    setSpeaker(false);
  }
    else{
      Speech.stop();
      setSpeaker(true);
    }
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardVisible(true);
      Animated.timing(bottomOffset, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      Animated.timing(bottomOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

 const action = async () => {
      if (!input.trim()) return;

      setData(prev => [...prev, { type: 'user', text: input }]);
      const currentInput = input +` the data collected from the `+ ` and pls give the response in ${(i18n.language=='hi') 
        ? "hindi devnagri script, and don't give any translation or explination of the response and don't write any english" 
        : "english"} language for me`;
      setInput('');
      setLoading(true); // ✅ Show typing indicator

      try {
        const response = await sendPrompt(currentInput);
        setData(prev => [...prev, { type: 'bot', text: response }]);
      } catch (err) {
        setData(prev => [...prev, { type: 'bot', text: 'Error: ' + err.message }]);
      } finally {
        setLoading(false); // ✅ Hide typing indicator when done
      }
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
    <SafeAreaView style={styles.mainframe}>
      <View style={{ alignItems: 'center' }}>
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
        <Image source={logo} style={styles.image} />
      </View>
      <FlatList
        data={loading ? [...data, { type: 'bot-loading', text: '' }] : data} // add fake "loading" item
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.body}
        renderItem={({ item }) => {
          if (item.type === 'bot-loading') {
            // 👇 Show loader as if bot is typing
            return (
              <View style={{ flexDirection: 'row', paddingVertical: 6 , paddingHorizontal:10,}}>
                <Text style={{ fontWeight: 'bold', color: 'red' }}>Bot: </Text>
                <ActivityIndicator size="small" color="#FFC107" />
                <Text style={{ marginLeft: 8 }}>Typing...</Text>
              </View>
            );
          }

          return (
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', paddingVertical: 6, marginRight: 10 }}>
                <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
                  {item.type === 'user' ? 'You: ' : 'Bot: '}
                </Text>
                <Text style={styles.bot}>{item.text}</Text>
              </View>
              {item.type === 'bot' && (
                <View>
                  <TouchableOpacity onPress={() => speak(item.text)}>
                    <Ionicons
                      name="volume-high-outline"
                      size={36}
                      style={{ paddingHorizontal: 10 }}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />

      <View style={{paddingBottom:25}}>
      <Animated.View style={[styles.inputContainer, { marginBottom: bottomOffset }]}>
        <TextInput
          placeholder="Type here..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <SubmitButton action={action} />
      </Animated.View>
      </View>
      <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <NotificationModal visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainframe: {
    flex: 1,
    backgroundColor: '#F1F8E9', // Corrected color
    paddingBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
    padding:5,
    paddingLeft:15,
    marginHorizontal:25,
    backgroundColor: 'white',
    borderRadius:50,
    paddingBottom:5,

  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'white',
    height: 50,
    color: '#2E3D20',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  image: {
  width: '80%',         // increase width
  height: 90,
},

  bot: {
    fontSize: 16,
    flexShrink: 1
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
  }
});
