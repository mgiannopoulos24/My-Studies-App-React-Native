import ekpa_logo from '@/assets/images/ekpa-logo.png';
import LoginForm from '@/components/auth/loginForm';
import SignupForm from '@/components/auth/signupForm';
import { Button, Text, YStack, XStack, Image, Select, Adapt, Sheet } from 'tamagui';
import { languageOptions } from '@/constants/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import i18n from '@/utils/i18n'; // Add this import

const Login: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language); // Add this state
  const { t } = useTranslation(); // Remove i18n from here, use the imported one

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && savedLanguage !== i18n.language) {
          await i18n.changeLanguage(savedLanguage);
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load saved language:', error);
      }
    };
    
    loadSavedLanguage();

    // Add language change listener
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      console.log('Changing language to:', newLanguage);
      console.log('Available languages:', Object.keys(i18n.store.data));
      console.log('Current language before change:', i18n.language);
      
      await i18n.changeLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
      setCurrentLanguage(newLanguage); // Force state update
      
      console.log('Current language after change:', i18n.language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupButtonClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginForm(false);
  };

  const handleSignupSuccess = () => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };

  return (
    <YStack flex={1} backgroundColor="$gray3" position="relative">
      {/* Background decorative elements - simplified for mobile */}
      {/* Top right ellipse for lg and above */}
  <YStack
    position="absolute"
    top={0}
    right={0}
    bottom={0}
    width="75%"
    backgroundColor="$blue9"
    display="none"
    $gtLg={{
      display: 'flex',
      clipPath: 'ellipse(75% 100% at 100% 50%)'
    }}
    style={{
      // Fallback clip path for mobile if needed
      clipPath: undefined,
    }}
  />

  {/* Bottom ellipse for below lg */}
  <YStack
    position="absolute"
    bottom={0}
    left={0}
    right={0}
    height="80%"
    backgroundColor="$blue9"
    $gtLg={{
      display: 'none'
    }}
    style={{
      clipPath: 'ellipse(100% 80% at 50% 100%)'
    }}
  />

      {/* Language selector */}
      <XStack
  position="absolute"
  bottom="$4"
  right="$4"
  zIndex={50}
  $gtMd={{
    bottom: 'auto',
    top: '$4',
  }}
>
  <Select value={currentLanguage} onValueChange={handleLanguageChange}>
    <Select.Trigger
      width="auto"
      minWidth={120}
      borderWidth={1}
      borderColor="$gray6"
      backgroundColor="$background"
      hoverStyle={{ backgroundColor: '$white' }}
      pressStyle={{ backgroundColor: '$white' }}
      opacity={0.85}
    >
      <Select.Value />
      <Select.Icon>
        <ChevronDown />
      </Select.Icon>
    </Select.Trigger>

    <Adapt when="sm" platform="touch">
      <Sheet modal dismissOnSnapToBottom>
        <Sheet.Frame>
          <Sheet.ScrollView>
            <Adapt.Contents />
          </Sheet.ScrollView>
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
    </Adapt>

    <Select.Content zIndex={200000}>
      <Select.ScrollUpButton />
      <Select.Viewport>
        {languageOptions.map((option, i) => (
          <Select.Item index={i} key={option.value} value={option.value}>
            <Select.ItemText>{option.label}</Select.ItemText>
            <Select.ItemIndicator marginLeft="auto">
              <Check size={16} />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Viewport>
      <Select.ScrollDownButton />
    </Select.Content>
  </Select>
</XStack>

      {/* Main content */}
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" zIndex={10}>
        <XStack 
          width="100%" 
          maxWidth={1200} 
          alignItems="center" 
          justifyContent="space-between"
          flexDirection="column"
          $gtLg={{ flexDirection: 'row' }}
        >
          {/* Login Card */}
          <YStack 
            width="100%" 
            maxWidth={500} 
            backgroundColor="$background" 
            borderRadius="$4" 
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            marginBottom="$8"
            $gtLg={{ marginBottom: 0, marginLeft: '$10' }}
          >
            <YStack padding="$8">
              {/* Logo */}
              <XStack justifyContent="center" marginBottom="$8">
                <Image 
                  source={ekpa_logo} 
                  width={60} 
                  height={60} 
                  resizeMode="contain"
                />
              </XStack>
              
              <Text 
                textAlign="center" 
                fontSize="$6" 
                fontWeight="600" 
                color="$gray11" 
                marginBottom="$6"
              >
                {t('title')}
              </Text>

              {/* Separator */}
              <YStack height={1} backgroundColor="$gray6" marginVertical="$6" />

              {!showLoginForm && !showSignupForm && (
                <YStack alignItems="center">
                  <Text 
                    fontSize="$5" 
                    fontWeight="500" 
                    color="$gray12" 
                    marginBottom="$4"
                  >
                    {t('loginWith')}:
                  </Text>
                  <Button 
                    onPress={handleLoginButtonClick} 
                    width="100%" 
                    themeInverse
                    $sm={{ width: 'auto' }}
                  >
                    {t('institutionalAccount')}
                  </Button>
                </YStack>
              )}

              {showLoginForm && (
                <YStack>
                  <Text 
                    textAlign="center" 
                    fontSize="$5" 
                    fontWeight="500" 
                    color="$gray12" 
                    marginBottom="$4"
                  >
                    {t('loginWithInstitutional')}
                  </Text>
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                  <XStack justifyContent="center" marginTop="$4">
                    <Button
                      variant="outlined"
                      onPress={() => setShowLoginForm(false)}
                      size="$2"
                    >
                      {t('cancel')}
                    </Button>
                  </XStack>
                </YStack>
              )}

              {/* Separator */}
              <YStack height={1} backgroundColor="$gray6" marginVertical="$6" />

              {!showLoginForm && !showSignupForm && (
                <YStack alignItems="center">
                  <Text 
                    fontSize="$3" 
                    color="$gray10" 
                    marginBottom="$4"
                  >
                    {t('noAccount')}:
                  </Text>
                  <Button
                    variant="outlined"
                    onPress={handleSignupButtonClick}
                    width="100%"
                    $sm={{ width: 'auto' }}
                  >
                    {t('createAccount')}
                  </Button>
                </YStack>
              )}

              {showSignupForm && (
                <YStack>
                  <Text 
                    textAlign="center" 
                    fontSize="$5" 
                    fontWeight="500" 
                    color="$gray12" 
                    marginBottom="$4"
                  >
                    {t('createAccount')}
                  </Text>
                  <SignupForm onSignupSuccess={handleSignupSuccess} />
                  <XStack justifyContent="center" marginTop="$4">
                    <Button
                      variant="outlined"
                      onPress={() => setShowSignupForm(false)}
                      size="$2"
                    >
                      {t('cancel')}
                    </Button>
                  </XStack>
                </YStack>
              )}
            </YStack>
          </YStack>

          {/* Information Panel */}
          <YStack 
            maxWidth={500} 
            color="white" 
            marginTop="$8"
            paddingRight="$8"
            $gtLg={{ marginTop: 0 }}
          >
            <Text fontSize="$7" fontWeight="600" marginBottom="$6" color="white">
              {t('electronicServices')}
            </Text>
            <Text fontSize="$5" marginBottom="$4" maxWidth={400} color="white">
              {t('loginInfo')}
            </Text>
            
            <YStack height={1} backgroundColor="rgba(255,255,255,0.3)" marginVertical="$4" />
            
            <Text fontSize="$5" fontWeight="500" marginBottom="$2" color="white">
              {t('studentCapabilities')}:
            </Text>
            <YStack space="$2" marginBottom="$6" paddingLeft="$4">
              <Text fontSize="$4" color="white">• {t('viewGrades')}</Text>
              <Text fontSize="$4" color="white">• {t('coursesRegistration')}</Text>
              <Text fontSize="$4" color="white">• {t('registrationHistory')}</Text>
              <Text fontSize="$4" color="white">• {t('electronicRequests')}</Text>
            </YStack>
            
            <Text fontSize="$5" fontWeight="500" marginBottom="$2" color="white">
              {t('professorCapabilities')}:
            </Text>
            <YStack space="$2" marginBottom="$6" paddingLeft="$4">
              <Text fontSize="$4" color="white">• {t('viewCourses')}</Text>
              <Text fontSize="$4" color="white">• {t('manageGrades')}</Text>
            </YStack>
            
            <Text fontSize="$5" fontWeight="500" marginBottom="$2" color="white">
              {t('secretaryCapabilities')}:
            </Text>
            <YStack space="$2" paddingLeft="$4">
              <Text fontSize="$4" color="white">• {t('manageRequests')}</Text>
              <Text fontSize="$4" color="white">• {t('setDeadlines')}</Text>
              <Text fontSize="$4" color="white">• {t('viewStudents')}</Text>
              <Text fontSize="$4" color="white">• {t('fillForms')}</Text>
            </YStack>
          </YStack>
        </XStack>
      </YStack>

      {/* Footer */}
      <YStack 
        backgroundColor="$gray2" 
        paddingHorizontal="$4" 
        paddingVertical="$3" 
        zIndex={10}
      >
        <XStack 
          maxWidth={1200} 
          alignSelf="center" 
          width="100%"
          alignItems="center" 
          justifyContent="space-between"
          flexDirection="column"
          gap="$2"
          $gtMd={{ flexDirection: 'row' }}
        >
          <YStack alignItems="center" $gtMd={{ alignItems: 'flex-start' }}>
            <Text fontSize="$2" color="$gray11" textAlign="center" $gtMd={{ textAlign: 'left' }}>
              {t('footerText')}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default Login;