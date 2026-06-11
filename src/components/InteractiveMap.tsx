/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Chapter, Explorer } from '../types';
import { CHAPTERS, MACAU_MAP_IMAGE, PIPI_IMAGE, TART_IMAGE } from '../data';
import { Compass, Sparkles, Languages, Coins, Utensils, MapPin, Award, MessageCircleHeart } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface InteractiveMapProps {
  explorer: Explorer;
  onSelectChapter: (chapterId: string) => void;
  onOpenAIChat: () => void;
  onShowCertificate: () => void;
}

export default function InteractiveMap({ explorer, onSelectChapter, onOpenAIChat, onShowCertificate }: InteractiveMapProps) {
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

  const isAllBadgesCollected = explorer.collectedBadges.length === 6;

  // Render correct avatar
  const avatarImage = explorer.selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;
  const mascotName = explorer.selectedMascot === 'pipi' ? '琵琵' : '葡撻寶貝';

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Dynamic Header */}
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
            {isAllBadgesCollected && (
              <motion.span 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"
              >
                🎉 全部收集完畢！
              </motion.span>
            )}
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
              「{explorer.name}，你看！這是一張神奇的澳門手繪地圖！裡面藏著六個超有趣的寶藏魔法通道，點擊任何一個，我們就開始奇妙好玩的旅程吧！」
            </p>
            <div className="mt-1 flex items-center justify-between">
              <AudioSpeaker 
                text={`哈囉${explorer.name}！你看，這是一張神奇的澳門手繪地圖！裡面藏著六個超有趣的寶藏魔法通道，點擊任何一個，我們就開始奇妙好玩的學問挑戰吧！`} 
                lang="zh-HK" 
                size="sm"
              />
              <span className="text-[10px] bg-amber-100/50 text-amber-700 px-2 py-0.5 rounded font-extrabold">
                聽聽導遊說話 🔊
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hand-drawn Map Showcase - Kid Friendly Overlay! */}
        <div className="bg-white border-4 border-[#FFE0B2] rounded-[2.5rem] overflow-hidden p-3 shadow-[6px_6px_0px_#FFD180] mb-6 relative">
          <div className="rounded-[2rem] overflow-hidden relative border-2 border-stone-100 aspect-[16/9] w-full bg-sky-100">
            <img 
              src={MACAU_MAP_IMAGE} 
              alt="澳門手繪地圖景點" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Map Clickable Pins - Overlaid dynamically with adorable CSS */}
            {/* 1. History (⚓ St. Paul coordinate area) */}
            <div className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onSelectChapter('history')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-amber-400 border border-white text-[10px] text-white font-extrabold px-1.5 py-0.5 rounded-full scale-0 group-hover:scale-100 transition-transform">
                  歷史⚓
                </span>
                <span className="flex h-10 w-10 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-amber-400 items-center justify-center border-2 border-white text-lg shadow">
                    ⚓
                  </span>
                </span>
              </motion.button>
            </div>

            {/* 2. Attractions (🗺️ Ruins of St Paul center) */}
            <div className="absolute top-[25%] left-[45%] -translate-x-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onSelectChapter('attractions')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-purple-500 border border-white text-[10px] text-white font-extrabold px-1.5 py-0.5 rounded-full scale-0 group-hover:scale-100 transition-transform">
                  景點🗺️
                </span>
                <span className="flex h-12 w-12 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-12 w-12 bg-purple-500 items-center justify-center border-2 border-white text-xl shadow">
                    🏰
                  </span>
                </span>
              </motion.button>
            </div>

            {/* 3. Food (🍳 Egg Tart in Coloane/Taipa area) */}
            <div className="absolute top-[68%] left-[70%] -translate-x-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onSelectChapter('food')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-orange-400 border border-white text-[10px] text-white font-extrabold px-1.5 py-0.5 rounded-full scale-0 group-hover:scale-100 transition-transform">
                  廚房🧁
                </span>
                <span className="flex h-10 w-10 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-orange-400 items-center justify-center border-2 border-white text-lg shadow">
                    🍳
                  </span>
                </span>
              </motion.button>
            </div>

            {/* 4. Language (🗣️ Macau high view) */}
            <div className="absolute top-[48%] left-[55%] -translate-x-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => onSelectChapter('language')}
                className="group relative flex flex-col items-center"
              >
                <span className="absolute -top-7 bg-sky-400 border border-white text-[10px] text-white font-extrabold px-1.5 py-0.5 rounded-full scale-0 group-hover:scale-100 transition-transform">
                  語言🗣️
                </span>
                <span className="flex h-10 w-10 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-sky-400 items-center justify-center border-2 border-white text-lg shadow">
                    🗣️
                  </span>
                </span>
              </motion.button>
            </div>

            {/* Corner direction card */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border-2 border-[#FFE0B2] px-3 py-2 rounded-2xl shadow text-left pointer-events-none">
              <div className="text-xs font-black text-[#6D4C41] flex items-center gap-1">
                🧭 地圖羅盤小貼士:
              </div>
              <div className="text-[10px] mt-0.5 font-bold text-[#795548]">
                點擊地圖上的閃亮球球，可以直接出發唷！
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Selection Bento Grid Cards */}
        <div className="space-y-3">
          <h2 className="text-lg font-black text-[#6D4C41] text-left pl-1">
            🎒 魔法大冒險的各個篇章：
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTERS.map((ch, idx) => {
              const isBadgeEarned = explorer.collectedBadges.includes(ch.id);
              
              // Custom borders, backgrounds and custom shadows matching standard "Natural Tones" spec:
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
                  transition={{ delay: idx * 0.08 }}
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
                      
                      {/* Sub-label based on state */}
                      <span className={`text-[10px] font-black inline-block px-2.5 py-0.5 rounded-full mt-1 ${
                        isBadgeEarned 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100/70 text-amber-700'
                      }`}>
                        {isBadgeEarned 
                          ? `⭐ 印章已收集: ${ch.badgeName}` 
                          : '👉 點擊開始探險挑戰'
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

        {/* Certificate Unlocked Call to Action if ready! */}
        {isAllBadgesCollected ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [1, 1.01, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="my-8 p-6 bg-gradient-to-br from-[#FFF9C4] via-[#FFE0B2] to-[#FFCC80] text-[#5D4037] border-4 border-[#FFD580] rounded-[2.5rem] text-center shadow-[6px_6px_0px_#FFA726] relative overflow-hidden"
          >
            {/* sparkles */}
            <div className="absolute top-2 left-3 text-3xl">✨</div>
            <div className="absolute bottom-2 right-3 text-3xl">👑</div>
            
            <h3 className="text-2xl font-black mb-2 text-[#6D4C41] animate-bounce">
              🎉 萬歲！全能探索大滿貫！ 🎉
            </h3>
            <p className="text-[#5D4037]/90 font-bold mb-4 text-sm leading-relaxed">
              親愛的小朋友，你已經成功通過了全部六大關卡，收集了所有精美的印章！你太棒啦！現在，快快來領取由 {mascotName} 親自為你頒發的**「澳門榮譽探索小外交官證書」**，並和家人一起拍個照吧！
            </p>
            
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onShowCertificate}
              className="px-6 py-3 bg-white text-[#D32F2F] font-black text-lg rounded-2xl shadow-lg hover:bg-stone-50 border-4 border-[#FF8A65] inline-flex items-center gap-2 cursor-pointer"
            >
              🎓 點我領取榮譽證書 🎓
            </motion.button>
          </motion.div>
        ) : (
          <div className="mt-8 p-4 bg-[#FFF9C4]/30 border-2 border-dashed border-[#FFD580] rounded-3xl text-center">
            <p className="text-[#795548] font-bold text-xs">
              💡 溫馨提示：收集完 6 個大印章，會有神祕獎勵——「畢業證書」解鎖喔！加油呀！
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
