import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

type HeaderBlockProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export const HeaderBlock = ({eyebrow, title, subtitle}: HeaderBlockProps) => (
  <View style={styles.wrap}>
    <Text style={styles.eyebrow}>{eyebrow}</Text>
    <Text adjustsFontSizeToFit numberOfLines={2} minimumFontScale={0.82} style={styles.title}>
      {title}
    </Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginTop: 24,
    marginBottom: 22,
  },
  eyebrow: {
    color: colors.faint,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
});
