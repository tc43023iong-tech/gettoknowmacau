/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PIPI_IMAGE, TART_IMAGE } from '../data';
import AudioSpeaker from './AudioSpeaker';

interface IntroScreenProps {
  onStart: (name: string, mascot: 'pipi' | 'tart') => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [name, setName] = useState('');
  const [selectedMascot, setSelectedMascot] = useState<'pipi' | 'tart'>('pipi');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('請輸入你的可愛小名字喔！');
      return;
    }
    if (cleanName.length > 8) {
      setError('哇，名字有點太長啦，小夥伴記不住，縮短成8個字以內好嗎？');
      return;
    }
    onStart(cleanName, selectedMascot);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] flex flex-col justify-between py-8 px-4 font-sans select-none overflow-hidden relative">
      
      {/* Background clouds decoration */}
      <div className="absolute top-10 left-5 opacity-40 select-none pointer-events-none animate-bounce" style={{ animationDuration: '6s' }}>
        <span className="text-5xl">☁️</span>
      </div>
      <div className="absolute top-20 right-10 opacity-30 select-none pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}>
        <span className="text-6xl">☁️</span>
      </div>
      <div className="absolute bottom-20 left-10 opacity-30 select-none pointer-events-none animate-bounce" style={{ animationDuration: '8s' }}>
        <span className="text-4xl">🎈</span>
      </div>
      <div className="absolute bottom-40 right-10 opacity-40 select-none pointer-events-none animate-bounce" style={{ animationDuration: '5s' }}>
        <span className="text-4xl">⭐</span>
      </div>

      {/* Header */}
      <div className="max-w-md mx-auto w-full text-center mt-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="relative inline-block px-6 py-4 bg-white border-4 border-[#FFE0B2] rounded-[32px] shadow-[4px_4px_0px_#FFB74D]"
        >
          <div className="absolute -top-5 -left-5 text-4xl transform -rotate-12">🇲🇴</div>
          <div className="absolute -top-5 -right-5 text-4xl transform rotate-12">🎪</div>
          <h1 className="text-3xl md:text-4xl font-black text-[#6D4C41] tracking-wider font-sans leading-tight">
            澳門小探險家 <br/>
            <span className="text-[#FF9A8B] text-2xl md:text-3xl font-bold">🌸 趣味探索繪本 🌸</span>
          </h1>
          <p className="text-sm font-semibold text-[#795548] mt-2">
            專為升小一的小寶貝打造的魔法書
          </p>
        </motion.div>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full bg-white border-4 border-[#FFD180] rounded-[40px] shadow-[6px_6px_0px_#FFE0B2] p-6 my-6 relative z-10">
        
        {/* Welcome bubble with TTS */}
        <div className="bg-[#FFFCEE] rounded-3xl p-4 mb-6 border-2 border-[#FFD580] flex items-start gap-3 relative">
          <div className="text-3xl animate-bounce">👋</div>
          <div className="flex-1">
            <p className="text-[#5D4037] text-sm font-semibold leading-relaxed">
              「哈囉小寶貝！歡迎來到美麗的澳門！我是你的導遊，快輸入你的小名，然後選一位可愛的小夥伴，我們一起出發探險吧！」
            </p>
            <div className="mt-2 text-right">
              <AudioSpeaker 
                text="哈囉小寶貝！歡迎來到美麗的澳門！我是你的導遊，快輸入你的小名，然後選一位可愛的小夥伴，我們一起出發探險吧！" 
                lang="zh-HK" 
                size="sm"
                label="聽大聲公讀" 
              />
            </div>
          </div>
          {/* cute bubble tail */}
          <div className="absolute bottom-[-10px] left-6 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#FFD580] border-r-[10px] border-r-transparent"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-base font-extrabold text-[#6D4C41] text-left">
              ✍️ 1. 寫下你的可愛名字：
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="例如：小明、寶貝、甜甜"
              className="w-full bg-[#FFFBEB] border-4 border-[#FFE0B2] text-[#6D4C41] placeholder-stone-400 font-bold py-3.5 px-5 rounded-2xl outline-none focus:border-[#FF9A8B] focus:bg-white transition-all text-center text-lg shadow-inner"
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-500 font-bold text-xs"
              >
                ⚠️ {error}
              </motion.p>
            )}
          </div>

          {/* Mascot Selector */}
          <div className="space-y-3">
            <label className="block text-base font-extrabold text-[#6D4C41] text-left">
              🐣 2. 選擇你要和誰結伴探險：
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              
              {/* Pipi Option */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMascot('pipi')}
                className={`flex flex-col items-center p-3 rounded-3xl border-4 text-center transition-all ${
                  selectedMascot === 'pipi'
                    ? 'border-[#81D4FA] bg-sky-50 shadow-[4px_4px_0px_#29B6F6]'
                    : 'border-stone-100 bg-stone-50/30 hover:border-stone-200'
                }`}
              >
                <div className="w-24 h-24 bg-sky-100/60 rounded-full p-1 overflow-hidden relative border-2 border-sky-200">
                  <img 
                    src={PIPI_IMAGE} 
                    alt="探險鳥琵琵" 
                    className="w-full h-full object-cover transform scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 right-2 text-sm">🎒</div>
                </div>
                <h3 className="text-base font-black text-[#6D4C41] mt-2">小探險家琵琵</h3>
                <span className="text-xs text-sky-600 bg-sky-100/50 px-2 py-0.5 rounded-full font-bold mt-1">
                  稀有琵鷺鳥 🐦
                </span>
                <p className="text-[11px] text-[#795548] mt-1.5 leading-snug">
                  喜歡拍照、認路，懂得超級多澳門歷史小秘密唷！
                </p>
              </motion.button>

              {/* Tart Option */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMascot('tart')}
                className={`flex flex-col items-center p-3 rounded-3xl border-4 text-center transition-all ${
                  selectedMascot === 'tart'
                    ? 'border-[#FFAB91] bg-orange-50 shadow-[4px_4px_0px_#FF8A65]'
                    : 'border-stone-100 bg-stone-50/30 hover:border-stone-200'
                }`}
              >
                <div className="w-24 h-24 bg-orange-100/60 rounded-full p-1 overflow-hidden relative border-2 border-orange-200">
                  <img 
                    src={TART_IMAGE} 
                    alt="蛋撻寶寶" 
                    className="w-full h-full object-cover transform scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 right-2 text-sm">🧁</div>
                </div>
                <h3 className="text-base font-black text-[#6D4C41] mt-2">葡撻寶貝</h3>
                <span className="text-xs text-orange-600 bg-orange-100/50 px-2 py-0.5 rounded-full font-bold mt-1">
                  香噴噴蛋撻 😋
                </span>
                <p className="text-[11px] text-[#795548] mt-1.5 leading-snug">
                  好吃愛笑、戴著大廚師帽，專門研究澳門神級美食！
                </p>
              </motion.button>

            </div>
          </div>

          {/* Start Voyage Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#D32F2F] text-white font-black text-xl py-4 rounded-full shadow-lg border-b-8 border-b-[#B71C1C] flex items-center justify-center gap-2 cursor-pointer hover:brightness-110"
          >
            🚢 起航！澳門趣味冒險
          </motion.button>
        </form>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto text-center text-xs font-bold text-[#795548]">
        © 蓮花開滿的澳門冒險樂園 🇲🇴 適齡：5-8歲幼兒
      </div>

    </div>
  );
}
