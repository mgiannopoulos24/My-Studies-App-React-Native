import { View, Text } from 'tamagui';
import { Button } from 'tamagui';
import { Input } from 'tamagui';
import { Form, XStack, YStack, Spinner, Label } from 'tamagui';
import { auth } from '@/services/Firebase/firebase';
import { db } from '@/services/Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  // Set initial language from AsyncStorage
  React.useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load saved language:', error);
      }
    };
    
    loadSavedLanguage();
  }, [i18n]);

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@di\.uoa\.gr$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setEmailError(null);

    if (!validateEmail(email)) {
      setEmailError(t('uoaEmail'));
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userRole = userData.role;

        // Save user data to AsyncStorage
        await AsyncStorage.setItem('userRole', userRole);
        await AsyncStorage.setItem('userEmail', user.email || '');
        await AsyncStorage.setItem('userId', user.uid);

        console.log(`User role: ${userRole}`);
        
        onLoginSuccess();
      } else {
        setErrorMessage('User account exists but no role assigned. Contact administrator.');
        await auth.signOut();
      }
    } catch (error: any) {
      console.error('Login error:', error);

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setErrorMessage(t('wrongCredentials'));
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage(t('tooManyAttempts'));
      } else {
        setErrorMessage(t('loginError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack alignItems="center" width="100%">
      <YStack 
        space="$4" 
        marginTop="$4" 
        width="100%" 
        maxWidth={400} 
        paddingHorizontal="$4"
      >
        <YStack space="$1.5" width="100%">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@di.uoa.gr"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
            keyboardType="email-address"
            autoCapitalize="none"
            borderColor={emailError ? "$red10" : undefined}
          />
          {emailError && (
            <Text color="$red10" fontSize="$2">
              {emailError}
            </Text>
          )}
        </YStack>
        
        <YStack space="$1.5" width="100%">
          <Label>{t('password')}</Label>
          <Input
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
        </YStack>
        
        <Button 
          onPress={handleLogin} 
          disabled={isLoading} 
          width="100%"
          themeInverse
        >
          {isLoading ? (
            <XStack space="$2" alignItems="center">
              <Spinner size="small" color="$color" />
              <Text>{t('signingIn')}</Text>
            </XStack>
          ) : (
            t('signIn')
          )}
        </Button>
      </YStack>
      
      {errorMessage && (
        <YStack marginTop="$4" width="100%" maxWidth={400} paddingHorizontal="$4" alignItems="center">
          <Text color="$red10" textAlign="center">
            {errorMessage}
          </Text>
        </YStack>
      )}
    </YStack>
  );
};

export default LoginForm;