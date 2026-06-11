/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS_DATA, PIPI_IMAGE, TART_IMAGE } from '../data';
import { ChevronLeft, Grid, HelpCircle, BookOpen, Star, RefreshCw } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ChapterAttractionsProps {
  onBack: () => void;
  onEarnBadge: (badgeId: string) => void;
  isBadgeEarned: boolean;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

// Simple 2x2 Jigsaw Puzzle specs
interface Piece {
  id: number;
  correctId: number;
  imgEmoji: string;
  name: string;
}

export default function ChapterAttractions({ onBack, onEarnBadge, isBadgeEarned, selectedMascot, explorerName }: ChapterAttractionsProps) {
  const [selectedSightIdx, setSelectedSightIdx] = useState(0);
  const [puzzlePieces, setPuzzlePieces] = useState<Piece[]>([]);
  const [selectedPieceIdx, setSelectedPieceIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [feedback, setFeedback] = useState('點擊任何一塊拼圖，然後點擊另一塊交換位置，拼出完整的地標吧！');

  const activeSight = ATTRACTIONS_DATA[selectedSightIdx];
  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;

  // Each sight gets 4 stylized emoji block pieces representing its rebuilding jigsaw
  const getScrambledPieces = (sightId: string): Piece[] => {
    let rawPieces: Piece[] = [];
    if (sightId === 'ruins') {
      rawPieces = [
        { id: 1, correctId: 1, imgEmoji: '🏛️ 上半', name: '大三巴牌坊-頂雕' },
        { id: 2, correctId: 2, imgEmoji: '🌟 天空', name: '大三巴牌坊-背光' },
        { id: 3, correctId: 3, imgEmoji: '🚪 門樓', name: '大三巴牌坊-石柱門' },
        { id: 4, correctId: 4, imgEmoji: '🪜 階梯', name: '大三巴牌坊-長石梯' },
      ];
    } else if (sightId === 'lighthouse') {
      rawPieces = [
        { id: 1, correctId: 1, imgEmoji: '🚨 射光', name: '燈塔-黃金燈室' },
        { id: 2, correctId: 2, imgEmoji: '☁️ 雲飄', name: '燈塔-高空雲海' },
        { id: 3, correctId: 3, imgEmoji: '🏰 塔身', name: '燈塔-白色塔骨' },
        { id: 4, correctId: 4, imgEmoji: '⛰️ 山腳', name: '燈塔-山峰小基' },
      ];
    } else if (sightId === 'taipa_houses') {
      rawPieces = [
        { id: 1, correctId: 1, imgEmoji: '🏡 翠屋', name: '薄荷綠別墅-瓦頂' },
        { id: 2, correctId: 2, imgEmoji: '🌳 古樹', name: '薄荷綠別墅-大榕樹' },
        { id: 3, correctId: 3, imgEmoji: '🚪 小門', name: '薄荷綠別墅-長廊柱' },
        { id: 4, correctId: 4, imgEmoji: '🌸 荷池', name: '薄荷綠別墅-亮麗荷塘' },
      ];
    } else {
      rawPieces = [
        { id: 1, correctId: 1, imgEmoji: '🐼 滾滾', name: '熊貓館-開開熊貓' },
        { id: 2, correctId: 2, imgEmoji: '🎋 竹林', name: '熊貓館-翠竹梢' },
        { id: 3, correctId: 3, imgEmoji: '🍼 家家', name: '熊貓館-心心媽媽' },
        { id: 4, correctId: 4, imgEmoji: '🦩 仙鶴', name: '熊貓館-火烈鳥池' },
      ];
    }

    // Scramble up (guaranteed not naturally solved at start)
    let scrambled = [...rawPieces];
    let attempts = 0;
    while (attempts < 50) {
      scrambled.sort(() => Math.random() - 0.5);
      // check if it's in order
      const inOrder = scrambled.every((p, idx) => p.correctId === idx + 1);
      if (!inOrder) break;
      attempts++;
    }
    return scrambled;
  };

  const handleInitPuzzle = () => {
    setIsSolved(false);
    setSelectedPieceIdx(null);
    setPuzzlePieces(getScrambledPieces(activeSight.id));
    setFeedback('拼圖已被打亂！快點擊板塊交換位置吧！');
  };

  useEffect(() => {
    handleInitPuzzle();
  }, [selectedSightIdx]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedPieceIdx === null) {
      setSelectedPieceIdx(index);
      setFeedback(`選中了拼板，請再選取一個別的板塊換位置喔！`);
    } else {
      if (selectedPieceIdx === index) {
        setSelectedPieceIdx(null);
        setFeedback('拼圖已被放開。');
        return;
      }

      // Swap pieces
      const newPieces = [...puzzlePieces];
      const temp = newPieces[selectedPieceIdx];
      newPieces[selectedPieceIdx] = newPieces[index];
      newPieces[index] = temp;

      setPuzzlePieces(newPieces);
      setSelectedPieceIdx(null);

      // Check if solved
      const correct = newPieces.every((p, idx) => p.correctId === idx + 1);
      if (correct) {
        setIsSolved(true);
        setFeedback('🎉 哇！成功還原！拼圖拼對啦！地標發出耀眼的光芒！亮眼！');
        
        // If badge not earned, pop-up reward stamps!
        if (!isBadgeEarned) {
          setShowReward(true);
        }
      } else {
        setFeedback('交換成功！離完成更近一步啦，再試試吧！');
      }
    }
  };

  const handleEarnStamp = () => {
    onEarnBadge('attractions');
    setShowReward(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] pb-16 font-sans select-none relative">
      
      {/* Target Nav header */}
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 bg-white border-2 border-stone-200 text-stone-700 font-extrabold text-sm py-2 px-3.5 rounded-2xl cursor-pointer hover:border-stone-300"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
          <span>回地圖</span>
        </button>

        <span className="text-sm font-black text-purple-500 bg-purple-50 border-2 border-purple-300 px-3 py-1 rounded-full flex items-center gap-1">
          📥 七彩景點拼拼樂
        </span>
      </div>

      <main className="max-w-xl mx-auto px-4">
        
        {/* Mascot dialog speech bubble */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-4 shadow mb-6 flex gap-4 items-center text-left">
          <img src={mascotAvatar} alt="Mascot" className="w-14 h-14 object-cover flex-shrink-0 animate-bounce" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <p className="text-stone-700 font-bold text-sm leading-relaxed">
              「哇！這是澳門最著名的四個童話景點牌樓。可是今天颳起大風把地標拼圖都吹散啦！{explorerName}，你能幫忙旋轉交換，把精緻的地標還原嗎？」
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-between gap-1 mb-4 overflow-x-auto pb-1">
          {ATTRACTIONS_DATA.map((sight, idx) => {
            const isActive = idx === selectedSightIdx;
            return (
              <button
                key={sight.id}
                onClick={() => {
                  setSelectedSightIdx(idx);
                }}
                className={`flex-shrink-0 px-3 py-2 text-xs font-black border-2 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-100 border-purple-400 text-purple-700 ring-2 ring-purple-200'
                    : 'bg-white border-stone-200 text-stone-400'
                }`}
              >
                {sight.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Sight Card details */}
        <div className="bg-white border-4 border-stone-200 rounded-[2rem] p-5 shadow-lg mb-6 text-left">
          
          <div className="space-y-3">
            <h3 className="text-lg font-black text-purple-600">
              {activeSight.name}
            </h3>
            
            <p className="text-xs font-bold text-stone-400 font-mono">
              拼音唸法：{activeSight.pinyin}
            </p>
            
            <p className="text-xs font-semibold text-stone-500 leading-relaxed bg-stone-50 p-3.5 border rounded-2xl">
              {activeSight.description}
            </p>

            {/* Read out loud button */}
            <div className="p-2 border bg-purple-50 rounded-xl flex items-center justify-between text-xs font-bold text-purple-800">
              <span>🔊 聽導遊給你講景點：</span>
              <AudioSpeaker text={activeSight.description} lang="zh-HK" size="sm" />
            </div>
          </div>

          {/* Jigsaw game area */}
          <div className="mt-6 pt-5 border-t-2 border-stone-100">
            <div className="flex items-center justify-between pl-1 mb-3">
              <h4 className="text-xs font-black text-stone-500 flex items-center gap-1">
                <Grid className="w-4 h-4 text-purple-400" />
                <span>🧩 2x2 益智還原小挑戰：</span>
              </h4>
              <button
                onClick={handleInitPuzzle}
                className="p-1 px-2 border rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 text-[10px] font-black cursor-pointer flex items-center gap-1"
                title="重新洗牌"
              >
                <RefreshCw className="w-3 h-3" />
                <span>重新洗牌</span>
              </button>
            </div>

            {/* Scrambled 2x2 Grid Container */}
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto bg-stone-50 border-4 border-dashed border-stone-200 rounded-3xl p-3.5">
              {puzzlePieces.map((p, idx) => {
                const isSelected = idx === selectedPieceIdx;
                const isCorrectIndex = p.correctId === idx + 1;
                
                return (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: isSolved ? 1 : 1.03 }}
                    whileTap={{ scale: isSolved ? 1 : 0.97 }}
                    onClick={() => handleTileClick(idx)}
                    className={`aspect-square rounded-2xl border-4 p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isSolved 
                        ? 'bg-gradient-to-tr from-purple-200 to-indigo-300 border-purple-400 text-white shadow-md'
                        : isSelected
                          ? 'bg-amber-100 border-amber-400 scale-105 ring-4 ring-amber-200 text-amber-900 font-black'
                          : isCorrectIndex
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-extrabold'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 font-semibold'
                    }`}
                  >
                    <span className="text-3xl mb-1.5">{p.imgEmoji.split(' ')[0]}</span>
                    <span className="text-[10px] leading-tight font-black">{p.name.split('-')[1]}</span>
                    
                    {/* Tick icon indicator */}
                    {!isSolved && isCorrectIndex && (
                      <span className="absolute bottom-1 right-2 bg-emerald-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-black">
                        ✓
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Instruction feedback */}
            <div className="mt-4 p-3 bg-stone-50 rounded-2xl border text-stone-500 text-xs font-black text-center">
              {feedback}
            </div>
          </div>

        </div>

        {/* Badge reward trigger pop-over */}
        {showReward && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-amber-300 p-6 rounded-[2.5rem] text-center shadow-2xl max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce mb-4">
                🗺️
              </div>
              <h3 className="text-xl font-black text-stone-800">
                🎉 解鎖超級澳門活地圖勳章！
              </h3>
              <p className="text-stone-500 font-bold text-xs mt-2 leading-relaxed">
                哇塞！你長著一雙福爾摩斯般的亮眼睛呢！{explorerName} 已經成功修復還原了地標景點拼圖，把大三巴的石塊和燈塔發光室安置回位！全城的小朋友們都想和你合照！
              </p>
              
              <div className="bg-purple-50 p-4 border rounded-2xl my-4 text-xs font-black text-purple-700">
                獲得稱號：🗺️ 超級澳門活地圖
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEarnStamp}
                className="w-full py-4 bg-purple-400 hover:bg-purple-500 text-white text-base font-black rounded-2xl shadow-lg border-b-4 border-purple-600 flex items-center justify-center gap-2 cursor-pointer"
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
              <p className="text-emerald-800 font-black text-sm leading-tight">第六關「景點地圖」成功通關！</p>
              <p className="text-emerald-600 text-xs font-bold mt-1">「超級澳門活地圖🗺️」印章已經在書架擺好囉！</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
