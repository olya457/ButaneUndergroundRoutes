import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors} from '../theme';

type PrimaryButtonProps = {
  label: string;
  emoji?: string;
  onPress: () => void;
  style?: ViewStyle;
  dark?: boolean;
};

export const PrimaryButton = ({label, emoji = '➡️', onPress, style, dark}: PrimaryButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.button,
      dark && styles.dark,
      pressed && styles.pressed,
      style,
    ]}>
    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.label}>
      {emoji ? `${label} ${emoji}` : label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.emberLight,
    borderRadius: 15,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  dark: {
    backgroundColor: colors.canyon,
  },
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.985}],
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
});
