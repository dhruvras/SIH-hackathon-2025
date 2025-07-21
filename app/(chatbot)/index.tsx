import NotificationModal from '@/components/NotificationsModal';
import ProfileModal from '@/components/ProfilePopup';
import SubmitButton from '@/components/SubmitButton';
import { sendPrompt } from '@/utils/ai';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/images/logo.png'; // Adjust the path accordingly

export default function Index() {
  const [data, setData] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomOffset] = useState(new Animated.Value(0));
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

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
    const currentInput = input;
    setInput('');

    try {
      const response = await sendPrompt(currentInput);
      setData(prev => [...prev, { type: 'bot', text: response }]);
    } catch (err) {
      setData(prev => [...prev, { type: 'bot', text: 'Error: ' + err.message }]);
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
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
            <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
              {item.type === 'user' ? 'You: ' : 'Bot: '}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <Animated.View style={[styles.inputContainer, { marginBottom: bottomOffset }]}>
        <TextInput
          placeholder="Type here..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <SubmitButton action={action} />
      </Animated.View>
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
    paddingHorizontal: 15,
    paddingBottom: 31,
    backgroundColor: '#F1F8E9'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    height: 50,
    color: '#2E3D20'
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
