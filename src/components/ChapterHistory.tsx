/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HISTORY_STORY_STEPS, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, ArrowRight, Award } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterHistoryProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

export default function ChapterHistory({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterHistoryProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const stepsLength = HISTORY_STORY_STEPS.length;
  const currentStepData = HISTORY_STORY_STEPS[currentStep];

  const handleNextStep = () => {
    if (currentStep < stepsLength - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Reached the end! Trigger badge reward prompt
      if (!isBadgeEarned) {
        setShowReward(true);
      }
    }
  };

  const handleEarnStamp = () => {
    onEarnBadge('history');
    setShowReward(false);
  };

  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Top Navigation Row */}
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 bg-white border-2 border-stone-200 text-stone-700 font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer shadow-sm hover:border-stone-300"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
          <span>回地圖</span>
        </button>

        <span className="text-sm font-black text-amber-600 bg-amber-50 border-2 border-amber-300 px-3 py-1 rounded-full flex items-center gap-1">
          ⚓ 時光飛船歷史篇
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Intro mascot bubbler */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot" className="w-14 h-14 object-cover flex-shrink-0" referrerPolicy="no-referrer" />
          <div>
            <p className="text-stone-700 font-bold text-sm leading-relaxed">
              「{explorerName}，快登上時光飛船！我們將穿越時空，看看好久以前的澳門是什麼樣子！請點擊下面的時光尺前進喔！」
            </p>
          </div>
        </div>

        {/* Cute Time Sailboat slider (Interactive Milestones) */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-5 shadow-lg mb-6 relative">
          
          {/* Timeline Visual Line with Milestones */}
          <div className="relative mb-8 pb-2">
            <div className="absolute top-[18px] left-3 right-3 h-2.5 bg-stone-100 border border-stone-200 rounded-full" />
            
            {/* Animated Sailboat track */}
            <div 
              className="absolute top-[18px] left-3 h-2.5 bg-amber-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / (stepsLength - 1)) * 95}%` }}
            />

            {/* Milestones circles */}
            <div className="flex justify-between relative">
              {HISTORY_STORY_STEPS.map((step, idx) => {
                const isActive = idx === currentStep;
                const isPassed = idx < currentStep;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className="flex flex-col items-center select-none outline-none relative z-10 cursor-pointer"
                  >
                    {/* Circle bulb */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-4 transition-all ${
                      isActive 
                        ? 'bg-amber-400 border-amber-300 text-white scale-125 ring-4 ring-amber-200/50' 
                        : isPassed
                          ? 'bg-amber-100 border-amber-300 text-amber-600'
                          : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}>
                      {step.visualElement}
                    </div>
                    {/* Period text */}
                    <span className={`text-[10px] font-black mt-2 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded-full select-none ${
                      isActive ? 'text-amber-600 bg-amber-50 border-amber-200 font-extrabold' : 'text-stone-400'
                    }`}>
                      {step.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Detail Reader Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-amber-50/50 rounded-2.5xl p-5 border-2 border-amber-100/70 text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{currentStepData.visualElement}</span>
                <span className="text-[10px] bg-amber-200/50 text-amber-800 font-extrabold px-3 py-1 rounded-full">
                  時空站：{currentStepData.year}
                </span>
              </div>
              
              <h3 className="text-xl font-black text-stone-800 leading-tight">
                {currentStepData.title}
              </h3>
              
              <p className="text-sm font-medium text-stone-600 leading-relaxed">
                {currentStepData.story}
              </p>

              <div className="bg-white/80 p-3 rounded-2xl border border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">📢</span>
                  <span className="text-xs font-black text-amber-700">聽導遊說故事：</span>
                </div>
                <AudioSpeaker text={currentStepData.story} lang="zh-HK" size="sm" />
              </div>

              <div className="pt-2 text-xs font-bold text-rose-500 animate-pulse flex items-center gap-1">
                <span>👉 指導：</span>
                <span>{currentStepData.interactivePrompt}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Timeline navigation controls */}
          <div className="mt-6 flex justify-between gap-3">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`flex-1 py-3 px-4 rounded-2xl font-extrabold border-2 text-sm flex items-center justify-center gap-1 select-none transition-all ${
                currentStep === 0
                  ? 'bg-stone-50 border-stone-200 text-stone-300 pointer-events-none'
                  : 'bg-white border-stone-200 text-stone-700 cursor-pointer hover:border-stone-300'
              }`}
            >
              ← 上一個時空
            </button>

            <button
              onClick={handleNextStep}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-400 border-b-4 border-orange-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-1 select-none cursor-pointer"
            >
              <span>{currentStep === stepsLength - 1 ? '🎉 探索完畢！' : '下一個時空 →'}</span>
            </button>
          </div>
        </div>

        {/* Badge reward prompt modal overlay */}
        {showReward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce mb-4">
                ⚓
              </div>
              <h3 className="text-xl font-black text-stone-800">
                🎉 太棒啦！解鎖歷史徽章！
              </h3>
              <p className="text-stone-500 font-bold text-xs mt-2 leading-relaxed">
                恭喜 {explorerName} 小朋友！你成功駕駛時光小船，瞭解了澳門悠久的發展歷史！你現在是真正懂歷史的小船長啦！
              </p>
              
              <div className="bg-amber-50 p-4 border rounded-2xl my-4 text-xs font-black text-amber-700">
                獲得稱號：⚓ 小小歷史領航員
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEarnStamp}
                className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-white text-base font-black rounded-2xl shadow-lg border-b-4 border-amber-600 flex items-center justify-center gap-2 cursor-pointer"
              >
                📥 將印章放入我的收集冊！
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Display earned badge dashboard status */}
        {isBadgeEarned && (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-3xl text-left flex items-center gap-3">
            <div className="text-3xl bg-emerald-100 p-2 rounded-full">🏆</div>
            <div>
              <p className="text-emerald-800 font-black text-sm leading-tight">第一關「歷史探索」成功通關！</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">「小小歷史領航員⚓」印章已經放入你的手收集冊囉！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
