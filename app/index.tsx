import SubmitButton from '@/components/SubmitButton';
import { sendPrompt } from '@/utils/ai';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function index() {
  const [data, setData] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomOffset] = useState(new Animated.Value(0));
  const [input, setInput] = useState('');

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

    // Add user's message to the list
    setData(prev => [...prev, { type: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    try {
      const response = await sendPrompt(currentInput);
      // Add bot's reply to the list
      setData(prev => [...prev, { type: 'bot', text: response }]);
    } catch (err) {
      setData(prev => [...prev, { type: 'bot', text: 'Error: ' + err.message }]);
    }
  };

  return (
    <SafeAreaView style={styles.mainframe}>
      <View style={styles.header}>
        <Text style={styles.title}>Ramu Bhai</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainframe: {
    flex: 1,
    backgroundColor: '#fcdc7eff',
    paddingBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    alignSelf: 'center',
    color:'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 31,
    gap: 10,
    backgroundColor: '#fcdc7eff'
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
  bot: {
    fontSize: 16,
    flexShrink: 1
  },
  header:{
    paddingTop:10,
    backgroundColor:'#694b41ff',
    borderRadius:10,
  }
});
