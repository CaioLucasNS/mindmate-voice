import React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function Main() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#FFF" />
      <Text style={{ color: "#FFF" }}>✅ MindMate Voice is running</Text>
    </View>
  );
}
