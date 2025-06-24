import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import RecorderScreen from '../screens/RecorderScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Recorder" component={RecorderScreen} /> */}
      <Stack.Screen name="Recorder" component={() => <></>} />
    </Stack.Navigator>
  );
}
