import { View, Text, Button } from 'react-native'
import React from 'react'

export default function IndexScreen(navigation: any) {
  return (
    <View>
      <Text>IndexScreen</Text>
      
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}