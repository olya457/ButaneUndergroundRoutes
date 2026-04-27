import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from './components/FloatingTabBar';
import {getArticleById} from './data/articles';
import {getSiteById} from './data/sites';
import {useSavedSites} from './hooks/useSavedSites';
import {ArticleDetailScreen} from './screens/ArticleDetailScreen';
import {ExplorerScreen} from './screens/ExplorerScreen';
import {LoaderScreen} from './screens/LoaderScreen';
import {MapScreen} from './screens/MapScreen';
import {NotesScreen} from './screens/NotesScreen';
import {OnboardingScreen} from './screens/OnboardingScreen';
import {SavedScreen} from './screens/SavedScreen';
import {SiteDetailScreen} from './screens/SiteDetailScreen';
import {StrataScreen} from './screens/StrataScreen';
import type {Article, Site, TabKey} from './types';

type Stage = 'loader' | 'onboarding' | 'main';

export const AppRoot = () => {
  const [stage, setStage] = useState<Stage>('loader');
  const [activeTab, setActiveTab] = useState<TabKey>('explorer');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [mapSelectedSiteId, setMapSelectedSiteId] = useState<string | undefined>();
  const {savedIds, savedSet, toggleSaved, removeSaved} = useSavedSites();

  useEffect(() => {
    const timer = setTimeout(() => setStage('onboarding'), 5000);
    return () => clearTimeout(timer);
  }, []);

  const selectedSite = useMemo(
    () => (selectedSiteId ? getSiteById(selectedSiteId) : null),
    [selectedSiteId],
  );

  const selectedArticle = useMemo(
    () => (selectedArticleId ? getArticleById(selectedArticleId) : null),
    [selectedArticleId],
  );

  const openSite = (site: Site) => {
    setSelectedSiteId(site.id);
    setSelectedArticleId(null);
  };

  const openArticle = (article: Article) => {
    setSelectedArticleId(article.id);
    setSelectedSiteId(null);
  };

  const goTab = (tab: TabKey) => {
    setActiveTab(tab);
    setSelectedSiteId(null);
    setSelectedArticleId(null);
  };

  const viewSiteOnMap = (site: Site) => {
    setMapSelectedSiteId(site.id);
    setSelectedSiteId(null);
    setSelectedArticleId(null);
    setActiveTab('map');
  };

  if (stage === 'loader') {
    return <LoaderScreen />;
  }

  if (stage === 'onboarding') {
    return <OnboardingScreen onDone={() => setStage('main')} />;
  }

  if (selectedSite) {
    return (
      <SiteDetailScreen
        site={selectedSite}
        saved={savedSet.has(selectedSite.id)}
        onBack={() => setSelectedSiteId(null)}
        onToggleSaved={() => toggleSaved(selectedSite.id)}
        onViewMap={() => viewSiteOnMap(selectedSite)}
      />
    );
  }

  if (selectedArticle) {
    return <ArticleDetailScreen article={selectedArticle} onBack={() => setSelectedArticleId(null)} />;
  }

  return (
    <View style={styles.root}>
      {activeTab === 'explorer' ? <ExplorerScreen onSitePress={openSite} /> : null}
      {activeTab === 'map' ? <MapScreen selectedSiteId={mapSelectedSiteId} onSitePress={openSite} /> : null}
      {activeTab === 'strata' ? <StrataScreen /> : null}
      {activeTab === 'notes' ? <NotesScreen onArticlePress={openArticle} /> : null}
      {activeTab === 'saved' ? (
        <SavedScreen
          savedIds={savedIds}
          onExplore={() => goTab('explorer')}
          onSitePress={openSite}
          onRemove={removeSaved}
        />
      ) : null}
      <FloatingTabBar activeTab={activeTab} onTabPress={goTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
