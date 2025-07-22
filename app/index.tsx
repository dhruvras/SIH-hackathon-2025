import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'
export default function index() {
  const router = useRouter()
  const action = ()=>{
    router.navigate("/(chatbot)")
  }
  return (
    <View>
      <Text>index</Text>
      <Button title="press" onPress={action}></Button>
    </View>
  )
}