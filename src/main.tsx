import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './presentation/navigation/AppNavigator';

export default function Main() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
