import { Text, View } from 'react-native';
import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from '@tamagui/core'
import { Button, H2, YStack } from 'tamagui';
import config from './tamagui.config'
import { useState } from 'react'
import LoginForm from '@/components/auth/loginForm';

export default function App() {
  const [count, setCount] = useState(0)

  const incrementCount = () => {
    setCount(count + 1)
  }

  const handleLoginSuccess = () => {
    console.log("Login successful!");
  };

  return (
    <TamaguiProvider config={config}>
      <View className="flex-1 items-center justify-center bg-white">
        <YStack space="$4" alignItems="center">
          <Text className="text-lg font-bold text-blue-600">
            Open up App.tsx to start working on your app!
          </Text>
          
          <H2>Counter: {count}</H2>
          
          <Button onPress={incrementCount} theme="blue" size="$4">
            Click me!
          </Button>

          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </YStack>
        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  );
}
