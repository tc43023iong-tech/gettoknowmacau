/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FOOD_INGREDIENTS, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, Flame, Sparkles, Check, Play } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterFoodProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

export default function ChapterFood({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterFoodProps) {
  const [bowlIngredients, setBowlIngredients] = useState<string[]>([]);
  const [cookingStage, setCookingStage] = useState<'mixing' | 'baking' | 'done'>('mixing');
  const [bakeProgress, setBakeProgress] = useState(0);
  const [isChiliAdded, setIsChiliAdded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showReward, setShowReward] = useState(false);

  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;
  const mascotName = selectedMascot === 'pipi' ? '小琵琵' : '蛋撻寶貝';

  const handleAddIngredient = (id: string, name: string) => {
    if (bowlIngredients.includes(id)) {
      setFeedback(`「${name}」已經在碗裡啦，不用重複加喔！`);
      return;
    }

    if (id === 'chili') {
      setIsChiliAdded(true);
      setFeedback('🌶️ 啊！千萬別加辣椒醬呀！蛋撻會辣到噴火的！');
      return;
    }

    setBowlIngredients(prev => [...prev, id]);
    setFeedback(`加得好！已將「${name}」攪拌進了美味大碗中！🥣`);
  };

  const handleResetIngredients = () => {
    setBowlIngredients([]);
    setIsChiliAdded(false);
    setFeedback('碗清空啦！快把牛奶、雞蛋、酥皮和砂糖放進攪拌吧！');
  };

  const handleStartBaking = () => {
    // Check if correct 4 ingredients are present
    const necessary = FOOD_INGREDIENTS.filter(item => item.required).map(item => item.id);
    const hasAllNecessary = necessary.every(id => bowlIngredients.includes(id));

    if (!hasAllNecessary) {
      setFeedback('⚠️ 還不能烤喔！你好像忘記加某個重要配料啦（雞蛋、牛奶、砂糖、酥皮缺一不可）！');
      return;
    }

    setCookingStage('baking');
    setBakeProgress(0);

    // Simulate timer progress with interval
    const interval = setInterval(() => {
      setBakeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCookingStage('done');
          setFeedback('🔔 叮！時間到！蛋撻烤好了！熱氣騰騰、外皮酥到掉渣，奶香飄滿整個房間啦！');
          return 100;
        }
        return prev + 20;
      });
    }, 450);
  };

  const handleFeedMascot = () => {
    if (!isBadgeEarned) {
      setShowReward(true);
    } else {
      setFeedback('「哇！好好吃！酥皮脆脆的，蛋心像果凍一樣軟滑！我能一口吃五個！」');
    }
  };

  const handleEarnStamp = () => {
    onEarnBadge('food');
    setShowReward(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Top navigation */}
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 bg-white border-2 border-stone-200 text-stone-700 font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer hover:border-stone-300"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
          <span>回地圖</span>
        </button>

        <span className="text-sm font-black text-orange-500 bg-orange-50 border-2 border-orange-300 px-3 py-1 rounded-full flex items-center gap-1">
          🍳 香噴噴美食廚房
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Intro Mascot Speech Bubble */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot" className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <p className="text-stone-700 font-bold text-sm leading-relaxed">
              「呼呼呼！快來當頂級甜品大廚！澳門的葡式蛋撻聞名全世界。{explorerName}，幫忙挑选雞蛋、牛奶、白糖和酥皮，和我在烤箱裡烘焙出甜甜的治癒美味吧！」
            </p>
          </div>
        </div>

        {/* Cooking game board */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-5 shadow-lg mb-6 text-left relative">
          
          {cookingStage === 'mixing' && (
            <div className="space-y-6">
              
              {/* Mixing Bowl Visual */}
              <div className="relative p-6 bg-orange-50/50 rounded-2.5xl border-2 border-orange-100 flex flex-col items-center justify-center min-h-48 text-center">
                <span className="text-7xl mb-2 animate-pulse">🥣</span>
                
                <h4 className="font-extrabold text-stone-700 text-sm">你的神奇調配大攪拌碗</h4>
                
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {bowlIngredients.length === 0 ? (
                    <span className="text-xs text-stone-400 font-bold">裡面空空，點擊下方配料加入！🥛</span>
                  ) : (
                    bowlIngredients.map((item) => {
                      const ing = FOOD_INGREDIENTS.find(i => i.id === item);
                      return (
                        <motion.div
                          key={item}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1.5 bg-white border border-orange-200 rounded-xl text-xs font-black text-orange-800 flex items-center gap-1 shadow-xs"
                        >
                          <span>{ing?.emoji}</span>
                          <span>{ing?.name.split('的')[1] || ing?.name}</span>
                        </motion.div>
                      );
                    })
                  )}
                  {isChiliAdded && (
                    <div className="px-3 py-1.5 bg-red-100 border border-red-300 text-red-600 rounded-xl text-xs font-black animate-bounce">
                      🌶️ 辣椒醬（快拿走！）
                    </div>
                  )}
                </div>

                {bowlIngredients.length > 0 && (
                  <button
                    onClick={handleResetIngredients}
                    className="mt-6 text-xs text-rose-500 font-extrabold underline cursor-pointer"
                  >
                    全部倒掉清空 🗑️
                  </button>
                )}
              </div>

              {/* Ingredients Palette to tap */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-stone-500 pl-1">🛒 加進食材（牛奶及砂糖是靈魂喔）：</h4>
                <div className="grid grid-cols-2 gap-3">
                  {FOOD_INGREDIENTS.map((ing) => {
                    const isAdded = bowlIngredients.includes(ing.id) || (ing.id === 'chili' && isChiliAdded);
                    return (
                      <motion.button
                        key={ing.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAddIngredient(ing.id, ing.name)}
                        className={`p-3 border-2 rounded-2xl flex gap-3 text-left items-center transition-all cursor-pointer ${
                          isAdded
                            ? ing.id === 'chili' 
                              ? 'bg-red-50 border-red-300 text-red-700'
                              : 'bg-orange-50 border-orange-300 text-orange-800'
                            : 'bg-white border-stone-100 hover:border-stone-200 text-stone-700'
                        }`}
                      >
                        <span className="text-2xl">{ing.emoji}</span>
                        <div>
                          <h5 className="text-xs font-black leading-snug">{ing.name}</h5>
                          <p className="text-[10px] text-stone-400 mt-0.5 leading-none">{ing.required ? '必加核心配料' : '黑暗料理配料'}</p>
                        </div>
                        {isAdded && ing.id !== 'chili' && (
                          <div className="ml-auto w-4 h-4 bg-orange-400 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Guide prompt text box */}
              {feedback && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 font-black">
                  {feedback}
                </div>
              )}

              {/* Start Bake Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartBaking}
                className="w-full py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-black text-base rounded-2xl border-b-4 border-orange-600 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Flame className="w-5 h-5 animate-pulse" />
                <span>🧁 送進大烤箱烘焙化身美味 🧁</span>
              </motion.button>

            </div>
          )}

          {/* Cooking Progress Screen */}
          {cookingStage === 'baking' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <motion.span
                animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="text-8xl"
              >
                🔥 📟
              </motion.span>
              
              <h3 className="text-lg font-black text-stone-800">
                烤箱旋轉加熱中... MOP 200°C
              </h3>

              <div className="w-full max-w-xs bg-stone-100 rounded-full h-4 overflow-hidden border">
                <div 
                  className="bg-yellow-400 h-full transition-all duration-300"
                  style={{ width: `${bakeProgress}%` }}
                />
              </div>
              
              <span className="text-xs font-bold text-amber-600 animate-pulse">
                快聞到了！超級香的蛋奶油味道即將溢出來啦！
              </span>
            </div>
          )}

          {/* Finished Baked Tart Display */}
          {cookingStage === 'done' && (
            <div className="text-center py-6 space-y-6">
              
              <motion.div
                initial={{ scale: 0.5, rotate: -45 }}
                animate={{ scale: 1, rotate: 12 }}
                className="inline-block relative p-4 bg-amber-100/50 rounded-full"
              >
                <span className="text-8xl">🧁</span>
                <span className="absolute -top-1 -right-1 text-3xl animate-bounce">✨</span>
              </motion.div>

              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-xl font-black text-amber-600">
                  🎉 哇！金黃微焦的葡式蛋撻出爐啦！ 🙌
                </h3>
                
                <p className="text-xs font-bold text-stone-500 leading-relaxed bg-stone-50 border p-3.5 rounded-2xl">
                  {feedback}
                </p>

                <div className="p-2 border bg-amber-50 rounded-xl flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>🔊 聽主廚大聲宣布成果：</span>
                  <AudioSpeaker text={feedback} lang="zh-HK" size="sm" />
                </div>
              </div>

              {/* Feed companion to win */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setCookingStage('mixing')}
                  className="flex-1 py-3 border-2 border-stone-200 text-stone-600 font-black rounded-xl text-xs cursor-pointer hover:border-stone-300"
                >
                  再烤一個 🥣
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFeedMascot}
                  className="flex-1 py-3 bg-rose-400 hover:bg-rose-500 text-white font-black rounded-xl text-xs border-b-4 border-rose-600 cursor-pointer shadow-md"
                >
                  😋 餵給導遊小夥伴吃！
                  </motion.button>
              </div>

            </div>
          )}

        </div>

        {/* Badge reward trig pops */}
        {showReward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce mb-4">
                👑
              </div>
              <h3 className="text-xl font-black text-stone-800">
                🎉 解鎖米芝蓮星級小廚神勳章！
              </h3>
              <p className="text-stone-500 font-bold text-xs mt-2 leading-relaxed">
                太棒了！親愛的 {explorerName} 大廚！你烘焙出的蛋撻奶香濃郁、酥脆香甜，{mascotName} 吃得直舔爪爪呢！真是最有才廚藝天賦的天才大廚！
              </p>
              
              <div className="bg-orange-50 p-4 border rounded-2xl my-4 text-xs font-black text-orange-700">
                獲得稱號：🍳 米芝蓮星級小廚神
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

        {/* Earned badge status */}
        {isBadgeEarned && (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-3xl text-left flex items-center gap-3">
            <div className="text-3xl bg-emerald-100 p-2 rounded-full">🏆</div>
            <div>
              <p className="text-emerald-800 font-black text-sm leading-tight">第五關「美食厨神」成功通關！</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">「米芝蓮星級小廚神🍳」印章已經在儲物格珍藏妥當！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
