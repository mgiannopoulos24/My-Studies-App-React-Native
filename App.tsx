import { Text, View, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from '@tamagui/core'
import { Button, H2, H6, YStack } from 'tamagui';
import config from './tamagui.config'
import { useState, useEffect, useRef } from 'react'

const { width, height } = Dimensions.get('window');

// Particle component
const Particle = ({ onComplete }: { onComplete: () => void }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const randomX = Math.random() * width;
  const randomY = Math.random() * height; // Changed to cover entire screen height
  const randomDirection = (Math.random() - 0.5) * 600; // Increased spread
  const randomSpeed = Math.random() * 300 + 150; // Increased speed range

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000, // Slightly longer duration
        useNativeDriver: true,
      })
    ]).start(() => {
      onComplete();
    });
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, randomDirection],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -randomSpeed],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.1, 0.8, 1],
    outputRange: [0, 1, 1, 0],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 0.3], // Slightly larger initial scale
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: randomX,
        top: randomY,
        width: 10, // Slightly larger particles
        height: 10,
        backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
        borderRadius: 5,
        transform: [
          { translateX },
          { translateY },
          { scale },
        ],
        opacity,
      }}
    />
  );
};

// Create a separate component for the main content
const AppContent = () => {
  const [count, setCount] = useState(0)
  const [particles, setParticles] = useState<number[]>([]);

  // Ensure counter resets on component mount
  useEffect(() => {
    setCount(0)
  }, [])

  const createFireworks = () => {
    const newParticles = Array.from({ length: 40 }, (_, i) => Date.now() + i); // Increased to 40 particles
    setParticles(prev => [...prev, ...newParticles]); // Add to existing particles instead of replacing
  };

  const removeParticle = (id: number) => {
    setParticles(prev => prev.filter(p => p !== id));
  };

  const incrementCount = () => {
    const newCount = count + 1
    setCount(newCount)
    
    // Trigger fireworks every 10 counts
    if (newCount % 10 === 0) {
      createFireworks();
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <YStack space="$4" alignItems="center">
        
        <H2>You clicked: {count}</H2>
        <H6 textAlign="center" maxWidth="50%" lineHeight="$1">Every 10 clicks you can see fireworks!</H6>
        
        <Button onPress={incrementCount} theme="blue" size="$4">
          Click me!
        </Button>

      </YStack>
      <StatusBar style="auto" />
      
      {/* Render particles */}
      {particles.map((id) => (
        <Particle
          key={id}
          onComplete={() => removeParticle(id)}
        />
      ))}
    </View>
  )
}

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <AppContent />
    </TamaguiProvider>
  );
}
