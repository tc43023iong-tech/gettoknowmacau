/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chapter, Explorer } from '../types';
import { CHAPTERS, MACAU_MAP_IMAGE, PIPI_IMAGE, TART_IMAGE, ATTRACTIONS_DATA } from '../data';
import { Compass, Sparkles, Languages, Coins, Utensils, MapPin, Award, MessageCircleHeart, CheckCircle, HelpCircle, XCircle, Star, Heart } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface InteractiveMapProps {
  explorer: Explorer;
  onSelectChapter: (chapterId: string) => void;
  onOpenAIChat: () => void;
  onShowCertificate: () => void;
}

// 100% Native Web Audio API Sound Synthesizer (Works instantly and smoothly in any client sandbox!)
const playPloppingSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.warn('AudioContext disabled', e);
  }
};

const playBuzzerSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.warn('AudioContext disabled', e);
  }
};

const playSuccessChime = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playNote = (freq: number, delay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };
    
    playNote(587.33, 0, 0.3); // D5
    playNote(659.25, 0.08, 0.3); // E5
    playNote(880.00, 0.16, 0.4); // A5
  } catch (e) {
    console.warn('AudioContext disabled', e);
  }
};

export default function InteractiveMap({ explorer, onSelectChapter, onOpenAIChat, onShowCertificate }: InteractiveMapProps) {
  const [selectedSightId, setSelectedSightId] = useState<string | null>(null);
  const [activeQuizAnswerIdx, setActiveQuizAnswerIdx] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<'unsolved' | 'correct' | 'wrong'>('unsolved');
  const [quizHintMessage, setQuizHintMessage] = useState('');
  const [discoveredSights, setDiscoveredSights] = useState<string[]>([]);
  const [goldCoins, setGoldCoins] = useState(10);

  const isAllBadgesCollected = explorer.collectedBadges.length === 6;

  // Render correct avatar
  const avatarImage = explorer.selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;
  const mascotName = explorer.selectedMascot === 'pipi' ? '琵琵' : '葡撻寶貝';

  const getChapterIcon = (iconName: string, color: string) => {
    const iconProps = { className: "w-8 h-8 text-white" };
    switch (iconName) {
      case 'Compass': return <Compass {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Languages': return <Languages {...iconProps} />;
      case 'Coins': return <Coins {...iconProps} />;
      case 'Utensils': return <Utensils {...iconProps} />;
      case 'MapPin': return <MapPin {...iconProps} />;
      default: return <Award {...iconProps} />;
    }
  };

  // Landmark selection lookup
  const activeSight = ATTRACTIONS_DATA.find(s => s.id === selectedSightId);

  const handleOpenSightModal = (id: string) => {
    playPloppingSound();
    setSelectedSightId(id);
    setActiveQuizAnswerIdx(null);
    setQuizStatus('unsolved');
    setQuizHintMessage('💡 閱讀上方的小百科，在下方選出正確答案吧！答對有金幣禮包喔！');
  };

  const handleQuizAnswer = (idx: number, isCorrect: boolean, hint: string) => {
    setActiveQuizAnswerIdx(idx);
    if (isCorrect) {
      playSuccessChime();
      setQuizStatus('correct');
      setQuizHintMessage(`🎉 太棒啦！你答對了！有學問！\n\n📌 老闆悄悄話：${hint}`);
      if (selectedSightId && !discoveredSights.includes(selectedSightId)) {
        setDiscoveredSights(prev => [...prev, selectedSightId]);
        setGoldCoins(prev => prev + 5);
      }
    } else {
      playBuzzerSound();
      setQuizStatus('wrong');
      setQuizHintMessage(`❌ 哎呀，猜錯了唷，再想想嘛！\n\n💡 提示：${hint}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Dynamic Header with Cozy natural tone textures */}
      <header className="bg-[#FFF9C4]/95 border-b-4 border-[#FFD580] rounded-b-[2rem] px-5 py-4 shadow-[0_4px_0px_#FFE0B2] sticky top-0 z-40 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          
          {/* Avatar and name */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`w-14 h-14 rounded-full overflow-hidden border-4 p-1 bg-white flex-shrink-0 ${
                explorer.selectedMascot === 'pipi' ? 'border-sky-300' : 'border-orange-300'
              }`}
            >
              <img src={avatarImage} alt={mascotName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="text-left">
              <span className="text-xs font-black text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full">
                🏅 澳門大探險家
              </span>
              <h2 className="text-lg font-black text-[#6D4C41] leading-tight">
                {explorer.name} <span className="text-[#FF9A8B] text-sm">的小本子</span>
              </h2>
            </div>
          </div>

          {/* Golden bag goldCoins coin indicator for gamification */}
          <div className="flex items-center gap-1.5 bg-amber-100/70 border-2 border-amber-300 px-3 py-1.5 rounded-2xl">
            <span className="text-lg">🪙</span>
            <span className="text-sm font-black text-amber-800">{goldCoins} 顆冒險金幣</span>
          </div>

          {/* AI Helper Quick Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 bg-[#FFCCBC] border-2 border-[#FF8A65] hover:bg-[#FFB9A1] text-[#D32F2F] font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer"
          >
            <MessageCircleHeart className="w-5 h-5 text-rose-500 animate-pulse" />
            <span>問問{mascotName}</span>
          </motion.button>
        </div>

        {/* Badge Stamps progress row */}
        <div className="mt-4 pt-3 border-t-2 border-[#FFECB3]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-[#795548]">🏆 探索印章收集冊 ({explorer.collectedBadges.length}/6)</span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-black">
              ⭐ 景點密室通關: {discoveredSights.length}/6
            </span>
          </div>
          <div className="flex justify-between items-center gap-2 px-1">
            {CHAPTERS.map((ch) => {
              const isEarned = explorer.collectedBadges.includes(ch.id);
              return (
                <motion.div
                  key={ch.id}
                  whileHover={{ scale: 1.15 }}
                  title={`${ch.titleCn}: ${isEarned ? '已獲得印章' : '未探索'}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm border-2 transition-all relative ${
                    isEarned
                      ? 'bg-gradient-to-br from-amber-200 to-orange-300 border-amber-400 rotate-6 shadow-amber-200'
                      : 'bg-stone-100 border-stone-200 text-stone-300 filter grayscale opacity-40'
                  }`}
                >
                  <span>{isEarned ? ch.badgeEmoji : '❓'}</span>
                  {isEarned && (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black leading-none border border-white">
                      ✓
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 mt-6">

        {/* Dynamic Speech Bubble */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white border-4 border-[#FFD180] rounded-3xl p-4 shadow-[4px_4px_0px_#FFE0B2] mb-6 flex gap-4 items-center relative"
        >
          <img src={avatarImage} alt={mascotName} className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1 text-left">
            <p className="text-[#5D4037] font-bold text-sm leading-relaxed">
              「{explorer.name}！快看這地圖！我不僅幫你鋪設了<b>六個大魔法關卡</b>通道，還在手繪地圖上插上了<b>六個閃閃發光的地標小旗子</b>！點擊旗子，就能解鎖現實世界的照片和趣味問答獲得金幣喔！」
            </p>
            <div className="mt-1 flex items-center justify-between">
              <AudioSpeaker 
                text={`哈囉${explorer.name}！你看，這是一張神奇的澳門手繪地圖！點擊地圖上的地標大旗子，就能解鎖現實世界的精緻照片還有趣味小問答獲得金幣喔！我們一起挑戰吧！`} 
                lang="zh-HK" 
                size="sm"
              />
              <span className="text-[10px] bg-amber-100/50 text-amber-700 px-2 py-0.5 rounded font-extrabold">
                聽聽導遊語音 🔊
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Colorful Illustrated Map Layout */}
        <div className="bg-white border-4 border-[#FFE0B2] rounded-[2.5rem] overflow-hidden p-3 shadow-[6px_6px_0px_#FFD180] mb-8 relative">
          <div className="rounded-[2rem] overflow-hidden relative border-2 border-stone-100 aspect-[16/9] w-full bg-sky-100">
            <img 
              src={MACAU_MAP_IMAGE} 
              alt="澳門手繪地圖景點" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

            {/* MAIN PORTAL PINS */}
            {/* 1. History (⚓ St. Paul coordinate area) */}
            <div className="absolute top-[35%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.25 }}
                onClick={() => onSelectChapter('history')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-amber-500 border-2 border-white text-[10px] text-white font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  歷史⚓
                </span>
                <span className="flex h-11 w-11 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-11 w-11 bg-amber-400 items-center justify-center border-2 border-white text-lg shadow-lg">
                    ⚓
                  </span>
                </span>
              </motion.button>
            </div>

            {/* 2. Attractions (🏰 Ruins of St Paul center) */}
            <div className="absolute top-[16%] left-[43%] -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.25 }}
                onClick={() => onSelectChapter('attractions')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-purple-500 border-2 border-white text-[10px] text-white font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  景點拼圖🧩
                </span>
                <span className="flex h-11 w-11 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-11 w-11 bg-purple-500 items-center justify-center border-2 border-white text-lg shadow-lg">
                    🏰
                  </span>
                </span>
              </motion.button>
            </div>

            {/* 3. Food (🍳 Egg Tart in Coloane/Taipa area) */}
            <div className="absolute top-[68%] left-[76%] -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.25 }}
                onClick={() => onSelectChapter('food')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-orange-500 border-2 border-white text-[10px] text-white font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  美食廚房🍳
                </span>
                <span className="flex h-11 w-11 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-11 w-11 bg-orange-400 items-center justify-center border-2 border-white text-lg shadow-lg">
                    🍳
                  </span>
                </span>
              </motion.button>
            </div>

            {/* 4. Language (🗣️ Macau high view) */}
            <div className="absolute top-[48%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.25 }}
                onClick={() => onSelectChapter('language')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-sky-500 border-2 border-white text-[10px] text-white font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  中葡雙語🗣️
                </span>
                <span className="flex h-11 w-11 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-11 w-11 bg-sky-400 items-center justify-center border-2 border-white text-lg shadow-lg">
                    🗣️
                  </span>
                </span>
              </motion.button>
            </div>


            {/* SUB-PINS FOR INTERACTIVE LANDMARK EXPLORATION (6 Pulsing Flags with Emojis!) */}
            {/* 1. Ruins of St Paul's */}
            <div className="absolute top-[28%] left-[34%] z-20">
              <motion.button
                whileHover={{ scale: 1.3 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }}
                onClick={() => handleOpenSightModal('ruins')}
                className="flex items-center gap-1 bg-[#FFF9C4] border-2 border-[#FFA726] rounded-xl px-1.5 py-1 text-xs font-black shadow-md cursor-pointer hover:bg-yellow-50"
              >
                <span>🏛️</span>
                <span className="scale-0 md:scale-100 origin-left transition-transform text-[8px] md:text-[10px] text-amber-950 font-black">大三巴</span>
                {discoveredSights.includes('ruins') && <span className="text-[9px]">⭐</span>}
              </motion.button>
            </div>

            {/* 2. A-Ma Temple */}
            <div className="absolute top-[52%] left-[12%] z-20">
              <motion.button
                whileHover={{ scale: 1.3 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
                onClick={() => handleOpenSightModal('temple')}
                className="flex items-center gap-1 bg-[#FBE9E7] border-2 border-[#FF7043] rounded-xl px-1.5 py-1 text-xs font-black shadow-md cursor-pointer hover:bg-orange-50"
              >
                <span>🛕</span>
                <span className="scale-0 md:scale-100 origin-left transition-transform text-[8px] md:text-[10px] text-orange-950 font-black">媽閣廟</span>
                {discoveredSights.includes('temple') && <span className="text-[9px]">⭐</span>}
              </motion.button>
            </div>

            {/* 3. Rua do Cunha */}
            <div className="absolute top-[52%] left-[45%] z-20">
              <motion.button
                whileHover={{ scale: 1.3 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.5 }}
                onClick={() => handleOpenSightModal('cunha')}
                className="flex items-center gap-1 bg-[#E1F5FE] border-2 border-[#29B6F6] rounded-xl px-1.5 py-1 text-xs font-black shadow-md cursor-pointer hover:bg-sky-50"
              >
                <span>🛍️</span>
                <span className="scale-0 md:scale-100 origin-left transition-transform text-[8px] md:text-[10px] text-blue-950 font-black">官也街</span>
                {discoveredSights.includes('cunha') && <span className="text-[9px]">⭐</span>}
              </motion.button>
            </div>

            {/* 4. Guia Lighthouse */}
            <div className="absolute top-[28%] left-[64%] z-20">
              <motion.button
                whileHover={{ scale: 1.3 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.7 }}
                onClick={() => handleOpenSightModal('lighthouse')}
                className="flex items-center gap-1 bg-[#EDE7F6] border-2 border-[#AB47BC] rounded-xl px-1.5 py-1 text-xs font-black shadow-md cursor-pointer hover:bg-purple-50"
              >
                <span>🚨</span>
                <span className="scale-0 md:scale-100 origin-left transition-transform text-[8px] md:text-[10px] text-purple-950 font-black">小燈塔</span>
                {discoveredSights.includes('lighthouse') && <span className="text-[9px]">⭐</span>}
              </motion.button>
            </div>

            {/* 5. Taipa Houses */}
            <div className="absolute top-[72%] left-[40%] z-20">
              <motion.button
                whileHover={{ scale: 1.3 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.9 }}
                onClick={() => handleOpenSightModal('taipa_houses')}
                className="flex items-center gap-1 bg-[#F1F8E9] border-2 border-[#9CCC65] rounded-xl px-1.5 py-1 text-xs font-black shadow-md cursor-pointer hover:bg-green-50"
              >
                <span>🏡</span>
                <span className="scale-0 md:scale-100 origin-left transition-transform text-[8px] md:text-[10px] text-green-950 font-black">綠別墅</span>
                {discoveredSights.includes('taipa_houses') && <span className="text-[9px]">⭐</span>}
              </motion.button>
            </div>

            {/* 6. Panda Pavilion */}
            <div className="absolute top-[82%] left-[75%] z-20">
              <motion.button
                whileHover={{ scale: 1.3 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 1.1 }}
                onClick={() => handleOpenSightModal('panda')}
                className="flex items-center gap-1 bg-[#ECEFF1] border-2 border-[#78909C] rounded-xl px-1.5 py-1 text-xs font-black shadow-md cursor-pointer hover:bg-blue-50"
              >
                <span>🐼</span>
                <span className="scale-0 md:scale-100 origin-left transition-transform text-[8px] md:text-[10px] text-slate-950 font-black">熊貓館</span>
                {discoveredSights.includes('panda') && <span className="text-[9px]">⭐</span>}
              </motion.button>
            </div>

            {/* Map Tip Column */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border-2 border-[#FFE0B2] px-3.5 py-2.5 rounded-2xl shadow z-30 pointer-events-none text-left max-w-[200px]">
              <div className="text-xs font-black text-[#6D4C41] flex items-center gap-1">
                🧭 實景探秘小指南:
              </div>
              <div className="text-[10px] mt-1 font-bold text-[#795548] leading-tight">
                點擊帶有emoji的大旗子，可解鎖真實大景點的童話祕密和測驗喔！
              </div>
            </div>

          </div>
        </div>

        {/* 6 Core Chapter Portals Bento Box */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-[#6D4C41] text-left pl-1">
            🎒 六個魔法探索傳送門：
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTERS.map((ch, idx) => {
              const isBadgeEarned = explorer.collectedBadges.includes(ch.id);
              
              let cardThemeClasses = "";
              switch (ch.id) {
                case 'history':
                  cardThemeClasses = "border-4 border-[#FFD180] bg-[#FFF8E1] shadow-[4px_4px_0px_#FFB74D]";
                  break;
                case 'culture':
                  cardThemeClasses = "border-4 border-[#FF8A65] bg-[#FBE9E7] shadow-[4px_4px_0px_#FF7043]";
                  break;
                case 'language':
                  cardThemeClasses = "border-4 border-[#CE93D8] bg-[#F3E5F5] shadow-[4px_4px_0px_#AB47BC]";
                  break;
                case 'currency':
                  cardThemeClasses = "border-4 border-[#C5E1A5] bg-[#F1F8E9] shadow-[4px_4px_0px_#9CCC65]";
                  break;
                case 'food':
                  cardThemeClasses = "border-4 border-[#FFCC80] bg-[#FFF3E0] shadow-[4px_4px_0px_#FFA726]";
                  break;
                case 'attractions':
                  cardThemeClasses = "border-4 border-[#81D4FA] bg-[#E1F5FE] shadow-[4px_4px_0px_#29B6F6]";
                  break;
                default:
                  cardThemeClasses = "border-4 border-stone-200 bg-white shadow-sm";
              }

              return (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectChapter(ch.id)}
                  className={`rounded-[1.8rem] p-5 flex items-center justify-between cursor-pointer transition-all ${cardThemeClasses}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ch.color} flex items-center justify-center shadow-md`}>
                      {getChapterIcon(ch.iconName, ch.color)}
                    </div>
                    <div>
                      <h3 className="text-[#5D4037] font-extrabold text-base">
                        {ch.titleCn}
                      </h3>
                      <p className="text-[#795548]/70 text-xs font-bold font-mono">
                        {ch.title}
                      </p>
                      
                      <span className={`text-[10px] font-black inline-block px-2.5 py-0.5 rounded-full mt-1.5 ${
                        isBadgeEarned 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100/70 text-amber-700'
                      }`}>
                        {isBadgeEarned 
                          ? `⭐ 已獲印章: ${ch.badgeName}` 
                          : '👉 點擊開啟本關探索之旅'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="text-3xl text-[#6D4C41]">
                    {isBadgeEarned ? ch.badgeEmoji : '→'}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certificate Section */}
        {isAllBadgesCollected ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [1, 1.01, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="my-8 p-6 bg-gradient-to-br from-[#FFF9C4] via-[#FFE0B2] to-[#FFCC80] text-[#5D4037] border-4 border-[#FFD580] rounded-[2.5rem] text-center shadow-[6px_6px_0px_#FFA726] relative overflow-hidden"
          >
            <div className="absolute top-2 left-3 text-3xl">✨</div>
            <div className="absolute bottom-2 right-3 text-3xl">👑</div>
            
            <h3 className="text-2xl font-black mb-2 text-[#6D4C41] animate-bounce">
              🎉 萬歲！全能探索大滿貫！ 🎉
            </h3>
            <p className="text-[#5D4037]/90 font-extrabold mb-4 text-sm leading-relaxed">
              親愛的小朋友，你已經成功通過了全部六大關卡，收集了所有精美的印章！你太棒啦！現在，快快來領取由 {mascotName} 親自為你頒發的**「澳門榮譽探索小外交官證書」**，並和家人一起拍個照吧！
            </p>
            
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onShowCertificate}
              className="px-6 py-3 bg-white text-[#D32F2F] font-black text-lg rounded-2xl shadow-lg border-4 border-[#FF8A65] inline-flex items-center gap-2 cursor-pointer"
            >
              🎓 點我領取榮譽證書 🎓
            </motion.button>
          </motion.div>
        ) : (
          <div className="mt-8 p-4 bg-[#FFF9C4]/30 border-2 border-dashed border-[#FFD580] rounded-3xl text-center">
            <p className="text-[#795548] font-black text-xs">
              💡 溫馨提示：收集滿 6 個精美大印章，會有神祕獎勵——「畢業證書」解鎖喔！加油呀！
            </p>
          </div>
        )}

      </main>

      {/* OVERLAY POPUP LANDMARK MODAL (Japanese Picture Book style with Real Images + Audio + Mini-Quiz!) */}
      <AnimatePresence>
        {selectedSightId && activeSight && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-[#FFFDF6] border-4 border-amber-300 rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden text-left relative flex flex-col my-8"
            >
              
              {/* Header Title bar */}
              <div className="bg-amber-100 border-b-2 border-amber-200 px-6 py-4 flex justify-between items-center">
                <span className="text-sm font-black text-amber-800 flex items-center gap-1">
                  <span>🗺️ 澳門真實大探秘</span>
                  <span className="text-rose-500 animate-pulse">❤</span>
                </span>
                <button
                  onClick={() => setSelectedSightId(null)}
                  className="bg-white border text-stone-500 rounded-full w-8 h-8 flex items-center justify-center font-black text-sm cursor-pointer hover:bg-stone-50"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable body content */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
                
                {/* Title */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#5D4037] flex items-center gap-2">
                    <span>{activeSight.name}</span>
                    <AudioSpeaker text={activeSight.name + '。' + activeSight.description} lang="zh-HK" size="sm" />
                  </h3>
                  <p className="text-xs font-black text-stone-400 font-mono">
                    粵拼發音：{activeSight.pinyin}
                  </p>
                </div>

                {/* Polaroid Styled Real Photo Frame */}
                <div className="flex justify-center">
                  <div className="bg-white p-3 pb-8 rounded-xl border-2 border-amber-200 shadow-md transform rotate-1 max-w-sm w-full">
                    <img
                      src={activeSight.imageUrl}
                      alt={activeSight.name}
                      className="w-full h-48 object-cover rounded border"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-center mt-3">
                      <span className="text-[11px] font-black text-amber-800/80 tracking-wider">
                        ✨ 真實世界景象，是不是很壯觀漂亮呢？ ✨
                      </span>
                    </div>
                  </div>
                </div>

                {/* Substantive Playful Description */}
                <div className="bg-amber-50/40 p-4 rounded-2xl border-2 border-amber-100/50">
                  <p className="text-stone-600 font-semibold text-xs leading-relaxed text-justify">
                    {activeSight.description}
                  </p>
                </div>

                {/* Fun Fact Small Box */}
                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-3.5 rounded-r-xl">
                  <h4 className="text-xs font-black text-emerald-800 flex items-center gap-1">
                    <span>💡 探密指南針：</span>
                  </h4>
                  <p className="text-stone-600 font-bold text-[11px] mt-1 leading-relaxed">
                    {activeSight.funFact}
                  </p>
                </div>

                {/* INTERACTIVE MINI-QUIZ CORNER */}
                <div className="border-t-2 border-stone-100 pt-5 space-y-4">
                  <div className="flex items-center gap-1.5 pl-1">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <h4 className="text-sm font-black text-[#5D4037]">
                      {activeSight.quizTitle}
                    </h4>
                  </div>

                  <p className="text-xs font-black text-[#795548] bg-amber-50 p-3 rounded-xl border border-amber-200">
                    {activeSight.quizQuestion}
                  </p>

                  <div className="space-y-2">
                    {activeSight.quizOptions.map((opt, idx) => {
                      const isSelected = idx === activeQuizAnswerIdx;
                      let optionStyle = "border-2 bg-white hover:border-amber-300 border-stone-200 text-stone-700";
                      
                      if (isSelected) {
                        if (opt.isCorrect) {
                          optionStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800";
                        } else {
                          optionStyle = "border-2 border-rose-400 bg-rose-50 text-rose-800";
                        }
                      }

                      return (
                        <motion.button
                          key={opt.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleQuizAnswer(idx, opt.isCorrect, opt.hint)}
                          className={`w-full p-3 text-xs font-bold rounded-2xl text-left cursor-pointer flex items-center justify-between transition-all ${optionStyle}`}
                        >
                          <span>{opt.text}</span>
                          {isSelected && (
                            opt.isCorrect 
                              ? <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              : <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Quiz Outcome Indicator with Audio reading */}
                  <div className="p-3.5 bg-yellow-50 rounded-2xl border border-yellow-200 text-[11px] font-black text-amber-900 leading-relaxed text-justify transition-all">
                    {quizHintMessage}
                    {quizStatus === 'correct' && (
                      <div className="mt-2 text-right">
                        <AudioSpeaker text={`唔哇大答對啦！${activeSight.quizOptions[activeQuizAnswerIdx || 0]?.hint}`} lang="zh-HK" size="sm" label="聽聽解答" />
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Bottom footer button */}
              <div className="bg-stone-50 border-t border-stone-100 p-4 flex gap-3">
                <button
                  onClick={() => setSelectedSightId(null)}
                  className="w-full py-3.5 bg-[#6D4C41] hover:bg-[#5D4037] text-white font-black text-xs rounded-2xl cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>我懂了！一齊去探索下個項目喔！</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
