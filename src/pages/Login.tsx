import ekpa_logo from '@/assets/images/ekpa-logo.png';
import LoginForm from '@/components/auth/loginForm';
import SignupForm from '@/components/auth/signupForm';
import { Button, Text, YStack, XStack, Image, Select, Adapt, Sheet, ScrollView, Separator } from 'tamagui';
import { languageOptions } from '@/constants/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import i18n from '@/utils/i18n';
import { Linking } from 'react-native'; // For opening links

const Login: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { t } = useTranslation();
  const [showSupportLink, setShowSupportLink] = useState(false); // From solve.tsx

  // TODO: The "plan" key sequence feature from solve.tsx requires a platform-specific implementation
  // for keyboard event listening in React Native if desired.
  // For example, you could set showSupportLink = true based on some other interaction.
  // As a placeholder, we can enable it for demonstration:
  // useEffect(() => { setShowSupportLink(true); }, []);


  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && savedLanguage !== i18n.language) {
          await i18n.changeLanguage(savedLanguage);
          setCurrentLanguage(savedLanguage);
        } else if (!savedLanguage && i18n.language) {
          // If no saved language, but i18n has a language, ensure state is synced
          setCurrentLanguage(i18n.language);
        }
      } catch (error) {
        console.error('Failed to load saved language:', error);
      }
    };

    loadSavedLanguage();

    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const handleLanguageChange = async (newLanguage: string) => {
    if (!newLanguage) return; // Prevent changing to undefined/null
    try {
      await i18n.changeLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
      setCurrentLanguage(newLanguage);
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
    setShowLoginForm(true); // As per solve.tsx logic
  };

  // Styles adapted from solve.tsx
  // bg-gray-300 -> $gray3
  // bg-indigo-600 -> $blue9 (using existing blue, Tamagui might have $indigo shades)
  // text-white -> color="white"
  // shadow-xl -> Tamagui shadow props

  return (
    <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }} backgroundColor="$gray3">
      <YStack flex={1} position="relative">
        {/* Top right ellipse for lg and above */}
        <YStack
          position="absolute"
          top={0}
          right={0}
          bottom={0} // To make it full height on the right
          width="75%"
          backgroundColor="$blue9" // Corresponds to bg-indigo-600
          display="none"
          $gtLg={{
            display: 'flex',
          }}
          style={{
            clipPath: 'ellipse(75% 100% at 100% 50%)',
          }}
        />

        {/* Bottom ellipse for below lg */}
        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="80%" // As per solve.tsx (h-full w-full with clip-path makes it cover more)
                      // This was height="80%" in original Login.tsx, solve.tsx uses h-full for the container
                      // but clip-path makes it appear from bottom. Let's keep 80% for now.
          backgroundColor="$blue9" // Corresponds to bg-indigo-600
          $gtLg={{
            display: 'none',
          }}
          style={{
            clipPath: 'ellipse(100% 80% at 50% 100%)', // Matched from solve.tsx
          }}
        />

        {/* Language selector */}
        <XStack
          position="absolute" // "fixed" in solve.tsx, absolute is fine for RN screen context
          top="$4"
          right="$4"
          zIndex={50} // z-50 in solve.tsx
          $gtMd={{ // md:bottom-auto md:top-4 in solve.tsx
            bottom: 'auto',
            top: '$4',
          }}
        >
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <Select.Trigger
              width="auto"
              minWidth={120} // min-w-32 (128px) in solve.tsx
              borderColor="$gray6" // border-gray-300 in solve.tsx
              backgroundColor="$background" // bg-white/80 in solve.tsx
              opacity={0.85} // To match bg-white/80
              hoverStyle={{ backgroundColor: '$white' }} // hover:bg-white in solve.tsx
              pressStyle={{ backgroundColor: '$white' }}
              iconAfter={<ChevronDown size="$1" />}
            >
              <Select.Value placeholder={t('selectLanguage')} />
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
              <Select.Viewport minWidth={120}>
                {languageOptions.map((option, index) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    index={index}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size="$1" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </XStack>

        {/* Main content */}
        <YStack
          flex={1} // flex-grow in solve.tsx
          justifyContent="center" // items-center justify-center in solve.tsx's wrapper
          alignItems="center"
          padding="$4" // p-4 in solve.tsx
          zIndex={10} // z-10 in solve.tsx
          position="relative" // Ensure it's above the ellipses
        >
          <XStack // container equivalent
            width="100%"
            maxWidth={1200} // Corresponds to container mx-auto
            alignSelf="center" // mx-auto
            alignItems="center" // lg:items-center
            justifyContent="space-between" // lg:justify-between
            flexDirection="column" // flex-col default
            $gtLg={{ flexDirection: 'row' }} // lg:flex-row
          >
            {/* Login Card */}
            <YStack
              width="100%"
              maxWidth={500} // max-w-xl (512px) in solve.tsx
              backgroundColor="$background" // bg-white
              borderRadius="$4" // rounded-lg
              shadowColor="$shadowColor" // shadow-xl equivalent
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              marginBottom="$8" // mb-8
              overflow="hidden" // overflow-hidden
              $gtLg={{ 
                marginBottom: 0, // lg:mb-0
                marginLeft: '$10' // lg:ml-10 (adjust spacing as needed)
              }}
            >
              <YStack padding="$8"> {/* p-8 */}
                {/* Logo */}
                <XStack justifyContent="center" marginBottom="$8"> {/* mb-8 */}
                  <Image source={ekpa_logo} width={60} height={60} resizeMode="contain" alt="ekpa-logo" /> {/* h-15 w-auto */}
                </XStack>

                <Text
                  textAlign="center"
                  fontSize="$6" // text-xl
                  fontWeight="600" // font-semibold
                  color="$gray11" // text-gray-700
                  marginBottom="$6" // mb-6
                >
                  {t('title')}
                </Text>

                <Separator marginVertical="$6" /> {/* hr my-6 */}

                {!showLoginForm && !showSignupForm && (
                  <YStack alignItems="center"> {/* text-center */}
                    <Text fontSize="$5" fontWeight="500" color="$gray12" marginBottom="$4"> {/* text-lg font-medium text-gray-800 mb-4 */}
                      {t('loginWith')}:
                    </Text>
                    <Button
                      onPress={handleLoginButtonClick}
                      width="100%" // w-full
                      $sm={{ width: 'auto' }} // sm:w-auto
                      theme="active" // To give it a primary look, adjust as needed
                    >
                      {t('institutionalAccount')}
                    </Button>
                  </YStack>
                )}

                {showLoginForm && (
                  <YStack>
                    <Text
                      textAlign="center"
                      fontSize="$5" // text-lg
                      fontWeight="500" // font-medium
                      color="$gray12" // text-gray-800
                      marginBottom="$4" // mb-4
                    >
                      {t('loginWithInstitutional')}
                    </Text>
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                    <XStack justifyContent="center" marginTop="$4"> {/* mt-4 text-center */}
                      <Button 
                        chromeless // for variant="link" style
                        onPress={() => setShowLoginForm(false)} 
                        size="$2" // text-sm
                        color="$blue10" // Link color
                      >
                        {t('cancel')}
                      </Button>
                    </XStack>
                  </YStack>
                )}

                <Separator marginVertical="$6" /> {/* hr my-6 */}

                {!showLoginForm && !showSignupForm && (
                  <YStack alignItems="center"> {/* text-center */}
                    <Text fontSize="$3" color="$gray10" marginBottom="$4"> {/* text-sm text-gray-600 mb-4 */}
                      {t('noAccount')}:
                    </Text>
                    <Button
                      variant="outlined" // variant="outline"
                      onPress={handleSignupButtonClick}
                      width="100%" // w-full
                      $sm={{ width: 'auto' }} // sm:w-auto
                    >
                      {t('createAccount')}
                    </Button>
                  </YStack>
                )}

                {showSignupForm && (
                  <YStack>
                    <Text
                      textAlign="center"
                      fontSize="$5" // text-lg
                      fontWeight="500" // font-medium
                      color="$gray12" // text-gray-800
                      marginBottom="$4" // mb-4
                    >
                      {t('createAccount')}
                    </Text>
                    <SignupForm onSignupSuccess={handleSignupSuccess} />
                    <XStack justifyContent="center" marginTop="$4"> {/* mt-4 text-center */}
                       <Button 
                        chromeless // for variant="link" style
                        onPress={() => setShowSignupForm(false)} 
                        size="$2" // text-sm
                        color="$blue10" // Link color
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
              maxWidth={500} // max-w-xl
              color="white" // text-white (applied to children via context or individually)
              marginTop="$8" // mt-8
              $gtLg={{ 
                marginTop: 0, // lg:mt-0
                paddingRight: '$8' // lg:pr-8 (Ensure this doesn't make it too narrow)
              }}
            >
              <Text fontSize="$7" fontWeight="600" marginBottom="$6" color="white"> {/* text-2xl font-semibold mb-6 */}
                {t('electronicServices')}
              </Text>
              <Text fontSize="$5" marginBottom="$4" maxWidth={400} color="white"> {/* text-lg mb-4 max-w-md */}
                {t('loginInfo')}
              </Text>

              <Separator marginVertical="$4" backgroundColor="rgba(255,255,255,0.3)" /> {/* hr my-4 border-white/30 */}

              <Text fontSize="$5" fontWeight="500" marginBottom="$2" color="white"> {/* text-lg font-medium mb-2 */}
                {t('studentCapabilities')}:
              </Text>
              <YStack space="$2" marginBottom="$6" paddingLeft="$4"> {/* space-y-2 mb-6 pl-5 (list-disc handled by prepending •) */}
                <Text fontSize="$4" color="white">• {t('viewGrades')}</Text> {/* text-base */}
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
            backgroundColor="$gray2" // bg-gray-200
            paddingHorizontal="$4" // px-4
            paddingVertical="$3" // py-3
            zIndex={10} // relative z-10
        >
          <XStack
            maxWidth={1200} // container
            alignSelf="center" // mx-auto
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column" // flex-col
            gap="$2" // gap-2
            $gtMd={{ flexDirection: 'row' }} // md:flex-row
          >
            <YStack alignItems="center" $gtMd={{ alignItems: 'flex-start' }}>
              <Text fontSize="$2" color="$gray11" textAlign="center" $gtMd={{ textAlign: 'left' }}> {/* text-xs text-gray-700 leading-tight */}
                {t('footerText')}
              </Text>
            </YStack>
            <XStack space="$4"> {/* flex space-x-4 */}
              {showSupportLink && (
                <Button chromeless onPress={() => Linking.openURL('/plans')} // Assuming /plans is a deep link or web URL
                  paddingHorizontal="$0" // to make it more link like
                > 
                  <Text color="$blue10" textDecorationLine="underline"> {/* text-indigo-600 hover:underline */}
                    {t('supportUs')}
                  </Text>
                </Button>
              )}
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default Login;
