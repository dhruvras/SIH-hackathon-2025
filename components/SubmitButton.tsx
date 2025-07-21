import { MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function SubmitButton({ action }) {
  return (
    <View style={{ paddingTop: 3 }}>
      <TouchableOpacity onPress={action}>
        <View style={{
          backgroundColor: "#689F38",
          padding: 5,
          marginRight: 10,
          marginBottom: 2,
          borderRadius: 444,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialIcons name='send' size={30} color={'white'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
