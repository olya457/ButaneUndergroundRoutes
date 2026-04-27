import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors} from '../theme';

type RoundIconButtonProps = {
  emoji: string;
  onPress: () => void;
  active?: boolean;
  style?: ViewStyle;
};

export const RoundIconButton = ({emoji, onPress, active, style}: RoundIconButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.button, active && styles.active, pressed && styles.pressed, style]}>
    <Text style={styles.emoji}>{emoji}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(58, 19, 4, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  active: {
    backgroundColor: colors.emberLight,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  pressed: {
    opacity: 0.78,
  },
  emoji: {
    fontSize: 18,
  },
});
