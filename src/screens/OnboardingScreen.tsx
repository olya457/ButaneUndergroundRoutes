import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Images} from '../assets/images';
import {FadeInView} from '../components/FadeInView';
import {PrimaryButton} from '../components/PrimaryButton';
import {colors, layout, platformBottomInset, platformTopInset} from '../theme';

const slides = [
  {
    label: 'BUTANE UNDERGROUND ROUTES',
    title: 'Descend Into History',
    body: 'Discover 2,000 years of underground extraction across Europe, from crystal salt chambers to ancient copper veins.',
  },
  {
    label: 'BUTANE UNDERGROUND ROUTES',
    title: 'Journey Through Stone',
    body: 'Explore tunnels, shafts, and passages carved by generations of miners who shaped the continent below ground.',
  },
  {
    label: 'BUTANE UNDERGROUND ROUTES',
    title: 'Carved by Time',
    body: 'Witness how quarries have sculpted landscapes and provided the stone that built Europe’s greatest monuments.',
  },
  {
    label: 'BUTANE UNDERGROUND ROUTES',
    title: 'Industrial Heritage',
    body: 'Visit the engines, towers, and machines that powered modern Europe, now preserved as living monuments.',
  },
  {
    label: 'BUTANE UNDERGROUND ROUTES',
    title: 'Beyond the Surface',
    body: 'Experience unique stays, dining, and culture in repurposed underground spaces reborn as premium destinations.',
  },
];

type OnboardingScreenProps = {
  onDone: () => void;
};

export const OnboardingScreen = ({onDone}: OnboardingScreenProps) => {
  const [index, setIndex] = useState(0);
  const {height} = useWindowDimensions();
  const slide = slides[index];
  const compact = height < 720;

  const buttonLabel = useMemo(
    () => (index === slides.length - 1 ? 'Begin Exploration' : 'Continue'),
    [index],
  );

  const next = () => {
    if (index === slides.length - 1) {
      onDone();
      return;
    }

    setIndex(value => value + 1);
  };

  return (
    <View style={styles.root}>
      <FadeInView key={`onboarding-image-${index}`} distance={0} duration={620} scaleFrom={1.04} style={styles.imageLayer}>
        <Image
          source={Images.onboarding[index]}
          resizeMode="cover"
          style={styles.image}
        />
      </FadeInView>
      <View style={styles.dimmer} />
      <View style={[styles.content, {paddingTop: platformTopInset + 28, paddingBottom: platformBottomInset + 26}]}>
        <FadeInView key={`onboarding-content-${index}`} distance={18} duration={420} style={styles.contentInner}>
          <Pressable onPress={onDone} hitSlop={12} style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <View style={[styles.bottom, compact && styles.bottomCompact]}>
            <Text style={styles.badge}>{slide.label}</Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.title}>
              {slide.title}
            </Text>
            <Text numberOfLines={compact ? 3 : 4} style={styles.body}>
              {slide.body}
            </Text>
            <View style={styles.dots}>
              {slides.map((_, dotIndex) => (
                <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.dotActive]} />
              ))}
            </View>
            <PrimaryButton label={buttonLabel} onPress={next} style={styles.button} />
          </View>
        </FadeInView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  imageLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenX + 6,
  },
  contentInner: {
    flex: 1,
  },
  skip: {
    alignSelf: 'flex-end',
  },
  skipText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '800',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomCompact: {
    justifyContent: 'flex-end',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(147, 82, 35, 0.84)',
    borderColor: 'rgba(255, 190, 111, 0.26)',
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    overflow: 'hidden',
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 14,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  dots: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginTop: 28,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  dotActive: {
    backgroundColor: colors.text,
    width: 24,
  },
  button: {
    marginTop: 26,
  },
});
