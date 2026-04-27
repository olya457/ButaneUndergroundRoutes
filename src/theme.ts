import {Platform} from 'react-native';

export const colors = {
  ember: '#f4771f',
  emberLight: '#ff902b',
  rust: '#cf4610',
  rustDark: '#8d2307',
  canyon: '#5b2107',
  card: 'rgba(126, 49, 11, 0.68)',
  cardSoft: 'rgba(151, 61, 15, 0.54)',
  panel: 'rgba(78, 28, 6, 0.84)',
  text: '#fff8ee',
  muted: 'rgba(255, 241, 224, 0.72)',
  faint: 'rgba(255, 232, 203, 0.48)',
  line: 'rgba(255, 184, 107, 0.24)',
  dark: '#0b1018',
  success: '#9ad65d',
  danger: '#ff6a55',
};

export const layout = {
  screenX: 20,
  androidEdge: 30,
  iosNavBottom: 20,
  navHeight: 76,
  radius: 18,
};

export const platformTopInset = Platform.OS === 'android' ? layout.androidEdge : 18;
export const platformBottomInset =
  Platform.OS === 'android' ? layout.androidEdge : layout.iosNavBottom;
