import React, {useMemo, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Images} from '../assets/images';
import {tabContentBottomPadding} from '../components/FloatingTabBar';
import {HeaderBlock} from '../components/HeaderBlock';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {quizLevels} from '../data/quiz';
import {colors} from '../theme';

type QuizMode = 'home' | 'question' | 'result';

const letters = ['A', 'B', 'C', 'D'];

export const StrataScreen = () => {
  const {height} = useWindowDimensions();
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [mode, setMode] = useState<QuizMode>('home');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const compact = height < 720;
  const level = quizLevels[selectedLevel];
  const question = level.questions[questionIndex];
  const scoreTitle = score <= 2 ? 'Surface Level' : score <= 5 ? 'Solid Strata' : 'Deep Expert';
  const scoreText =
    score <= 2
      ? 'You’ve only scratched the surface. Go deeper and uncover what lies beneath.'
      : score <= 5
        ? 'You understand the layers. A few more descents will sharpen the route.'
        : 'You read stone like a field guide. The deeper routes are yours.';

  const progress = useMemo(
    () => `${questionIndex + 1} of ${level.questions.length}`,
    [level.questions.length, questionIndex],
  );

  const start = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setMode('question');
  };

  const answer = (index: number) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);
    if (index === question.correctIndex) {
      setScore(value => value + 1);
    }
  };

  const next = () => {
    if (questionIndex === level.questions.length - 1) {
      setMode('result');
      return;
    }

    setQuestionIndex(value => value + 1);
    setSelectedAnswer(null);
  };

  if (mode === 'question') {
    return (
      <Screen padBottom={tabContentBottomPadding}>
        <View style={styles.quizTop}>
          <Text style={styles.progressLabel}>Question {progress}</Text>
          <Text style={styles.scoreLabel}>{score} correct</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, {width: `${((questionIndex + 1) / level.questions.length) * 100}%`}]} />
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionKicker}>🧠 Strata Insight</Text>
          <Text style={styles.questionText}>{question.prompt}</Text>
        </View>
        <View style={styles.answers}>
          {question.answers.map((answerText, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = question.correctIndex === index;
            const showCorrect = selectedAnswer !== null && isCorrect;
            const showWrong = selectedAnswer === index && !isCorrect;

            return (
              <Pressable
                key={answerText}
                onPress={() => answer(index)}
                style={({pressed}) => [
                  styles.answer,
                  showCorrect && styles.answerCorrect,
                  showWrong && styles.answerWrong,
                  pressed && selectedAnswer === null && styles.pressed,
                ]}>
                <View style={[styles.answerLetter, isSelected && styles.answerLetterActive]}>
                  <Text style={styles.answerLetterText}>{letters[index]}</Text>
                </View>
                <Text style={[styles.answerText, showCorrect && styles.answerCorrectText, showWrong && styles.answerWrongText]}>
                  {answerText}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {selectedAnswer !== null ? (
          <PrimaryButton label={questionIndex === level.questions.length - 1 ? 'Finish Level' : 'Next Question'} onPress={next} style={styles.nextButton} />
        ) : null}
      </Screen>
    );
  }

  if (mode === 'result') {
    return (
      <Screen padBottom={tabContentBottomPadding}>
        <Text style={styles.resultTitle}>Keep Digging</Text>
        <View style={styles.resultBody}>
          <Image source={Images.quizRock} resizeMode="contain" style={styles.resultImage} />
          <View style={styles.resultCard}>
            <Text style={styles.resultScore}>{score} / {level.questions.length}</Text>
            <Text style={styles.resultName}>{scoreTitle}</Text>
            <Text style={styles.resultText}>{scoreText}</Text>
          </View>
          <PrimaryButton label="Try Again" emoji="🔁" onPress={start} dark style={styles.tryButton} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen padBottom={tabContentBottomPadding}>
      <HeaderBlock eyebrow="Knowledge" title="Strata Insight" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.homeScroll}>
        {compact ? null : <Image source={Images.quizRock} resizeMode="contain" style={styles.heroImage} />}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Test Your Underground Knowledge</Text>
          <Text style={styles.introText}>
            7 questions covering geology, mining history, and underground heritage across Europe. How deep does your knowledge go?
          </Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>Geology</Text>
            <Text style={styles.statLabel}>Topics</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>No limit</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.levels}>
          {quizLevels.map((item, index) => {
            const active = selectedLevel === index;

            return (
              <Pressable
                key={item.level}
                onPress={() => setSelectedLevel(index)}
                style={({pressed}) => [styles.levelChip, active && styles.levelChipActive, pressed && styles.pressed]}>
                <Text style={[styles.levelChipText, active && styles.levelChipTextActive]}>Level {item.level}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <Text style={styles.levelTitle}>{level.title}</Text>
        <PrimaryButton label="Begin Quiz" onPress={start} style={styles.beginButton} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  homeScroll: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  heroImage: {
    height: 150,
    marginTop: -4,
    width: '100%',
  },
  introCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    width: '100%',
  },
  introTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  introText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    width: '100%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.cardSoft,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 13,
  },
  statValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.faint,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  levels: {
    gap: 10,
    paddingVertical: 18,
  },
  levelChip: {
    backgroundColor: 'rgba(93, 31, 6, 0.62)',
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  levelChipActive: {
    backgroundColor: colors.emberLight,
  },
  levelChipText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
  },
  levelChipTextActive: {
    color: colors.text,
  },
  levelTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 12,
  },
  beginButton: {
    width: '100%',
  },
  quizTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  progressLabel: {
    color: colors.faint,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  scoreLabel: {
    color: colors.emberLight,
    fontSize: 12,
    fontWeight: '900',
  },
  progressTrack: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 2,
    height: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.emberLight,
    height: '100%',
  },
  questionCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 20,
    padding: 18,
  },
  questionKicker: {
    color: colors.emberLight,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  questionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 23,
  },
  answers: {
    gap: 12,
    marginTop: 18,
  },
  answer: {
    alignItems: 'center',
    backgroundColor: colors.cardSoft,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: 14,
  },
  answerCorrect: {
    backgroundColor: 'rgba(116, 140, 44, 0.5)',
    borderColor: 'rgba(178, 230, 105, 0.45)',
  },
  answerWrong: {
    backgroundColor: 'rgba(176, 53, 36, 0.52)',
    borderColor: 'rgba(255, 112, 86, 0.44)',
  },
  answerLetter: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 11,
    height: 22,
    justifyContent: 'center',
    marginRight: 12,
    width: 22,
  },
  answerLetterActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  answerLetterText: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
  },
  answerText: {
    color: colors.muted,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  answerCorrectText: {
    color: colors.success,
  },
  answerWrongText: {
    color: colors.text,
  },
  nextButton: {
    marginTop: 26,
  },
  resultTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 42,
  },
  resultBody: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 84,
  },
  resultImage: {
    height: 190,
    width: '100%',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 20,
    padding: 18,
    width: '100%',
  },
  resultScore: {
    color: colors.emberLight,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  resultName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  resultText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9,
  },
  tryButton: {
    marginTop: 36,
    width: '100%',
  },
  pressed: {
    opacity: 0.78,
  },
});
