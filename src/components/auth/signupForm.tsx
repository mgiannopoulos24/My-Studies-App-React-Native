import { Button, Input, Label, YStack, XStack, Text, Spinner } from 'tamagui';
import { requestSignup } from '@/services/Firebase/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SignupFormProps {
  onSignupSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showSignupNotification, setShowSignupNotification] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    // Regex pattern: anything followed by exactly @di.uoa.gr at the end
    const emailPattern = /^[a-zA-Z0-9._%+-]+@di\.uoa\.gr$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear email error when user starts typing again
    if (emailError) setEmailError(null);
  };

  const handleSignUp = async () => {
    setError(null);
    setEmailError(null);

    // Validate email domain first
    if (!validateEmail(email)) {
      setEmailError(t('uoaEmail'));
      return;
    }

    setIsLoading(true);

    try {
      await requestSignup(email, password);
      setShowSignupNotification(true);
      setShowSignupForm(false);
    } catch (error: any) {
      console.error('Signup request error:', error);

      // Handle different error cases
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError(t('usedEmail'));
          break;
        case 'auth/invalid-email':
          setError(t('invalidEmail'));
          break;
        case 'auth/operation-not-allowed':
          setError(t('operationNotAllowed'));
          break;
        case 'auth/weak-password':
          setError(t('weakPassword'));
          break;
        default:
          setError(t('signupError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showSignupNotification) {
      timeoutId = setTimeout(() => {
        setShowSignupForm(false);
        setShowSignupNotification(false);
        onSignupSuccess();
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showSignupNotification, onSignupSuccess]);

  return (
    <YStack width="100%">
      {showSignupForm && (
        <YStack 
          space="$4" 
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
              onChangeText={handleEmailChange}
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
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </YStack>

          {error && (
            <YStack
              backgroundColor="$red2"
              borderColor="$red7"
              borderWidth={1}
              borderRadius="$2"
              padding="$3"
            >
              <Text color="$red11" fontSize="$3">
                {error}
              </Text>
            </YStack>
          )}

          <Button 
            onPress={handleSignUp} 
            disabled={isLoading} 
            width="100%"
            themeInverse
          >
            {isLoading ? (
              <XStack space="$2" alignItems="center">
                <Spinner size="small" color="$color" />
                <Text>{t('submitting')}</Text>
              </XStack>
            ) : (
              t('signUp')
            )}
          </Button>
        </YStack>
      )}

      {showSignupNotification && (
        <YStack 
          width="100%" 
          maxWidth={400} 
          paddingHorizontal="$4"
        >
          <YStack
            marginTop="$4"
            backgroundColor="$green2"
            borderColor="$green7"
            borderWidth={1}
            borderRadius="$2"
            padding="$4"
            opacity={showSignupNotification ? 1 : 0}
            animation="quick"
          >
            <Text color="$green11" textAlign="center">
              {t('signupSuccess')}
            </Text>
          </YStack>
        </YStack>
      )}
    </YStack>
  );
};

export default SignupForm;