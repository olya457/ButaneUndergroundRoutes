import {useCallback, useEffect, useMemo, useState} from 'react';
import {clearSavedSiteIds, loadSavedSiteIds, persistSavedSiteIds} from '../storage/savedStorage';

export const useSavedSites = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);

  useEffect(() => {
    let mounted = true;

    loadSavedSiteIds().then(ids => {
      if (mounted && ids.length) {
        setSavedIds(ids);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const commit = useCallback((ids: string[]) => {
    setSavedIds(ids);
    persistSavedSiteIds(ids);
  }, []);

  const toggleSaved = useCallback(
    (siteId: string) => {
      const next = savedSet.has(siteId)
        ? savedIds.filter(id => id !== siteId)
        : [siteId, ...savedIds];
      commit(next);
    },
    [commit, savedIds, savedSet],
  );

  const removeSaved = useCallback(
    (siteId: string) => {
      commit(savedIds.filter(id => id !== siteId));
    },
    [commit, savedIds],
  );

  const clearSaved = useCallback(() => {
    setSavedIds([]);
    clearSavedSiteIds();
  }, []);

  return {savedIds, savedSet, toggleSaved, removeSaved, clearSaved};
};
