/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FOOD_KITCHEN_DATA, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, Flame, Sparkles, Check, Play, RotateCcw, Cookie, Heart } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterFoodProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

// 100% Native, robust Web Audio API Sound Synthesizer (Works perfectly in containers / iframes offline!)
const playPloppingSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.warn('AudioContext disabled by browser permissions until interaction', e);
  }
};

const playBuzzerSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.28);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.28);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
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
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };
    
    playNote(523.25, 0, 0.35); // C5
    playNote(659.25, 0.08, 0.35); // E5
    playNote(783.99, 0.16, 0.35); // G5
    playNote(1046.50, 0.24, 0.5); // C6
  } catch (e) {
    console.warn('AudioContext disabled', e);
  }
};

export default function ChapterFood({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterFoodProps) {
  // Food selection states
  const [activeFoodIdx, setActiveFoodIdx] = useState(0);
  const currentFood = FOOD_KITCHEN_DATA[activeFoodIdx];

  // Cooking process states
  const [bowlIngredients, setBowlIngredients] = useState<string[]>([]);
  const [cookingStage, setCookingStage] = useState<'mixing' | 'baking' | 'done'>('mixing');
  const [bakeProgress, setBakeProgress] = useState(0);
  const [wrongIngredientSelected, setWrongIngredientSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showReward, setShowReward] = useState(false);

  // Mascot details
  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;
  const mascotName = selectedMascot === 'pipi' ? '琵琵' : '葡撻寶貝';

  // Whenever we switch active food, reset cooking state
  useEffect(() => {
    setBowlIngredients([]);
    setCookingStage('mixing');
    setBakeProgress(0);
    setWrongIngredientSelected(null);
    setFeedback(`「歡迎來到美味大本營！ ${currentFood.name} 魔法廚房已經準備就緒！請在下方幫忙挑選正確的四樣金牌配料喔！」`);
  }, [activeFoodIdx]);

  const handleAddIngredient = (id: string, name: string, required: boolean, desc: string) => {
    // If wrong ingredient is tapped
    if (!required) {
      setWrongIngredientSelected(id);
      playBuzzerSound();
      setFeedback(`🚨 哎呀呀！小廚神請注意！「${name}」是搗蛋食材！${desc}`);
      setTimeout(() => setWrongIngredientSelected(null), 3000);
      return;
    }

    if (bowlIngredients.includes(id)) {
      setFeedback(`「${name}」已經在我們亮晶晶的攪拌碗裡囉，不可以重複加呢！`);
      return;
    }

    // Add normal ingredient
    playPloppingSound();
    setBowlIngredients(prev => [...prev, id]);
    setFeedback(`🌟 加得真棒！金光一閃，我們投入了「${name}」！${desc}`);
  };

  const handleResetIngredients = () => {
    playPloppingSound();
    setBowlIngredients([]);
    setWrongIngredientSelected(null);
    setFeedback('🥣 攪拌碗已經被清水洗刷得亮晶晶囉！讓我們重新投入對的材料吧！');
  };

  const handleStartBaking = () => {
    // Filter correct required ingredient ids
    const requiredIds = currentFood.ingredients.filter(i => i.required).map(i => i.id);
    const hasAll = requiredIds.every(id => bowlIngredients.includes(id));

    if (!hasAll) {
      playBuzzerSound();
      setFeedback(`⚠️ 哎呀！我們的彩虹配料還不齊全喔！請把四種正確食材都倒進碗裡，我們才可以開始完美的冒險烹調！`);
      return;
    }

    setCookingStage('baking');
    setBakeProgress(0);
    setFeedback('🔥 魔法烤箱/層疊器已經啟動！美味能量正在翻滾！');

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setBakeProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        playSuccessChime();
        setCookingStage('done');
        
        let completionText = '';
        if (currentFood.id === 'tart') {
          completionText = `🔔 叮！熱呼呼的「里斯本葡式蛋撻」香烤出爐！外皮焦黃香脆、裡面的蛋汁像溫柔的布丁，金燦燦的，奶香飄到了百步開外，真是太神氣了！`;
        } else if (currentFood.id === 'pork_bun') {
          completionText = `🔔 叮！「黃金豬扒包」大功告成！剛出爐的脆皮豬仔包夾著厚實多汁、冒著香大蒜煙的大豬扒，咬一口發出「咔嚓」巨響，肉汁四濺，太滿足啦！`;
        } else {
          completionText = `🔔 叮！冰冰涼涼的「雪木糠布甸」千層大功告成！雪白的雲朵鮮奶油與金色瑪莉餅乾沙子重疊了整整五層，吃起來像吃純牛奶雪糕一樣香糯！`;
        }
        setFeedback(completionText);
      }
    }, 250);
  };

  const handleFeedMascot = () => {
    playSuccessChime();
    if (!isBadgeEarned && activeFoodIdx === FOOD_KITCHEN_DATA.length - 1) {
      setShowReward(true);
    } else {
      setFeedback(`😋 「嗷嗚！太香太甜、真是世界奇妙美味！ ${explorerName}，你簡直是全宇宙最受歡迎的特級天才主廚！我幸福得要轉圈圈開跳桑巴舞了！」`);
    }
  };

  const handleEarnStamp = () => {
    onEarnBadge('food');
    setShowReward(false);
  };

  return (
    <div id="food_kitchen_root" className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Top Header Row */}
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          id="back_to_map_btn"
          onClick={onBack}
          className="flex items-center gap-1.5 bg-white border-2 border-stone-200 text-stone-700 font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer hover:border-stone-300"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
          <span>回地圖</span>
        </button>

        <span className="text-sm font-black text-amber-600 bg-amber-50 border-2 border-amber-300 px-3.5 py-1 rounded-full flex items-center gap-1">
          🍳 Macau Specialty Kitchen
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Welcome Mascot Banner */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow-sm mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot Avatar" className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <h2 className="text-lg font-black text-[#5D4037] mb-1">👨‍🍳 澳門特色美食小廚房</h2>
            <p className="text-stone-600 font-extrabold text-xs leading-relaxed">
              「小朋友，澳門不僅風景迷人，美食更是名揚天下！讓我們換上主廚白外套，親自手作三大代表美味：金黃蛋撻、香嫩豬扒包、和千層木糠布甸，在烘焙的魔法中快樂學習！」
            </p>
          </div>
        </div>

        {/* Beautiful Picture Book Food Tabs */}
        <div className="flex gap-2.5 mb-6 justify-between">
          {FOOD_KITCHEN_DATA.map((food, idx) => (
            <button
              key={food.id}
              onClick={() => {
                setActiveFoodIdx(idx);
                playPloppingSound();
              }}
              className={`flex-1 py-3 px-1.5 text-xs font-black border-2 rounded-2xl transition-all cursor-pointer flex flex-col items-center gap-1 relative ${
                activeFoodIdx === idx
                  ? 'bg-amber-100 border-amber-500 text-amber-800 ring-4 ring-amber-200'
                  : 'bg-white border-stone-200 text-stone-400'
              }`}
            >
              <span className="text-2xl">{food.emoji}</span>
              <span>{food.name.split(' ').pop()}</span>
              {activeFoodIdx === idx && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black leading-none">
                  ★
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Detailed Kid-friendly Story Card */}
        <div className="bg-amber-50/70 border-4 border-[#FFD580] rounded-[2rem] p-5 shadow-[4px_4px_0px_#FFE0B2] mb-6 text-left relative overflow-hidden">
          <div className="absolute top-2 right-2 text-2xl opacity-20">📖</div>
          
          <div className="flex flex-col md:flex-row gap-5 items-center">
            
            {/* Real Life Photo Frame (Japanese Polaroid style!) */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="bg-white p-2.5 pb-6 border-2 border-amber-300 shadow-md rotate-3 transform rounded-lg">
                <img 
                  src={currentFood.imageUrl} 
                  alt={currentFood.name} 
                  className="w-full h-32 object-cover rounded border border-stone-100"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[9px] font-black text-amber-800/60 block mt-2 font-mono text-center">
                  ✨ 真實美食寫真照 ✨
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <span className="text-[10px] bg-rose-100 text-rose-700 font-extrabold px-2.5 py-0.5 rounded-full">
                🍪 起源故事
              </span>
              <h3 className="text-lg font-black text-[#5D4037] flex items-center gap-1">
                <span>{currentFood.name}</span>
                <AudioSpeaker text={currentFood.name + '。' + currentFood.origin} lang="zh-HK" size="sm" />
              </h3>
              <p className="text-stone-600 font-semibold text-xs leading-relaxed text-justify">
                {currentFood.origin}
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-amber-200/50">
            <div className="space-y-1">
              <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2.5 py-0.5 rounded-full inline-block">
                🥛 食材大清單
              </span>
              <p className="text-[#5D4037] font-black text-xs">
                {currentFood.materialsIntro}
              </p>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] bg-orange-100 text-orange-800 font-extrabold px-2.5 py-0.5 rounded-full inline-block">
                💡 廚神悄悄話
              </span>
              <p className="text-[#8D6E63] font-extrabold text-xs">
                {currentFood.chefTip}
              </p>
            </div>
          </div>
        </div>

        {/* Cook & Baking Mini Game Board */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-5 shadow-lg mb-6 text-left relative">
          
          <div className="flex justify-between items-center pb-3 border-b-2 border-stone-100 mb-4 text-xs font-black">
            <span className="text-stone-500">
              🍳 特色手作體驗
            </span>
            <div className="flex items-center gap-1">
              <span className={`w-2.5 h-2.5 rounded-full ${cookingStage === 'mixing' ? 'bg-orange-500' : 'bg-stone-300'}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${cookingStage === 'baking' ? 'bg-orange-500' : 'bg-stone-300'}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${cookingStage === 'done' ? 'bg-orange-500' : 'bg-stone-300'}`} />
            </div>
          </div>

          {/* STAGE 1: Mixing and combining */}
          {cookingStage === 'mixing' && (
            <div className="space-y-6">
              
              {/* Mixing Bowl Visual layout */}
              <div className="relative p-6 bg-amber-50/30 rounded-2.5xl border-2 border-dashed border-amber-200 flex flex-col items-center justify-center min-h-48 text-center">
                <span className="text-7xl mb-2 animate-bounce">🥣</span>
                <h4 className="font-black text-stone-700 text-sm">主廚的神奇大調配攪拌碗</h4>
                
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {bowlIngredients.length === 0 ? (
                    <span className="text-xs text-stone-400 font-bold p-1">
                      現在碗裡空空的喔！快在下方配料盤中點擊加入所需食材！🥛🍬
                    </span>
                  ) : (
                    currentFood.ingredients.map((ing) => {
                      const isAdded = bowlIngredients.includes(ing.id);
                      if (!isAdded) return null;
                      return (
                        <motion.div
                          key={ing.id}
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="px-3 py-1.5 bg-white border-2 border-amber-200 rounded-xl text-xs font-black text-amber-900 flex items-center gap-1 shadow-xs"
                        >
                          <span>{ing.emoji}</span>
                          <span>{ing.name}</span>
                        </motion.div>
                      );
                    })
                  )}

                  {wrongIngredientSelected && (
                    <motion.div
                      animate={{ x: [-10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                      className="px-3 py-1.5 bg-rose-100 border-2 border-rose-300 text-rose-600 rounded-xl text-xs font-black animate-pulse"
                    >
                      {currentFood.ingredients.find(i => i.id === wrongIngredientSelected)?.emoji} ⚠️ 唔好加錯！
                    </motion.div>
                  )}
                </div>

                {bowlIngredients.length > 0 && (
                  <button
                    onClick={handleResetIngredients}
                    className="mt-5 text-xs text-rose-500 font-extrabold flex items-center gap-1 underline cursor-pointer hover:text-rose-600"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>全部倒掉，重新配料 🍟</span>
                  </button>
                )}
              </div>

              {/* Grid of raw ingredient palettes */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-500 pl-1">🛒 嚴選食材大考驗（點擊放入碗中）：</h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentFood.ingredients.map((ing) => {
                    const isAdded = bowlIngredients.includes(ing.id);
                    return (
                      <motion.button
                        key={ing.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAddIngredient(ing.id, ing.name, ing.required, ing.desc)}
                        className={`p-3 border-2 rounded-2xl flex gap-3 text-left items-center transition-all cursor-pointer relative ${
                          isAdded
                            ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs'
                            : 'bg-white border-stone-100 hover:border-slate-200 text-stone-700'
                        }`}
                      >
                        <span className="text-3xl">{ing.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-extrabold leading-tight truncate">{ing.name}</h5>
                          <p className="text-[9px] text-[#A1887F] font-bold mt-0.5 leading-none">
                            {ing.required ? '★ 必須加入' : '☠ 搗蛋配料'}
                          </p>
                        </div>
                        {isAdded && (
                          <div className="absolute top-2 right-2 w-4.5 h-4.5 bg-[#4CAF50] text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ✓
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic status helper text block */}
              {feedback && (
                <div className="p-3.5 bg-[#FFF9C4]/60 rounded-2xl border-2 border-[#FFE082]/60 text-xs font-black text-amber-900 leading-relaxed">
                  {feedback}
                </div>
              )}

              {/* Big Cook Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartBaking}
                className="w-full py-4 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-black text-base rounded-2xl border-b-4 border-orange-700 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Flame className="w-5 h-5 animate-pulse" />
                <span>🧁 {currentFood.id === 'sawdust_pudding' ? '放入雪櫃完美堆疊 🍧' : '倒進模具，送入烤箱！ 🥧'}</span>
              </motion.button>

            </div>
          )}

          {/* STAGE 2: Oven Baking Animation Progress */}
          {cookingStage === 'baking' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.06, 1],
                  y: [0, -4, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.45 }}
                className="text-8xl flex items-center justify-center"
              >
                {currentFood.id === 'sawdust_pudding' ? '❄️🍨⚡' : '📟🔥🍪'}
              </motion.div>
              
              <h3 className="text-lg font-black text-stone-800">
                {currentFood.id === 'sawdust_pudding' ? '正在進行急凍分層魔法...' : '澳門高溫烤箱香烤中... 200°C'}
              </h3>

              <div className="w-full max-w-xs bg-stone-100 rounded-full h-4 overflow-hidden border-2 border-stone-200">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-100"
                  style={{ width: `${bakeProgress}%` }}
                />
              </div>
              
              <span className="text-xs font-black text-orange-600 animate-pulse">
                {currentFood.id === 'sawdust_pudding' 
                  ? '牛奶正在和蛋白糖結合！越來越軟滑溜了！'
                  : '麵包脆皮正在膨脹！熱呼呼香氣要跑出來啦！'
                }
              </span>
            </div>
          )}

          {/* STAGE 3: Final Delicious Finished Presentation */}
          {cookingStage === 'done' && (
            <div className="text-center py-6 space-y-6">
              
              <motion.div
                initial={{ scale: 0.4, rotate: -90 }}
                animate={{ scale: [1, 1.05, 1], rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block relative p-5 bg-[#FFFDEB] rounded-full border-4 border-amber-300 shadow-md"
              >
                <span className="text-9xl block">{currentFood.emoji}</span>
                <span className="absolute top-2 right-2 text-4xl animate-bounce">✨</span>
                <span className="absolute bottom-2 left-2 text-4xl animate-pulse">🌸</span>
              </motion.div>

              <div className="space-y-3 max-w-sm mx-auto">
                <h3 className="text-xl font-black text-amber-600 flex items-center justify-center gap-1">
                  <span>🎉 唔哇！香噴噴美食新鮮出爐！ 🎉</span>
                </h3>
                
                <p className="text-xs font-black text-stone-600 leading-relaxed bg-[#FFFDEB] border-2 border-dashed border-amber-300 p-4 rounded-2xl text-justify">
                  {feedback}
                </p>

                <div className="p-2 border-2 border-amber-200 bg-amber-50 rounded-xl flex items-center justify-between text-xs font-black text-amber-800">
                  <span>🔊 語音大聲宣讀成果：</span>
                  <AudioSpeaker text={feedback} lang="zh-HK" size="sm" />
                </div>
              </div>

              {/* Tasting Controls */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setCookingStage('mixing')}
                  className="flex-1 py-3.5 border-2 border-stone-300 hover:border-stone-400 text-stone-600 font-black rounded-2xl text-xs cursor-pointer bg-white"
                >
                  再手做一次 🥣
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFeedMascot}
                  className="flex-1 py-3.5 bg-rose-400 hover:bg-rose-500 text-white font-black rounded-2xl text-xs border-b-4 border-rose-600 cursor-pointer shadow-md flex items-center justify-center gap-1"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>給小夥伴琵琵品嚐！</span>
                </motion.button>
              </div>

            </div>
          )}

        </div>

        {/* Level Complete Congrats overlay Badge popup */}
        {showReward && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md mb-4 rotate-12">
                🍳
              </div>
              
              <h3 className="text-xl font-black text-[#5D4037]">
                🎉 榮獲「米芝蓮星級小廚神」印章！ 🎉
              </h3>
              
              <p className="text-stone-500 font-extrabold text-xs mt-3 leading-relaxed text-justify">
                親愛的 {explorerName}！你親手烘焙了外焦里內嫩的葡撻、香噴噴的大豬扒包、和細如金沙的木糠布甸！廚藝大爆發！導遊琵琵直拍手，高興地在收據上為你印上閃亮的米芝蓮大廚章！
              </p>
              
              <div className="bg-orange-50 p-3.5 border-2 border-orange-200 rounded-2xl my-4 text-xs font-black text-orange-800">
                ⭐ 獲得特殊稱號：米芝蓮星級小廚神
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEarnStamp}
                className="w-full py-4 bg-orange-400 hover:bg-orange-500 text-white text-base font-black rounded-2xl shadow-lg border-b-4 border-orange-600 flex items-center justify-center gap-2 cursor-pointer"
              >
                📥 將印章放入我的收集冊！
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Stamp status display */}
        {isBadgeEarned && (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-3xl text-left flex items-center gap-3">
            <div className="text-3xl bg-emerald-100 p-2 rounded-full border border-emerald-300">🍳</div>
            <div>
              <p className="text-emerald-800 font-black text-sm leading-tight">第五大篇章「美味廚師」成功滿貫！</p>
              <p className="text-emerald-600 font-extrabold text-xs mt-1">「米芝蓮星級小廚神🍳」印章已在你的榮譽欄閃亮收藏！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
