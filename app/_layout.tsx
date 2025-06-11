import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown:false}}/>
      <Stack.Screen name='(Tab)' options={{headerShown:false,title:"home"}}/>            
    </Stack>
  )
}

export default RootLayout