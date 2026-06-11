/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Explorer } from './types';

// Importing beautiful widgets
import IntroScreen from './components/IntroScreen';
import InteractiveMap from './components/InteractiveMap';
import AIChatModal from './components/AIChatModal';
import ExplorerCertificate from './components/ExplorerCertificate';

// Chapters
import ChapterHistory from './components/ChapterHistory';
import ChapterCulture from './components/ChapterCulture';
import ChapterLanguage from './components/ChapterLanguage';
import ChapterCurrency from './components/ChapterCurrency';
import ChapterFood from './components/ChapterFood';
import ChapterAttractions from './components/ChapterAttractions';

const LOCAL_STORAGE_KEY = 'macau_kids_explorer_progress';

export default function App() {
  const [explorer, setExplorer] = useState<Explorer>({
    name: '',
    hasStarted: false,
    selectedMascot: 'pipi',
    collectedBadges: []
  });

  const [currentView, setCurrentView] = useState<'intro' | 'map' | 'history' | 'culture' | 'language' | 'currency' | 'food' | 'attractions' | 'certificate'>('intro');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Load progress from localStorage on boot
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          setExplorer(parsed);
          setCurrentView('map');
        }
      }
    } catch (e) {
      console.error('Error reading localStorage progress', e);
    }
  }, []);

  // Save progress changes
  const saveProgress = (newExplorer: Explorer) => {
    setExplorer(newExplorer);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newExplorer));
    } catch (e) {
      console.error('Error saving progress to localStorage', e);
    }
  };

  const handleStartJourney = (name: string, mascot: 'pipi' | 'tart') => {
    const updated: Explorer = {
      name,
      hasStarted: true,
      selectedMascot: mascot,
      collectedBadges: []
    };
    saveProgress(updated);
    setCurrentView('map');
  };

  const handleEarnBadge = (badgeId: string) => {
    if (explorer.collectedBadges.includes(badgeId)) return;
    
    const updated: Explorer = {
      ...explorer,
      collectedBadges: [...explorer.collectedBadges, badgeId]
    };
    saveProgress(updated);
  };

  const handleResetJourney = () => {
    const cleared: Explorer = {
      name: '',
      hasStarted: false,
      selectedMascot: 'pipi',
      collectedBadges: []
    };
    saveProgress(cleared);
    setCurrentView('intro');
    setIsAIChatOpen(false);
  };

  return (
    <div className="font-sans text-[#5D4037] bg-[#FFFBEB] min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, type: 'spring' }}
          className="min-h-screen flex flex-col justify-between"
        >
          {currentView === 'intro' && (
            <IntroScreen onStart={handleStartJourney} />
          )}

          {currentView === 'map' && (
            <InteractiveMap
              explorer={explorer}
              onSelectChapter={(id: any) => setCurrentView(id)}
              onOpenAIChat={() => setIsAIChatOpen(true)}
              onShowCertificate={() => setCurrentView('certificate')}
            />
          )}

          {currentView === 'history' && (
            <ChapterHistory
              onBack={() => setCurrentView('map')}
              onEarnBadge={handleEarnBadge}
              isBadgeEarned={explorer.collectedBadges.includes('history')}
              selectedMascot={explorer.selectedMascot}
              explorerName={explorer.name}
            />
          )}

          {currentView === 'culture' && (
            <ChapterCulture
              onBack={() => setCurrentView('map')}
              onEarnBadge={handleEarnBadge}
              isBadgeEarned={explorer.collectedBadges.includes('culture')}
              selectedMascot={explorer.selectedMascot}
              explorerName={explorer.name}
            />
          )}

          {currentView === 'language' && (
            <ChapterLanguage
              onBack={() => setCurrentView('map')}
              onEarnBadge={handleEarnBadge}
              isBadgeEarned={explorer.collectedBadges.includes('language')}
              selectedMascot={explorer.selectedMascot}
              explorerName={explorer.name}
            />
          )}

          {currentView === 'currency' && (
            <ChapterCurrency
              onBack={() => setCurrentView('map')}
              onEarnBadge={handleEarnBadge}
              isBadgeEarned={explorer.collectedBadges.includes('currency')}
              selectedMascot={explorer.selectedMascot}
              explorerName={explorer.name}
            />
          )}

          {currentView === 'food' && (
            <ChapterFood
              onBack={() => setCurrentView('map')}
              onEarnBadge={handleEarnBadge}
              isBadgeEarned={explorer.collectedBadges.includes('food')}
              selectedMascot={explorer.selectedMascot}
              explorerName={explorer.name}
            />
          )}

          {currentView === 'attractions' && (
            <ChapterAttractions
              onBack={() => setCurrentView('map')}
              onEarnBadge={handleEarnBadge}
              isBadgeEarned={explorer.collectedBadges.includes('attractions')}
              selectedMascot={explorer.selectedMascot}
              explorerName={explorer.name}
            />
          )}

          {currentView === 'certificate' && (
            <ExplorerCertificate
              explorerName={explorer.name}
              selectedMascot={explorer.selectedMascot}
              onBack={() => setCurrentView('map')}
              onReset={handleResetJourney}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating AI chat companion bubble dialogue modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        selectedMascot={explorer.selectedMascot}
        explorerName={explorer.name}
      />
    </div>
  );
}
