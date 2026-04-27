import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {tabContentBottomPadding} from '../components/FloatingTabBar';
import {HeaderBlock} from '../components/HeaderBlock';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {SiteCard} from '../components/SiteCard';
import {sites} from '../data/sites';
import {colors} from '../theme';
import type {Site} from '../types';

type SavedScreenProps = {
  savedIds: string[];
  onExplore: () => void;
  onSitePress: (site: Site) => void;
  onRemove: (siteId: string) => void;
};

export const SavedScreen = ({savedIds, onExplore, onSitePress, onRemove}: SavedScreenProps) => {
  const savedSites = useMemo(
    () => savedIds.map(id => sites.find(site => site.id === id)).filter((site): site is Site => Boolean(site)),
    [savedIds],
  );

  return (
    <Screen padBottom={tabContentBottomPadding}>
      <HeaderBlock
        eyebrow="Collection"
        title="Saved Layers"
        subtitle={savedSites.length ? `${savedSites.length} saved locations` : 'Your personal underground collection'}
      />
      {savedSites.length ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {savedSites.map(site => (
            <SiteCard
              key={site.id}
              site={site}
              large
              saved
              onPress={() => onSitePress(site)}
              onRemove={() => onRemove(site.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyWrap}>
          <View style={styles.stackGlow} />
          <View style={styles.iconBox}>
            <Text style={styles.icon}>🔖</Text>
          </View>
          <Text style={styles.emptyTitle}>No Saved Locations Yet</Text>
          <Text style={styles.emptyText}>
            Start exploring Europe’s underground heritage and save the sites that captivate you.
          </Text>
          <PrimaryButton label="Explore Locations" emoji="🔖" onPress={onExplore} style={styles.emptyButton} />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 14,
    paddingBottom: 20,
  },
  emptyWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 74,
  },
  stackGlow: {
    backgroundColor: 'rgba(106, 37, 9, 0.28)',
    borderRadius: 28,
    height: 84,
    marginBottom: -58,
    transform: [{skewX: '-18deg'}],
    width: 160,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    marginBottom: 56,
    width: 56,
  },
  icon: {
    color: colors.emberLight,
    fontSize: 28,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 16,
    maxWidth: 310,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 34,
    minWidth: 206,
  },
});
