import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {HeaderBlock} from '../components/HeaderBlock';
import {tabContentBottomPadding} from '../components/FloatingTabBar';
import {Screen} from '../components/Screen';
import {SiteCard} from '../components/SiteCard';
import {categoryFilters, sites} from '../data/sites';
import {colors} from '../theme';
import type {Site, SiteCategory} from '../types';

type ExplorerScreenProps = {
  onSitePress: (site: Site) => void;
};

export const ExplorerScreen = ({onSitePress}: ExplorerScreenProps) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SiteCategory | 'all'>('all');

  const filteredSites = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return sites.filter(site => {
      const matchesCategory = category === 'all' || site.category === category;
      const matchesSearch =
        !needle ||
        site.title.toLowerCase().includes(needle) ||
        site.country.toLowerCase().includes(needle) ||
        site.city.toLowerCase().includes(needle) ||
        site.categoryLabel.toLowerCase().includes(needle);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <Screen padBottom={tabContentBottomPadding}>
      <HeaderBlock eyebrow="Explore" title="Mineral Explorer" subtitle={`${sites.length} underground sites across Europe`} />
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          placeholder="Search locations, countries..."
          placeholderTextColor={colors.faint}
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          selectionColor={colors.emberLight}
        />
      </View>
      <ScrollView
        horizontal
        style={styles.filtersScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}>
        {categoryFilters.map(item => {
          const active = item.key === category;

          return (
            <Pressable
              key={item.key}
              onPress={() => setCategory(item.key)}
              style={({pressed}) => [styles.chip, active && styles.chipActive, pressed && styles.pressed]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item.emoji} {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Text style={styles.sectionLabel}>All Sites</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {filteredSites.map(site => (
          <SiteCard key={site.id} site={site} onPress={() => onSitePress(site)} />
        ))}
        {!filteredSites.length ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No matching routes</Text>
            <Text style={styles.emptyText}>Try another country, mineral, or site type.</Text>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(93, 31, 6, 0.62)',
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    height: 46,
    paddingHorizontal: 15,
  },
  searchIcon: {
    color: colors.faint,
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    minWidth: 0,
    padding: 0,
  },
  filters: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingRight: 24,
  },
  filtersScroll: {
    flexGrow: 0,
    height: 68,
    marginBottom: 4,
    marginTop: 12,
    overflow: 'visible',
  },
  chip: {
    alignItems: 'center',
    backgroundColor: 'rgba(97, 34, 8, 0.62)',
    borderColor: colors.line,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    minWidth: 96,
    paddingHorizontal: 14,
  },
  chipActive: {
    backgroundColor: colors.emberLight,
    borderColor: 'rgba(255, 255, 255, 0.26)',
  },
  chipText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 18,
  },
  chipTextActive: {
    color: colors.text,
  },
  pressed: {
    opacity: 0.78,
  },
  sectionLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  list: {
    gap: 12,
    paddingBottom: 20,
  },
  empty: {
    alignItems: 'center',
    backgroundColor: colors.cardSoft,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    padding: 24,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    textAlign: 'center',
  },
});
