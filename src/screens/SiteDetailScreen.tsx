import React from 'react';
import {ImageBackground, ScrollView, Share, StatusBar, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {FadeInView} from '../components/FadeInView';
import {PrimaryButton} from '../components/PrimaryButton';
import {RoundIconButton} from '../components/RoundIconButton';
import {colors, platformBottomInset, platformTopInset} from '../theme';
import type {Site} from '../types';

type SiteDetailScreenProps = {
  site: Site;
  saved: boolean;
  onBack: () => void;
  onToggleSaved: () => void;
  onViewMap: () => void;
};

export const SiteDetailScreen = ({site, saved, onBack, onToggleSaved, onViewMap}: SiteDetailScreenProps) => {
  const {height} = useWindowDimensions();
  const heroHeight = Math.max(260, Math.min(340, height * 0.38));

  const shareSite = () => {
    Share.share({
      title: site.title,
      message: `${site.title}\n${site.region}\n${site.address}\n${site.coordinates}`,
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, {paddingBottom: platformBottomInset + 28}]}>
        <FadeInView distance={0} duration={460}>
          <ImageBackground source={site.image} resizeMode="cover" style={[styles.hero, {height: heroHeight}]}>
          <View style={styles.heroDim} />
          <View style={[styles.actions, {top: platformTopInset + 16}]}>
            <RoundIconButton emoji="⬅️" onPress={onBack} />
            <View style={styles.rightActions}>
              <RoundIconButton emoji="🔖" active={saved} onPress={onToggleSaved} />
              <RoundIconButton emoji="🔗" onPress={shareSite} />
            </View>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.category}>{site.categoryLabel}</Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.title}>
              {site.title}
            </Text>
            <Text numberOfLines={1} style={styles.region}>
              📍 {site.region}
            </Text>
          </View>
          </ImageBackground>
        </FadeInView>
        <FadeInView delay={80} distance={18} duration={420} style={styles.sheet}>
          <PrimaryButton label="View on Map" emoji="📍" onPress={onViewMap} style={styles.mapButton} />
          <Text style={styles.sectionTitle}>About this site</Text>
          <Text style={styles.description}>{site.description}</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoEmoji}>📍</Text>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{site.address}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoEmoji}>🧭</Text>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Coordinates</Text>
                <Text style={styles.infoValue}>{site.coordinates}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoEmoji}>{site.emoji}</Text>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Layer Type</Text>
                <Text style={styles.infoValue}>{site.tag}</Text>
              </View>
            </View>
          </View>
        </FadeInView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.ember,
    flex: 1,
  },
  content: {
    backgroundColor: colors.ember,
  },
  hero: {
    justifyContent: 'flex-end',
  },
  heroDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 18,
    position: 'absolute',
    right: 18,
    zIndex: 3,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroText: {
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  category: {
    color: colors.emberLight,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0,
  },
  region: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 7,
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  mapButton: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 14,
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  infoRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
  },
  infoEmoji: {
    fontSize: 16,
    marginTop: 3,
    width: 24,
  },
  infoText: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  divider: {
    backgroundColor: colors.line,
    height: 1,
    marginLeft: 36,
  },
});
