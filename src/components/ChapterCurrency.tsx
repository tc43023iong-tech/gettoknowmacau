/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CURRENCY_COINS, SUPERMARKET_ITEMS, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, HelpCircle, Check, Trash2, Award } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterCurrencyProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

export default function ChapterCurrency({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterCurrencyProps) {
  const [shoppingTarget, setShoppingTarget] = useState({ name: '', price: 0, emoji: '' });
  const [cashRegister, setCashRegister] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean | null }>({ text: '', success: null });
  const [showReward, setShowReward] = useState(false);

  const generateNewTask = () => {
    // Pick random item from catalog
    const randomIdx = Math.floor(Math.random() * SUPERMARKET_ITEMS.length);
    const item = SUPERMARKET_ITEMS[randomIdx];
    setShoppingTarget({ name: item.name, price: item.price, emoji: item.emoji });
    setCashRegister([]);
    setFeedback({ text: '請在下方選擇硬幣或紙幣放進收銀台，湊齊剛好的價格喔！', success: null });
  };

  useEffect(() => {
    generateNewTask();
  }, []);

  const totalRegisterSum = cashRegister.reduce((acc, v) => acc + v, 0);

  const handleInsertMoney = (value: number) => {
    if (totalRegisterSum + value > shoppingTarget.price + 10) {
      setFeedback({ text: '哎呀！放的錢太多了，收銀箱裝不下啦！', success: false });
      return;
    }
    setCashRegister(prev => [...prev, value]);
    setFeedback({ text: '錢幣已被放入袋子！', success: null });
  };

  const handleClearMoney = () => {
    setCashRegister([]);
    setFeedback({ text: '收銀袋已清空，重新湊數吧！', success: null });
  };

  const handleConfirmPurchase = () => {
    if (totalRegisterSum === shoppingTarget.price) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback({ text: `🎉 成功！剛好是 MOP ${shoppingTarget.price} 元！收銀阿姨收下了錢，把 ${shoppingTarget.emoji} ${shoppingTarget.name} 送給你啦！`, success: true });
      
      // If completed 3 tasks and badge not earned, unlock!
      if (newScore >= 3 && !isBadgeEarned) {
        setShowReward(true);
      }
    } else if (totalRegisterSum > shoppingTarget.price) {
      setFeedback({ text: `❌ 哎呀！放了 ${totalRegisterSum} 元，錢給多啦！我們需要的是「剛好」的價格喔，否則收銀員阿姨要找零錢很辛苦呢！`, success: false });
    } else {
      setFeedback({ text: `❌ 哎呀！還差 ${shoppingTarget.price - totalRegisterSum} 元呢！再放一些硬幣進來吧！`, success: false });
    }
  };

  const handleEarnStamp = () => {
    onEarnBadge('currency');
    setShowReward(false);
  };

  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;

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

        <span className="text-sm font-black text-emerald-600 bg-emerald-50 border-2 border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
          🪙 百寶貨幣超市篇
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Mascot tutorial bubble */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot" className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <p className="text-stone-700 font-bold text-sm leading-relaxed">
              「澳門使用的是非常漂亮的『澳門幣 MOP』喔！上面印著蓮花、大三巴教堂和媽閣廟呢！{explorerName}，快幫忙當收銀，湊齊零錢買下特色手信吧！累積算對三次就行啦！」
            </p>
          </div>
        </div>

        {/* Currency introduction row */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-5 shadow-lg mb-6 text-left">
          <h3 className="text-sm font-black text-stone-800 border-b pb-2 mb-3">🪙 認識可愛的澳門幣：</h3>
          <div className="grid grid-cols-2 gap-3">
            {CURRENCY_COINS.map((c) => (
              <div key={c.name} className={`p-2.5 rounded-xl border flex gap-2 items-center text-xs ${c.color}`}>
                <span className="text-xl">{c.emoji}</span>
                <div>
                  <h4 className="font-extrabold leading-tight">{c.name}</h4>
                  <p className="text-[10px] text-stone-500 font-medium leading-none mt-0.5">MOP {c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Cashier Game Panel */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-6 shadow-lg mb-6 text-left relative">
          
          {/* Game score card */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-dashed border-stone-100">
            <span className="text-xs font-black text-stone-500">🏆 購買手信計數器：</span>
            <span className="text-sm font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              成功購買：{score}/3 次
            </span>
          </div>

          {/* Active shopping counter screen */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 text-white shadow-inner relative overflow-hidden">
            <div className="absolute top-2 right-2 text-6xl opacity-15">🏪</div>
            
            <span className="text-[10px] font-black bg-white/20 uppercase tracking-widest px-2.5 py-0.5 rounded-full">
              大超市採購清單
            </span>
            
            <div className="flex items-center gap-4 mt-3">
              <span className="text-5xl animate-bounce">{shoppingTarget.emoji}</span>
              <div>
                <h3 className="text-xl font-black">{shoppingTarget.name}</h3>
                <p className="text-2xl font-black text-yellow-300 mt-1">
                  價格：MOP {shoppingTarget.price} 元
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/25 flex items-center justify-between text-xs font-bold">
              <span>🔊 聽聽要付多少錢：</span>
              <AudioSpeaker text={`買一份${shoppingTarget.name}，需要澳門幣 ${shoppingTarget.price} 元。`} lang="zh-HK" size="sm" />
            </div>
          </div>

          {/* Money Basket Bag (User Sum area) */}
          <div className="my-6 space-y-2">
            <div className="flex justify-between items-center pl-1">
              <span className="text-xs font-black text-stone-500">📥 收銀袋的結算 сумма:</span>
              <span className="text-base font-black text-rose-500">
                目前袋子裡：MOP <span className="text-2xl font-black">{totalRegisterSum}</span> 元
              </span>
            </div>

            <div className="bg-amber-50/50 border-4 border-dashed border-amber-300/60 rounded-2.5xl p-4 min-h-24 flex flex-wrap gap-2.5 items-center justify-center relative">
              
              {cashRegister.length === 0 ? (
                <p className="text-xs font-black text-amber-700/60">
                     袋子空空，點擊下方金幣放進袋子吧！💰
                </p>
              ) : (
                cashRegister.map((val, idx) => {
                  const coinSpec = CURRENCY_COINS.find(c => c.value === val);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, y: -20 }}
                      animate={{ scale: 1, y: 0 }}
                      className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1 font-black text-xs shadow-xs ${
                        coinSpec ? coinSpec.color : 'bg-slate-100 border-slate-300 text-stone-700'
                      }`}
                    >
                      <span>{coinSpec?.emoji || '🪙'}</span>
                      <span>MOP {val}</span>
                    </motion.div>
                  );
                })
              )}

              {/* Trash/Clear button if they made a mistake */}
              {cashRegister.length > 0 && (
                <button
                  onClick={handleClearMoney}
                  className="absolute bottom-2 right-2 p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl cursor-pointer"
                  title="清空袋子"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Clickable Coins/Notes selection palette */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-stone-500 pl-1">👉 點擊硬幣或紙幣放進收銀袋：</h4>
            <div className="grid grid-cols-4 gap-2">
              {[1, 5, 10, 20].map((val) => {
                const coinSpec = CURRENCY_COINS.find(c => c.value === val);
                return (
                  <motion.button
                    key={val}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInsertMoney(val)}
                    className={`py-3.5 rounded-2xl border-2 flex flex-col items-center justify-center font-black transition-all cursor-pointer ${
                      coinSpec ? coinSpec.color : 'bg-white border-stone-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{coinSpec?.emoji}</span>
                    <span className="text-xs font-extrabold">{val}元</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Interactive message feedback box */}
          {feedback.text && (
            <div className={`p-3 rounded-2xl border-2 font-black text-xs mt-5 text-left ${
              feedback.success === true
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : feedback.success === false
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}>
              {feedback.text}
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex gap-3">
            <button
              onClick={handleConfirmPurchase}
              disabled={cashRegister.length === 0}
              className={`flex-1 py-3 px-4 font-black text-sm rounded-2xl border-b-4 flex items-center justify-center gap-1 cursor-pointer transition-all ${
                cashRegister.length === 0
                  ? 'bg-stone-100 border-stone-200 text-stone-400 pointer-events-none'
                  : 'bg-emerald-400 border-emerald-600 text-white hover:bg-emerald-500'
              }`}
            >
              🛒 確認支付零錢
            </button>

            {feedback.success === true && (
              <button
                onClick={generateNewTask}
                className="py-3 px-4 bg-amber-400 hover:bg-amber-500 border-b-4 border-amber-600 text-white rounded-2xl font-black text-sm cursor-pointer"
              >
                買下一個 🚀
              </button>
            )}
          </div>

        </div>

        {/* Badge reward triggers popover */}
        {showReward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce mb-4">
                🪙
              </div>
              <h3 className="text-xl font-black text-stone-800">
                🎉 解鎖理財小管家勳章！
              </h3>
              <p className="text-stone-500 font-bold text-xs mt-2 leading-relaxed">
                哇！你太神啦，算數比收銀機還快呢！{explorerName} 已經成功算對了 3 次超市澳門幣零錢，得到了所有好看的明信片和杏仁餅！
              </p>
              
              <div className="bg-emerald-50 p-4 border rounded-2xl my-4 text-xs font-black text-emerald-700">
                獲得稱號：🪙 理財小管家
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEarnStamp}
                className="w-full py-4 bg-emerald-400 hover:bg-emerald-500 text-white text-base font-black rounded-2xl shadow-lg border-b-4 border-emerald-600 flex items-center justify-center gap-2 cursor-pointer"
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
              <p className="text-emerald-800 font-black text-sm leading-tight">第四關「貨幣超市」成功通關！</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">「理財小管家🪙」印章已經在保險箱放好囉！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
