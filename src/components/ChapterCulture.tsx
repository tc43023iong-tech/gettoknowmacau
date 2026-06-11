/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CULTURE_FESTIVALS, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, Check, AlertCircle } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterCultureProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

export default function ChapterCulture({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterCultureProps) {
  const [activeFestivalIdx, setActiveFestivalIdx] = useState(0);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [solvedFestivals, setSolvedFestivals] = useState<string[]>([]);
  const [message, setMessage] = useState<{ text: string; isCorrect: boolean | null }>({ text: '', isCorrect: null });
  const [showReward, setShowReward] = useState(false);

  const activeFestival = CULTURE_FESTIVALS[activeFestivalIdx];
  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;
  const mascotName = selectedMascot === 'pipi' ? '琵琵' : '葡撻寶貝';

  const handleSelectItem = (item: { id: string; name: string; emoji: string; isCorrect: boolean; hint: string }) => {
    if (selectedItemIds.includes(item.id)) {
      // already selected, do nothing
      return;
    }

    if (item.isCorrect) {
      const newSelections = [...selectedItemIds, item.id];
      setSelectedItemIds(newSelections);
      setMessage({ text: `🎉 答對了！${item.hint}`, isCorrect: true });

      // check if all correct options for this festival are selected
      const totalCorrectNeeded = activeFestival.costumeOptions.filter(o => o.isCorrect).length;
      const currentCorrectSelected = activeFestival.costumeOptions
        .filter(o => o.isCorrect && newSelections.includes(o.id)).length;

      if (currentCorrectSelected === totalCorrectNeeded) {
        // solved this festival!
        if (!solvedFestivals.includes(activeFestival.id)) {
          const newSolved = [...solvedFestivals, activeFestival.id];
          setSolvedFestivals(newSolved);
          setMessage({ text: `🌟 完美！你幫大家準備好了「${activeFestival.name}」的全部裝備！太厲害了！`, isCorrect: true });

          // check if everything is solved
          if (newSolved.length === CULTURE_FESTIVALS.length && !isBadgeEarned) {
            setShowReward(true);
          }
        }
      }
    } else {
      setMessage({ text: `❌ 哎呀！${item.hint}`, isCorrect: false });
    }
  };

  const handleNextFestival = () => {
    setSelectedItemIds([]);
    setMessage({ text: '', isCorrect: null });
    setActiveFestivalIdx((activeFestivalIdx + 1) % CULTURE_FESTIVALS.length);
  };

  const handleEarnStamp = () => {
    onEarnBadge('culture');
    setShowReward(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Navigation */}
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 bg-white border-2 border-stone-200 text-stone-700 font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer hover:border-stone-300"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
          <span>回地圖</span>
        </button>

        <span className="text-sm font-black text-rose-500 bg-rose-50 border-2 border-rose-300 px-3 py-1 rounded-full flex items-center gap-1">
          🎭 繽紛節日文化篇
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Mascot dialog bubble */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot" className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <p className="text-stone-700 font-bold text-sm leading-relaxed">
              「哇！澳門是一個節日彩燈閃亮的地方！但舉辦大遊行時，叔叔阿姨們經常忘記帶道具呢！{explorerName}，你能幫忙挑選正確的道具服配，完成變裝舞會嗎？」
            </p>
          </div>
        </div>

        {/* Festival Selection Tabs */}
        <div className="flex justify-between gap-1.5 mb-4">
          {CULTURE_FESTIVALS.map((fest, idx) => {
            const isSolved = solvedFestivals.includes(fest.id);
            const isActive = idx === activeFestivalIdx;
            
            return (
              <button
                key={fest.id}
                onClick={() => {
                  setActiveFestivalIdx(idx);
                  setSelectedItemIds([]);
                  setMessage({ text: '', isCorrect: null });
                }}
                className={`flex-1 py-2 px-1 text-xs font-black border-2 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-100 border-rose-400 text-rose-700 ring-2 ring-rose-200'
                    : 'bg-white border-stone-200 text-stone-400'
                }`}
              >
                <span>{fest.name.split(' ')[0]} {isSolved && '⭐'}</span>
              </button>
            );
          })}
        </div>

        {/* Main interactive Dressing Box */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-6 shadow-lg mb-6 text-left relative">
          
          {/* Active festival info */}
          <div className="space-y-2.5 mb-6">
            <h3 className="text-xl font-black text-rose-500 flex items-center gap-1.5 leading-none">
              <span>{activeFestival.name}</span>
              {solvedFestivals.includes(activeFestival.id) && (
                <span className="text-xs bg-emerald-100 text-emerald-700 font-black px-2.5 py-0.5 rounded-full inline-block">
                  ✓ 變裝好啦！
                </span>
              )}
            </h3>
            
            <p className="text-sm font-semibold text-stone-600 leading-relaxed bg-stone-50 rounded-2xl p-4 border border-stone-100">
              {activeFestival.description}
            </p>

            <div className="flex items-center justify-between bg-rose-50/50 p-2 text-xs font-bold text-rose-700 rounded-xl">
              <span className="flex items-center gap-1">🔊 聽大聲公講節日來源:</span>
              <AudioSpeaker text={activeFestival.description} lang="zh-HK" size="sm" />
            </div>
          </div>

          {/* Correct options picked progress check */}
          <div className="my-4 pt-3 border-t border-dashed border-stone-200">
            <h4 className="text-xs font-black text-stone-500 mb-2">📥 你的置衣箱（已搜集的正確道具）：</h4>
            <div className="flex gap-2 min-h-12 bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-2.5 items-center justify-center">
              {activeFestival.costumeOptions.filter(o => o.isCorrect).map((opt) => {
                const picked = selectedItemIds.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center relative transition-all ${
                      picked
                        ? 'bg-amber-300 border-amber-400 scale-105 shadow-sm shadow-amber-200 text-xl'
                        : 'bg-white border-stone-200 opacity-20 filter grayscale text-sm'
                    }`}
                  >
                    <span>{opt.emoji}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Multiple options picker */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-stone-500">🛒 點擊下列箱子，拿取正確道具配件：</h4>
            <div className="grid grid-cols-2 gap-3">
              {activeFestival.costumeOptions.map((opt) => {
                const isAlreadyPicked = selectedItemIds.includes(opt.id);
                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectItem(opt)}
                    className={`p-3.5 border-2 rounded-2xl flex items-center gap-2.5 text-left transition-all font-bold cursor-pointer relative ${
                      isAlreadyPicked
                        ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
                        : 'bg-white border-stone-100 hover:border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-xs leading-tight font-extrabold">{opt.name}</span>
                    
                    {isAlreadyPicked && (
                      <span className="absolute top-1 right-2 text-xs text-emerald-500 font-extrabold flex items-center gap-0.5">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Interaction message feedback pop-label */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl border-2 text-xs font-black mt-5 flex items-start gap-2 ${
                message.isCorrect === true
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-rose-50 border-rose-300 text-rose-700'
              }`}
            >
              {message.isCorrect === true ? (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              )}
              <span>{message.text}</span>
            </motion.div>
          )}

          {/* Bottom navigation controls */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
            <button
              onClick={handleNextFestival}
              className="py-3 px-5 bg-stone-800 hover:bg-stone-900 border-b-4 border-black text-white font-black text-xs rounded-2xl flex items-center gap-1 cursor-pointer"
            >
              填裝下一個節日 🚀
            </button>
          </div>
        </div>

        {/* Badge unlock triggers popup */}
        {showReward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce mb-4">
                🎭
              </div>
              <h3 className="text-xl font-black text-stone-800">
                🎉 解鎖節日變裝達人勳章！
              </h3>
              <p className="text-stone-500 font-bold text-xs mt-2 leading-relaxed">
                哇！親愛的 {explorerName}！你太聰明啦，竟然懂得搭配端午、舞醉龍以及葡萄牙土風舞所有稀奇古怪的首服道具！街坊鄰居都誇你是最棒的小助手呢！
              </p>
              
              <div className="bg-rose-50 p-4 border rounded-2xl my-4 text-xs font-black text-rose-700">
                獲得稱號：🎭 節日變裝達人
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEarnStamp}
                className="w-full py-4 bg-rose-400 hover:bg-rose-500 text-white text-base font-black rounded-2xl shadow-lg border-b-4 border-rose-600 flex items-center justify-center gap-2 cursor-pointer"
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
              <p className="text-emerald-800 font-black text-sm leading-tight">第二關「節日變裝」成功通關！</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">「節日變裝達人🎭」印章已成功收集包好囉！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
