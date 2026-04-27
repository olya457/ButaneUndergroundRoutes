import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {Images} from '../assets/images';
import {FadeInView} from '../components/FadeInView';

export const LoaderScreen = () => (
  <View style={styles.root}>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <FadeInView distance={0} duration={900} scaleFrom={0.96} style={styles.fill}>
      <Image source={Images.loader} resizeMode="cover" style={styles.image} />
    </FadeInView>
  </View>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e95f15',
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
