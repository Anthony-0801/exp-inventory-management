import i18n from 'i18next';
import { NativeModules, Platform } from 'react-native';

import en from './locales/en.json';
import fr from './locales/fr.json';
import fil from './locales/fil.json';

// Get the user's preferred language from device
const getDeviceLanguage = () => {
  let deviceLanguage: string | undefined;

  if (Platform.OS === 'android') {
    deviceLanguage = NativeModules?.LanguageManager?.localeIdentifier;
  } else {
    deviceLanguage = NativeModules?.I18nManager?.localeIdentifier;
  }

  // Fallback to 'en' if deviceLanguage is null or undefined
  return deviceLanguage ? deviceLanguage.split('_')[0] : 'en';
};

i18n.init({
  lng: getDeviceLanguage(),
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    fil: { translation: fil },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
