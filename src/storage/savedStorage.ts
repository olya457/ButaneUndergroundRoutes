import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'butane.savedSiteIds';
const memory: Record<string, string | null> = {};

const parseIds = (value: unknown): string[] => {
  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

export const loadSavedSiteIds = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return parseIds(value);
  } catch {
    return parseIds(memory[key]);
  }
};

export const persistSavedSiteIds = async (ids: string[]): Promise<void> => {
  const value = JSON.stringify(ids);

  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    memory[key] = value;
  }
};

export const clearSavedSiteIds = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    memory[key] = null;
  }
};
