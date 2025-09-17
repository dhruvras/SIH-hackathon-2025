import LanguageSwitcher from '@/components/LanguageSwitcher';
import NotificationModal from '@/components/NotificationsModal';
import ProfileModal from '@/components/ProfilePopup';
import SubmitButton from '@/components/SubmitButton';
import i18n from '@/i18n';
import { sendPrompt } from '@/utils/ai';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useState } from 'react';
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
import logo from '../../assets/images/logo.png';
import cropData from '../../constants/idealData';
import { convertAll } from '../../utils/convertSensors';
import { fetchCsvData } from "../../utils/data_collect";


export default function Index() {
  const [chatData, setChatData] = useState<any[]>([]);
  const [csvData, setCsvData] = useState<number[]>([]); // ✅ store CSV numbers separately
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomOffset] = useState(new Animated.Value(0));
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [loading, setLoading] = useState(false);


  // ✅ Fetch CSV data on mount
  useEffect(() => {
    async function getData() {
      try {
        const received = await fetchCsvData();
        console.log("📊 CSV Data received:", received);
        setCsvData(received || []);
      } catch (err) {
        console.error("Failed to fetch CSV:", err);
      }
    }
    getData();
  }, []);

  const speak = (text: string) => {
    if (speaker) {
      Speech.speak(text);
      setSpeaker(false);
    } else {
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

  // ✅ Handle keyboard animation
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

  // ✅ Action when sending a prompt
  // ✅ Action when sending a prompt
const action = async () => {
  console.log("👉 Current CSV data:", csvData);

  if (!input.trim()) return;

  setChatData(prev => [...prev, { type: 'user', text: input }]);

  const roverData = csvData.length ? csvData : [55, 140, 67, 53, 66, 21]; 
  // Ensure at least 6 values [n, p, k, moisture, humidity, temp]

  const adcReadings = { 
    n: roverData[0], 
    p: roverData[1], 
    k: roverData[2], 
    moisture: roverData[3] 
  };

  const result = convertAll(adcReadings, { moistureInverted: false });
  const options = { month: 'long' };
  const currentMonthName = new Date().toLocaleString('en-US', options);

  const currentInput =
    input +
    ` (the current data of the soil are 
    soil moisture: ${result.moisture.value}, 
    nitrogen of the soil: ${result.N.value}, 
    phosphorus of the soil: ${result.P.value}, 
    potassium of the soil: ${result.K.value}, 
    humidity of the soil: ${roverData[4]}, 
    and the temperature of the environment: ${roverData[5]},
    and the present month ${currentMonthName}) ` +
    `(the ideal data for the soil is ${JSON.stringify(cropData, null, 2)}) ` +
    `and please respond in ${
      i18n.language === 'hi'
        ? "Hindi, no translation/explanation"
        : "English"
    }.`;

  console.log("📝 Full prompt sent to AI:", currentInput);

  setInput('');
  setLoading(true);

  try {
    const response = await sendPrompt(currentInput);
    setChatData(prev => [...prev, { type: 'bot', text: response }]);
  } catch (err: any) {
    setChatData(prev => [...prev, { type: 'bot', text: 'Error: ' + err.message }]);
  } finally {
    setLoading(false);
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
      </View>

      {/* ✅ Chat List */}
      <FlatList
        data={[
          { type: "header", text: "" },
          ...(loading ? [...chatData, { type: "bot-loading", text: "" }] : chatData),
        ]}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.body}
        renderItem={({ item }) => {
          if (item.type === "header") {
            return (
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Image
                  source={logo}
                  style={{
                    width: "100%",
                    height: 100,
                    resizeMode: "contain",
                  }}
                />
              </View>
            );
          }

          if (item.type === "bot-loading") {
            return (
              <View style={{ flexDirection: "row", paddingVertical: 6, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: "bold", color: "red" }}>Bot: </Text>
                <ActivityIndicator size="small" color="#FFC107" />
                <Text style={{ marginLeft: 8 }}>Typing...</Text>
              </View>
            );
          }

          return (
            <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", paddingVertical: 6 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: item.type === "user" ? "green" : "red",
                  }}
                >
                  {item.type === "user" ? "You: " : "Bot: "}
                </Text>
                <Text style={styles.bot}>{item.text}</Text>
              </View>
              {item.type === "bot" && (
                <View>
                  <TouchableOpacity onPress={() => speak(item.text)}>
                    <Ionicons
                      name="volume-high-outline"
                      size={36}
                      style={{ paddingHorizontal: 0 }}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />

      {/* ✅ Input Field */}
      <View style={{ paddingBottom: 25 }}>
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

      {/* Modals */}
      <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <NotificationModal visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainframe: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    paddingBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
    padding: 5,
    paddingLeft: 15,
    marginHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingBottom: 5,
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
    marginLeft: 10
  },
  iconButton: {
    marginLeft: 10
  }
});
