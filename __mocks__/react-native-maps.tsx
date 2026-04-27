import React, {forwardRef, useImperativeHandle} from 'react';
import {Pressable, View} from 'react-native';

export const PROVIDER_GOOGLE = 'google';

export const Marker = ({children, onPress}: {children?: React.ReactNode; onPress?: () => void}) => (
  <Pressable onPress={onPress}>{children}</Pressable>
);

const MapView = forwardRef((_props: {children?: React.ReactNode}, ref) => {
  useImperativeHandle(ref, () => ({
    animateToRegion: () => undefined,
  }));

  return <View>{_props.children}</View>;
});

export default MapView;
