import { Stack } from 'expo-router'
import React from 'react'

export default function MarkerLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name = 'index.tsx'/>
    </Stack>
  )
}