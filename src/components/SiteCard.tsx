import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';
import type {Site} from '../types';

type SiteCardProps = {
  site: Site;
  saved?: boolean;
  onPress: () => void;
  onSavePress?: () => void;
  large?: boolean;
  onRemove?: () => void;
};

export const SiteCard = ({site, saved, onPress, onSavePress, large, onRemove}: SiteCardProps) => (
  <Pressable onPress={onPress} style={({pressed}) => [large ? styles.largeCard : styles.card, pressed && styles.pressed]}>
    <Image source={site.image} resizeMode="cover" style={large ? styles.largeImage : styles.image} />
    <View style={large ? styles.largeBody : styles.body}>
      <Text numberOfLines={1} style={styles.kicker}>
        {site.categoryLabel}
      </Text>
      <Text adjustsFontSizeToFit numberOfLines={2} minimumFontScale={0.78} style={styles.title}>
        {site.title}
      </Text>
      <View style={styles.metaRow}>
        <Text numberOfLines={1} style={styles.meta}>
          📍 {large ? site.region : site.country}
        </Text>
        <Text numberOfLines={1} style={styles.pill}>
          {site.tag}
        </Text>
      </View>
    </View>
    {onSavePress ? (
      <Pressable onPress={onSavePress} hitSlop={10} style={[styles.save, saved && styles.saveActive]}>
        <Text style={styles.saveText}>🔖</Text>
      </Pressable>
    ) : null}
    {onRemove ? (
      <Pressable onPress={onRemove} hitSlop={10} style={styles.remove}>
        <Text style={styles.removeText}>✖️</Text>
      </Pressable>
    ) : null}
    {!large ? <Text style={styles.chevron}>➡️</Text> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 96,
    overflow: 'hidden',
    padding: 12,
  },
  largeCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.82,
  },
  image: {
    borderRadius: 12,
    height: 72,
    width: 72,
  },
  largeImage: {
    height: 142,
    width: '100%',
  },
  body: {
    flex: 1,
    marginLeft: 14,
    minWidth: 0,
    paddingRight: 18,
  },
  largeBody: {
    gap: 8,
    padding: 14,
    paddingRight: 48,
  },
  kicker: {
    color: colors.emberLight,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.6,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    minWidth: 0,
  },
  meta: {
    color: colors.muted,
    flexShrink: 1,
    fontSize: 12,
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    color: colors.faint,
    fontSize: 10,
    overflow: 'hidden',
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  chevron: {
    color: colors.faint,
    fontSize: 16,
  },
  save: {
    alignItems: 'center',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
    width: 34,
  },
  saveActive: {
    backgroundColor: 'rgba(255, 143, 43, 0.28)',
  },
  saveText: {
    fontSize: 17,
  },
  remove: {
    alignItems: 'center',
    backgroundColor: 'rgba(65, 22, 4, 0.45)',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 32,
  },
  removeText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 18,
  },
});
