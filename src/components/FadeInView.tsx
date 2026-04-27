import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

type FadeInViewProps = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  scaleFrom?: number;
  style?: StyleProp<ViewStyle>;
};

export const FadeInView = ({
  children,
  delay = 0,
  distance = 14,
  duration = 360,
  scaleFrom = 1,
  style,
}: FadeInViewProps) => {
  const shouldAnimate = process.env.NODE_ENV !== 'test';
  const opacity = useRef(new Animated.Value(shouldAnimate ? 0 : 1)).current;
  const scale = useRef(new Animated.Value(shouldAnimate ? scaleFrom : 1)).current;
  const translateY = useRef(new Animated.Value(shouldAnimate ? distance : 0)).current;

  useEffect(() => {
    if (!shouldAnimate) {
      opacity.setValue(1);
      scale.setValue(1);
      translateY.setValue(0);
      return;
    }

    opacity.setValue(0);
    scale.setValue(scaleFrom);
    translateY.setValue(distance);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, distance, duration, opacity, scale, scaleFrom, shouldAnimate, translateY]);

  return (
    <Animated.View style={[style, {opacity, transform: [{translateY}, {scale}]}]}>
      {children}
    </Animated.View>
  );
};
