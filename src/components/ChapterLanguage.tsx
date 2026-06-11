/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LANGUAGE_WORDS, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, Volume2, Star, Check } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterLanguageProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

export default function ChapterLanguage({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterLanguageProps) {
  const [activeCategory, setActiveCategory] = useState<'greeting' | 'life' | 'food'>('greeting');
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [heardPhrases, setHeardPhrases] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);

  const filteredWords = LANGUAGE_WORDS.filter(w => w.category === activeCategory);
  const currentWord = filteredWords[activeWordIdx] || filteredWords[0];
  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;

  const handleHearWord = (phrase: string) => {
    if (!heardPhrases.includes(phrase)) {
      const newHeard = [...heardPhrases, phrase];
      setHeardPhrases(newHeard);
      
      // If heard 3 or more total words and badge not earned, unlock!
      if (newHeard.length >= 3 && !isBadgeEarned) {
        setShowReward(true);
      }
    }
  };

  const handleEarnStamp = () => {
    onEarnBadge('language');
    setShowReward(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Top Navigation */}
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 bg-white border-2 border-stone-200 text-stone-700 font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer hover:border-stone-300"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
          <span>回地圖</span>
        </button>

        <span className="text-sm font-black text-sky-500 bg-sky-50 border-2 border-sky-300 px-3 py-1 rounded-full flex items-center gap-1">
          🗣️ 神奇語言發音站
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Intro Mascot Bubbler */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot" className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <p className="text-stone-700 font-bold text-sm leading-relaxed">
              「在澳門，大家不僅能說一口好聽的廣東話，還懂得說好聽的葡萄牙語（葡語）唷！{explorerName}，點擊大聲公，跟我一起『牙牙學語』說出童話般奇妙的中葡雙語單詞吧！」
            </p>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex gap-2 mb-4 justify-between">
          {(['greeting', 'life', 'food'] as const).map((cat) => {
            const label = cat === 'greeting' ? '禮貌問候 🤝' : cat === 'life' ? '日常學習 🏫' : '美味甜點 🧁';
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveWordIdx(0);
                }}
                className={`flex-1 py-3 text-xs font-black border-2 rounded-2xl transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sky-100 border-sky-400 text-sky-700 ring-2 ring-sky-200'
                    : 'bg-white border-stone-200 text-stone-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Word Card Panel */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-5 shadow-lg mb-6 text-left relative">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] bg-sky-100 text-sky-700 font-black px-3 py-1 rounded-full">
              探索進度：點亮發音字卡 ({heardPhrases.length}/3)
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    heardPhrases.length >= s ? 'text-yellow-400 fill-yellow-400' : 'text-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Cantonese Section */}
            <div className="border-b-2 border-stone-100 pb-5 space-y-1.5 relative">
              <span className="text-[10px] bg-amber-100 text-amber-700 font-black px-2.5 py-0.5 rounded-full absolute top-0 right-0">
                🗣️ 廣東話 Cantonese
              </span>
              <h3 className="text-3xl font-black text-stone-800 pt-3">
                {currentWord.phrase}
              </h3>
              <p className="text-xs font-bold text-stone-400 font-mono">
                粵拼讀音：{currentWord.pinyin}
              </p>
              
              {/* Speaker with triggers */}
              <div className="flex items-center gap-2 pt-2">
                <AudioSpeaker text={currentWord.phrase} lang="zh-HK" size="sm" label="聽聽廣東話" />
                <button
                  type="button"
                  onClick={() => handleHearWord(currentWord.phrase)}
                  className="p-1 px-2 text-[10px] font-black border rounded bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100"
                >
                  {heardPhrases.includes(currentWord.phrase) ? '✓ 已打卡' : '點擊聽完打卡'}
                </button>
              </div>
            </div>

            {/* Portuguese Section */}
            <div className="space-y-2 relative">
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-2.5 py-0.5 rounded-full absolute top-0 right-0">
                🇵🇹 葡萄牙語 Portuguese
              </span>
              
              <h3 className="text-2xl font-black text-indigo-600 pt-3 font-serif">
                {currentWord.portuguese}
              </h3>
              <p className="text-xs font-extrabold text-stone-500 bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                🔊 廣東話音標諧音：<span className="text-rose-500 font-black text-sm">{currentWord.portuguesePronounce}</span> (多唸幾遍哦！)
              </p>

              {/* Speaker with triggers */}
              <div className="flex items-center gap-2 pt-1">
                <AudioSpeaker text={currentWord.portuguese} lang="pt-PT" size="sm" label="聽聽葡萄牙語" />
                <button
                  type="button"
                  onClick={() => handleHearWord(currentWord.phrase)}
                  className="p-1 px-2 text-[10px] font-black border rounded bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100"
                >
                  {heardPhrases.includes(currentWord.phrase) ? '✓ 已打卡' : '點擊聽完打卡'}
                </button>
              </div>
            </div>

            {/* Fun Fact Reader */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/50 space-y-1">
              <p className="text-xs font-black text-amber-800 flex items-center gap-1">
                <span>📚 探險小百科：</span>
              </p>
              <p className="text-stone-600 font-medium text-xs leading-relaxed">
                {currentWord.funFact}
              </p>
              <div className="text-right mt-1.5">
                <AudioSpeaker text={currentWord.funFact} lang="zh-HK" size="sm" label="聽百科故事" />
              </div>
            </div>

          </div>

          {/* Inner paginator */}
          <div className="mt-8 pt-4 border-t border-stone-100 flex justify-between gap-3">
            <button
              onClick={() => setActiveWordIdx(prev => Math.max(0, prev - 1))}
              disabled={activeWordIdx === 0}
              className={`flex-1 py-2.5 border-2 rounded-xl text-xs font-black select-none ${
                activeWordIdx === 0
                  ? 'bg-stone-50 border-stone-200 text-stone-300 pointer-events-none'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 cursor-pointer'
              }`}
            >
              ← 上一個單詞
            </button>
            
            <button
              onClick={() => setActiveWordIdx(prev => Math.min(filteredWords.length - 1, prev + 1))}
              disabled={activeWordIdx === filteredWords.length - 1}
              className={`flex-1 py-2.5 border-2 rounded-xl text-xs font-black select-none ${
                activeWordIdx === filteredWords.length - 1
                  ? 'bg-stone-50 border-stone-200 text-stone-300 pointer-events-none'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 cursor-pointer'
              }`}
            >
              下一個單詞 →
            </button>
          </div>

        </div>

        {/* Badge unlock reward modal */}
        {showReward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce mb-4">
                🗣️
              </div>
              <h3 className="text-xl font-black text-stone-800">
                🎉 解鎖中葡小小外交官勳章！
              </h3>
              <p className="text-stone-500 font-bold text-xs mt-2 leading-relaxed">
                哇！好厲害呀！{explorerName} 已經成功打卡了三個以上的澳門發音字卡，學會了廣東話和葡萄牙語的「謝謝」、「你好」和「蛋撻」！大家都為你的才華鼓掌！
              </p>
              
              <div className="bg-sky-50 p-4 border rounded-2xl my-4 text-xs font-black text-sky-700">
                獲得稱號：🗣️ 中葡小小外交官
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEarnStamp}
                className="w-full py-4 bg-sky-400 hover:bg-sky-500 text-white text-base font-black rounded-2xl shadow-lg border-b-4 border-sky-600 flex items-center justify-center gap-2 cursor-pointer"
              >
                📥 將印章放入我的收集冊！
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Display earned badge status */}
        {isBadgeEarned && (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-3xl text-left flex items-center gap-3">
            <div className="text-3xl bg-emerald-100 p-2 rounded-full">🏆</div>
            <div>
              <p className="text-emerald-800 font-black text-sm leading-tight">第三關「語言學習」成功通關！</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">「中葡小小外交官🗣️」印章已經安全存放好囉！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
