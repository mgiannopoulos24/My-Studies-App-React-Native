import ekpa_logo from '@/assets/images/ekpa-logo.png';
import LoginForm from '@/components/auth/loginForm';
import SignupForm from '@/components/auth/signupForm';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languageOptions } from '@/constants/languages';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showSupportLink, setShowSupportLink] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = Cookies.get('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Skip key detection when typing in form inputs to avoid interference
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      setKeySequence((prev) => {
        const newSequence = prev + e.key.toLowerCase();

        // Check for exact sequence "plan" instead of just containing it
        if (newSequence.endsWith('plan')) {
          setShowSupportLink(true);
          return '';
        }

        return newSequence.slice(-10);
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    Cookies.set('language', newLanguage, { expires: 3650 });
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
    <div className="relative flex min-h-screen flex-col bg-gray-300">
      <div className="absolute inset-y-0 right-0 hidden h-full w-3/4 bg-indigo-600 [clip-path:ellipse(75%_100%_at_100%_50%)] lg:block"></div>
      <div className="absolute inset-x-0 bottom-0 h-full w-full bg-indigo-600 [clip-path:ellipse(100%_80%_at_50%_100%)] lg:hidden"></div>

      <div className="fixed bottom-4 right-4 z-50 md:bottom-auto md:top-4">
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-auto min-w-32 border-gray-300 bg-white/80 hover:bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative z-10 flex flex-grow items-center justify-center p-4">
        <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mx-auto mb-8 w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-xl lg:mb-0 lg:ml-10">
            <div className="p-8">
              <div className="mb-8 flex justify-center">
                <img src={ekpa_logo} alt="ekpa-logo" className="h-15 w-auto" />
              </div>
              <h2 className="mb-6 text-center text-xl font-semibold text-gray-700">{t('title')}</h2>

              <hr className="my-6" />

              {!showLoginForm && !showSignupForm && (
                <div className="text-center">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">{t('loginWith')}:</h3>
                  <Button onClick={handleLoginButtonClick} className="w-full sm:w-auto">
                    {t('institutionalAccount')}
                  </Button>
                </div>
              )}

              {showLoginForm && (
                <>
                  <h3 className="mb-4 text-center text-lg font-medium text-gray-800">
                    {t('loginWithInstitutional')}
                  </h3>
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                  <div className="mt-4 text-center">
                    <Button
                      variant="link"
                      onClick={() => setShowLoginForm(false)}
                      className="text-sm"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </>
              )}

              <hr className="my-6" />

              {!showLoginForm && !showSignupForm && (
                <div className="text-center">
                  <h4 className="mb-4 text-sm text-gray-600">{t('noAccount')}:</h4>
                  <Button
                    variant="outline"
                    onClick={handleSignupButtonClick}
                    className="w-full sm:w-auto"
                  >
                    {t('createAccount')}
                  </Button>
                </div>
              )}

              {showSignupForm && (
                <>
                  <h3 className="mb-4 text-center text-lg font-medium text-gray-800">
                    {t('createAccount')}
                  </h3>
                  <SignupForm onSignupSuccess={handleSignupSuccess} />
                  <div className="mt-4 text-center">
                    <Button
                      variant="link"
                      onClick={() => setShowSignupForm(false)}
                      className="text-sm"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 max-w-xl text-white lg:mt-0 lg:pr-8">
            <h3 className="mb-6 text-2xl font-semibold">{t('electronicServices')}</h3>
            <p className="mb-4 max-w-md text-lg">{t('loginInfo')}</p>
            <hr className="my-4 border-white/30" />
            <p className="mb-2 text-lg font-medium">{t('studentCapabilities')}:</p>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-base">
              <li>{t('viewGrades')}</li>
              <li>{t('coursesRegistration')}</li>
              <li>{t('registrationHistory')}</li>
              <li>{t('electronicRequests')}</li>
            </ul>
            <p className="mb-2 text-lg font-medium">{t('professorCapabilities')}:</p>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-base">
              <li>{t('viewCourses')}</li>
              <li>{t('manageGrades')}</li>
            </ul>
            <p className="mb-2 text-lg font-medium">{t('secretaryCapabilities')}:</p>
            <ul className="list-disc space-y-2 pl-5 text-base">
              <li>{t('manageRequests')}</li>
              <li>{t('setDeadlines')}</li>
              <li>{t('viewStudents')}</li>
              <li>{t('fillForms')}</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="relative z-10 bg-gray-200 px-4 py-3 text-xs text-gray-700">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="text-center md:max-w-full md:text-left">
            <p className="leading-tight">{t('footerText')}</p>
          </div>
          <div className="flex space-x-4">
            {showSupportLink && (
              <a href="/plans" className="text-indigo-600 hover:underline">
                {t('supportUs')}
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;