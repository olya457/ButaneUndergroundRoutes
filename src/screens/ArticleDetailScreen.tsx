import React from 'react';
import {Share, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RoundIconButton} from '../components/RoundIconButton';
import {Screen} from '../components/Screen';
import {colors, platformTopInset} from '../theme';
import type {Article} from '../types';

type ArticleDetailScreenProps = {
  article: Article;
  onBack: () => void;
};

export const ArticleDetailScreen = ({article, onBack}: ArticleDetailScreenProps) => {
  const shareArticle = () => {
    Share.share({
      title: article.title,
      message: `${article.title}\n\n${article.lead}`,
    });
  };

  return (
    <Screen noHorizontalPadding>
      <View style={[styles.actions, {top: platformTopInset + 20}]}>
        <RoundIconButton emoji="⬅️" onPress={onBack} />
        <RoundIconButton emoji="🔗" onPress={shareArticle} style={styles.share} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>{article.kicker}</Text>
        <Text adjustsFontSizeToFit minimumFontScale={0.82} numberOfLines={3} style={styles.title}>
          {article.title}
        </Text>
        <Text style={styles.lead}>{article.lead}</Text>
        {article.body.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 20,
    position: 'absolute',
    right: 20,
    zIndex: 3,
  },
  share: {
    width: 72,
  },
  content: {
    paddingBottom: 42,
    paddingHorizontal: 20,
    paddingTop: 116,
  },
  kicker: {
    color: colors.emberLight,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 29,
  },
  lead: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    marginTop: 28,
  },
  paragraph: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 22,
  },
});
