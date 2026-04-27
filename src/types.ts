import type {ImageSourcePropType} from 'react-native';

export type TabKey = 'explorer' | 'map' | 'strata' | 'notes' | 'saved';

export type SiteCategory = 'salt' | 'industrial' | 'quarry' | 'conversion';

export type Site = {
  id: string;
  title: string;
  country: string;
  city: string;
  region: string;
  category: SiteCategory;
  categoryLabel: string;
  tag: string;
  emoji: string;
  description: string;
  coordinates: string;
  latitude: number;
  longitude: number;
  address: string;
  image: ImageSourcePropType;
  mapX: number;
  mapY: number;
};

export type Article = {
  id: string;
  title: string;
  kicker: string;
  lead: string;
  body: string[];
};

export type QuizQuestion = {
  prompt: string;
  answers: string[];
  correctIndex: number;
};

export type QuizLevel = {
  level: number;
  title: string;
  questions: QuizQuestion[];
};
