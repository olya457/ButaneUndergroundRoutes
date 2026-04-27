import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, layout, platformBottomInset} from '../theme';
import type {TabKey} from '../types';

type TabItem = {
  key: TabKey;
  label: string;
  emoji: string;
};

const tabs: TabItem[] = [
  {key: 'explorer', label: 'EXPLORER', emoji: '⛏️'},
  {key: 'map', label: 'MAP', emoji: '🗺️'},
  {key: 'strata', label: 'STRATA', emoji: '🧠'},
  {key: 'notes', label: 'NOTES', emoji: '📜'},
  {key: 'saved', label: 'SAVED', emoji: '🔖'},
];

type FloatingTabBarProps = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

export const FloatingTabBar = ({activeTab, onTabPress}: FloatingTabBarProps) => (
  <View style={[styles.wrap, {bottom: platformBottomInset}]}>
    <View style={styles.bar}>
      {tabs.map(tab => {
        const active = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={({pressed}) => [styles.tab, pressed && styles.pressed]}>
            <View style={[styles.iconWrap, active && styles.activeIconWrap]}>
              <Text style={styles.icon}>{tab.emoji}</Text>
            </View>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.label, active && styles.activeLabel]}>
              {tab.label}
            </Text>
            <View style={[styles.dot, active && styles.activeDot]} />
          </Pressable>
        );
      })}
    </View>
  </View>
);

export const tabContentBottomPadding = layout.navHeight + platformBottomInset + 18;

const styles = StyleSheet.create({
  wrap: {
    left: 14,
    position: 'absolute',
    right: 14,
  },
  bar: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    height: layout.navHeight,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    shadowColor: '#140702',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.26,
    shadowRadius: 16,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.75,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 18,
    height: 34,
    justifyContent: 'center',
    width: 38,
  },
  activeIconWrap: {
    backgroundColor: 'rgba(255, 143, 43, 0.24)',
    borderColor: 'rgba(255, 172, 82, 0.32)',
    borderWidth: 1,
  },
  icon: {
    fontSize: 19,
  },
  label: {
    color: colors.faint,
    fontSize: 9,
    fontWeight: '900',
  },
  activeLabel: {
    color: colors.emberLight,
  },
  dot: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    height: 4,
    marginTop: 2,
    width: 4,
  },
  activeDot: {
    backgroundColor: colors.emberLight,
  },
});
