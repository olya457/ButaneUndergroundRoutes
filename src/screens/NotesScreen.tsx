import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {tabContentBottomPadding} from '../components/FloatingTabBar';
import {HeaderBlock} from '../components/HeaderBlock';
import {Screen} from '../components/Screen';
import {articles} from '../data/articles';
import {colors} from '../theme';
import type {Article} from '../types';

type NotesScreenProps = {
  onArticlePress: (article: Article) => void;
};

export const NotesScreen = ({onArticlePress}: NotesScreenProps) => (
  <Screen padBottom={tabContentBottomPadding}>
    <HeaderBlock eyebrow="Journal" title="Extraction Notes" subtitle="Stories from the depths" />
    <Text style={styles.sectionLabel}>Recent Articles</Text>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
      {articles.map(article => (
        <Pressable
          key={article.id}
          onPress={() => onArticlePress(article)}
          style={({pressed}) => [styles.card, pressed && styles.pressed]}>
          <View style={styles.articleText}>
            <Text numberOfLines={1} style={styles.kicker}>
              {article.kicker}
            </Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.78} numberOfLines={2} style={styles.title}>
              {article.title}
            </Text>
            <Text numberOfLines={2} style={styles.lead}>
              {article.lead}
            </Text>
          </View>
          <Text style={styles.chevron}>➡️</Text>
        </Pressable>
      ))}
    </ScrollView>
  </Screen>
);

const styles = StyleSheet.create({
  sectionLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  list: {
    gap: 12,
    paddingBottom: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 92,
    padding: 18,
  },
  pressed: {
    opacity: 0.82,
  },
  articleText: {
    flex: 1,
    minWidth: 0,
  },
  kicker: {
    color: colors.emberLight,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  lead: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  chevron: {
    color: colors.faint,
    fontSize: 16,
    marginLeft: 12,
  },
});
