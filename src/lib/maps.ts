import type React from 'react';
import type {ReactNode} from 'react';
import type {ViewStyle} from 'react-native';

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Region = LatLng & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type MapViewHandle = {
  animateToRegion: (region: Region, duration?: number) => void;
};

export type MapViewProps = {
  children?: ReactNode;
  customMapStyle?: Record<string, unknown>[];
  initialRegion?: Region;
  loadingEnabled?: boolean;
  onRegionChangeComplete?: (region: Region) => void;
  provider?: string;
  rotateEnabled?: boolean;
  scrollEnabled?: boolean;
  style?: ViewStyle;
  toolbarEnabled?: boolean;
  zoomEnabled?: boolean;
};

export type MarkerProps = {
  children?: ReactNode;
  coordinate: LatLng;
  identifier?: string;
  onPress?: () => void;
  tracksViewChanges?: boolean;
};

type MapsModule = {
  default: React.ForwardRefExoticComponent<MapViewProps & React.RefAttributes<MapViewHandle>>;
  Marker: React.ComponentType<MarkerProps>;
  PROVIDER_GOOGLE: string;
};

const maps = require('react-native-maps') as MapsModule;

export const MapView = maps.default;
export const Marker = maps.Marker;
export const PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
