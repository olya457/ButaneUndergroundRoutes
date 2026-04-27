import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {tabContentBottomPadding} from '../components/FloatingTabBar';
import {HeaderBlock} from '../components/HeaderBlock';
import {Screen} from '../components/Screen';
import {getSiteById, sites} from '../data/sites';
import {MapView, Marker, PROVIDER_GOOGLE} from '../lib/maps';
import type {MapViewHandle, Region} from '../lib/maps';
import {undergroundMapStyle} from '../lib/mapStyle';
import {colors} from '../theme';
import type {Site} from '../types';

type MapScreenProps = {
  selectedSiteId?: string;
  onSitePress: (site: Site) => void;
};

const europeRegion: Region = {
  latitude: 49.4,
  longitude: 13.8,
  latitudeDelta: 28,
  longitudeDelta: 34,
};

const siteRegion = (site: Site): Region => ({
  latitude: site.latitude,
  longitude: site.longitude,
  latitudeDelta: 3.6,
  longitudeDelta: 3.6,
});

const clampDelta = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const MapScreen = ({selectedSiteId, onSitePress}: MapScreenProps) => {
  const {height} = useWindowDimensions();
  const mapRef = useRef<MapViewHandle | null>(null);
  const [activeId, setActiveId] = useState(selectedSiteId ?? sites[0].id);
  const [currentRegion, setCurrentRegion] = useState<Region>(europeRegion);
  const activeSite = useMemo(() => getSiteById(activeId), [activeId]);
  const compact = height < 730;

  useEffect(() => {
    if (selectedSiteId) {
      setActiveId(selectedSiteId);
    }
  }, [selectedSiteId]);

  useEffect(() => {
    const nextRegion = siteRegion(activeSite);
    setCurrentRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 450);
  }, [activeSite]);

  const animateRegion = (region: Region) => {
    setCurrentRegion(region);
    mapRef.current?.animateToRegion(region, 360);
  };

  const zoomMap = (direction: 'in' | 'out') => {
    const multiplier = direction === 'in' ? 0.55 : 1.75;
    animateRegion({
      ...currentRegion,
      latitudeDelta: clampDelta(currentRegion.latitudeDelta * multiplier, 0.35, 40),
      longitudeDelta: clampDelta(currentRegion.longitudeDelta * multiplier, 0.35, 46),
    });
  };

  const centerActiveSite = () => {
    animateRegion(siteRegion(activeSite));
  };

  const showAllSites = () => {
    animateRegion(europeRegion);
  };

  return (
    <Screen padBottom={tabContentBottomPadding}>
      <HeaderBlock eyebrow="Navigation" title="Subterra Map" />
      <View style={[styles.mapCard, compact && styles.mapCardCompact]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          initialRegion={europeRegion}
          customMapStyle={undergroundMapStyle}
          loadingEnabled
          onRegionChangeComplete={setCurrentRegion}
          rotateEnabled={false}
          zoomEnabled
          toolbarEnabled={false}>
          {sites.map(site => {
            const active = site.id === activeId;

            return (
              <Marker
                key={site.id}
                identifier={site.id}
                coordinate={{latitude: site.latitude, longitude: site.longitude}}
                tracksViewChanges={false}
                onPress={() => setActiveId(site.id)}>
                <View style={[styles.marker, active && styles.markerActive]}>
                  <View style={[styles.markerPulse, active && styles.markerPulseActive]} />
                  <View style={[styles.markerDot, active && styles.markerDotActive]}>
                    <Text style={styles.markerEmoji}>{site.emoji}</Text>
                  </View>
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.countBadge}>
          <Text style={styles.countDot}>●</Text>
          <Text style={styles.countText}>{sites.length} sites</Text>
        </View>
        <View style={styles.controls}>
          <Pressable onPress={() => zoomMap('in')} style={({pressed}) => [styles.controlButton, pressed && styles.pressed]}>
            <Text style={styles.controlText}>➕</Text>
          </Pressable>
          <Pressable onPress={() => zoomMap('out')} style={({pressed}) => [styles.controlButton, pressed && styles.pressed]}>
            <Text style={styles.controlText}>➖</Text>
          </Pressable>
          <Pressable onPress={centerActiveSite} style={({pressed}) => [styles.controlButton, pressed && styles.pressed]}>
            <Text style={styles.controlText}>🎯</Text>
          </Pressable>
          <Pressable onPress={showAllSites} style={({pressed}) => [styles.controlButton, pressed && styles.pressed]}>
            <Text style={styles.controlText}>🌍</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.preview}>
        <Image source={activeSite.image} resizeMode="cover" style={styles.previewImage} />
        <View style={styles.previewBody}>
          <Text numberOfLines={1} style={styles.previewKicker}>
            📍 {activeSite.country}
          </Text>
          <Text numberOfLines={2} style={styles.previewTitle}>
            {activeSite.title}
          </Text>
          <Text numberOfLines={1} style={styles.previewMeta}>
            {activeSite.coordinates}
          </Text>
          <Pressable onPress={() => onSitePress(activeSite)} hitSlop={8}>
            <Text style={styles.previewLink}>View Details ➡️</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => setActiveId(sites[0].id)} hitSlop={10}>
          <Text style={styles.close}>✖️</Text>
        </Pressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    backgroundColor: colors.dark,
    borderColor: colors.line,
    borderRadius: 22,
    borderWidth: 1,
    height: '66%',
    minHeight: 430,
    overflow: 'hidden',
  },
  mapCardCompact: {
    height: '58%',
    minHeight: 330,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  marker: {
    alignItems: 'center',
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  markerPulse: {
    backgroundColor: 'rgba(255, 147, 45, 0.14)',
    borderColor: 'rgba(255, 147, 45, 0.48)',
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    position: 'absolute',
    width: 36,
  },
  markerPulseActive: {
    backgroundColor: 'rgba(255, 147, 45, 0.26)',
    height: 46,
    width: 46,
  },
  markerDot: {
    alignItems: 'center',
    backgroundColor: colors.emberLight,
    borderColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    shadowColor: colors.emberLight,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.85,
    shadowRadius: 8,
    width: 30,
  },
  markerDotActive: {
    height: 36,
    width: 36,
  },
  markerActive: {
    zIndex: 3,
  },
  markerEmoji: {
    fontSize: 15,
  },
  countBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    bottom: 18,
    flexDirection: 'row',
    gap: 7,
    left: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: 'absolute',
  },
  countDot: {
    color: colors.emberLight,
    fontSize: 11,
  },
  countText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  controls: {
    backgroundColor: 'rgba(57, 20, 5, 0.78)',
    borderColor: 'rgba(255, 184, 107, 0.24)',
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    padding: 7,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 143, 43, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  controlText: {
    fontSize: 16,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
    minHeight: 96,
    overflow: 'hidden',
    padding: 10,
  },
  previewImage: {
    borderRadius: 10,
    height: 76,
    width: 90,
  },
  previewBody: {
    flex: 1,
    minWidth: 0,
  },
  previewKicker: {
    color: colors.emberLight,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.3,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  previewTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  previewMeta: {
    color: colors.faint,
    fontSize: 11,
    marginTop: 5,
  },
  previewLink: {
    color: colors.emberLight,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
  },
  close: {
    color: colors.faint,
    fontSize: 15,
    padding: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
