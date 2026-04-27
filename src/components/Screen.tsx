import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {colors, layout, platformTopInset} from '../theme';
import {FadeInView} from './FadeInView';

type ScreenProps = {
  children: React.ReactNode;
  padBottom?: number;
  noHorizontalPadding?: boolean;
};

export const Screen = ({children, padBottom = 0, noHorizontalPadding}: ScreenProps) => (
  <View style={styles.root}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <View style={styles.topWash} />
    <View style={styles.bottomWash} />
    <FadeInView
      style={[
        styles.content,
        noHorizontalPadding ? styles.noHorizontalPadding : styles.horizontalPadding,
        padBottom ? {paddingBottom: padBottom} : null,
      ]}>
      {children}
    </FadeInView>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.ember,
  },
  topWash: {
    ...StyleSheet.absoluteFillObject,
    bottom: '34%',
    backgroundColor: colors.rustDark,
  },
  bottomWash: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '46%',
    backgroundColor: colors.ember,
  },
  content: {
    flex: 1,
    paddingTop: platformTopInset,
  },
  horizontalPadding: {
    paddingHorizontal: layout.screenX,
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
});
