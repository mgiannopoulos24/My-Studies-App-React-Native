import en from '@/locales/en.yaml';
import gr from '@/locales/gr.yaml';
// import ro from '@/locales/ro.yaml';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    gr: {
      translation: gr,
    },
    en: {
      translation: en,
    },
    //   ro: {
    //     translation: ro,
    //   },
  },
  fallbackLng: 'gr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
