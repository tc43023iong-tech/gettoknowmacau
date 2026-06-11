/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TART_IMAGE, PIPI_IMAGE, CHAPTERS } from '../data';
import { Award, Star, Printer, RotateCcw } from 'lucide-react';
import AudioSpeaker from './AudioSpeaker';

interface ExplorerCertificateProps {
  explorerName: string;
  selectedMascot: 'pipi' | 'tart';
  onReset: () => void;
  onBack: () => void;
}

export default function ExplorerCertificate({ explorerName, selectedMascot, onReset, onBack }: ExplorerCertificateProps) {
  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;
  const mascotName = selectedMascot === 'pipi' ? '小琵琵' : '蛋撻寶貝';

  const handlePrint = () => {
    window.print();
  };

  const today = new Date();
  const dateString = `${today.getFullYear()} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`;

  const certificateSpeechText = `恭喜${explorerName}小朋友！你完成了所有奇妙的關卡，成為了一名優秀的澳門小探險家！這張榮譽證書是屬於你的，快和爸爸媽媽一起拍照合影留念吧！`;

  return (
    <div className="min-h-screen bg-[#FFFBEB] md:border-[12px] border-8 border-[#FFD580] flex flex-col justify-center items-center py-10 px-4 font-sans select-none relative printing-container">
      
      {/* Visual background flying bubbles */}
      <div className="absolute top-10 left-10 text-5xl opacity-40 select-none animate-bounce" style={{ animationDuration: '4s' }}>✨</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-40 select-none animate-bounce" style={{ animationDuration: '6s' }}>👑</div>
      <div className="absolute top-40 right-20 text-4xl opacity-30 select-none animate-pulse">🎓</div>
      
      {/* Certificate Frame wrapper */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="bg-white border-[12px] border-double border-[#FFD580] max-w-2xl w-full rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center max-w-xl mx-auto"
        id="certificate-print-area"
      >
        {/* Certificate inner lace decoration */}
        <div className="absolute inset-4 border-2 border-dashed border-[#FFE0B2] rounded-[2.8rem] pointer-events-none" />

        {/* Golden Crown badge header */}
        <div className="relative z-10 text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-gradient-to-tr from-[#FFF9C4] via-[#FFE0B2] to-[#FFCC80] text-[#6D4C41] rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg border-4 border-white">
              🏅
            </div>
          </motion.div>
          <div className="flex justify-center items-center gap-1.5 mt-3">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <h2 className="text-sm font-black text-[#6D4C41] tracking-widest uppercase">HONORARY CERTIFICATE</h2>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Certificate title heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#6D4C41] leading-tight tracking-wide mb-6">
          澳門小探險家 <br className="md:hidden" />
          <span className="text-[#6D4C41] font-extrabold text-2xl md:text-3xl bg-[#FFF9C4]/50 px-4 py-1.5 rounded-full inline-block border-2 border-[#FFD580] mt-2">
            🥇 榮譽畢業證書 🥇
          </span>
        </h1>

        {/* Certificate core body */}
        <div className="space-y-4 max-w-lg mx-auto relative z-10 text-center">
          <p className="text-sm font-bold text-[#795548]">茲證明：</p>
          
          <h2 className="text-3xl font-black text-[#5D4037] underline decoration-[#FFD580] underline-offset-8">
            {explorerName} 小朋友
          </h2>

          <p className="text-sm font-semibold text-[#5D4037] leading-relaxed px-2 py-2 mt-4">
            在「澳門幼兒趣味探索之旅」中表現卓越，發揮了非凡的智慧與勇氣！成功掌握了**澳門歷史、節日文化、中葡雙語發音、貨幣付錢計算、烘培葡式蛋撻**以及**還原著名地標拼圖**等六大魔法課程！
          </p>

          <p className="text-xs font-black text-[#FF9A8B]">
            特此頒發此證，榮膺「✨ 澳門金牌荣誉探索大使 ✨」之高尚稱號！
          </p>
        </div>

        {/* Display Stamps in smaller circle layouts on the certificate */}
        <div className="grid grid-cols-6 gap-2 my-8 px-2 max-w-sm mx-auto">
          {CHAPTERS.map((ch) => (
            <div key={ch.id} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#FFD580] bg-[#FFFBEB] flex items-center justify-center text-lg rotate-6 shadow-sm">
                <span>{ch.badgeEmoji}</span>
              </div>
              <span className="text-[8px] font-black mt-1 text-[#795548] leading-none">
                {ch.badgeName.substring(0, 4)}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom signature and Date */}
        <div className="mt-8 pt-6 border-t-2 border-[#FFE0B2] flex items-center justify-between gap-4 text-left px-2">
          
          {/* Mascot signature block */}
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFD580] bg-[#FFFBEB]">
              <img src={mascotAvatar} alt={mascotName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-[10px] text-[#795548] font-bold leading-none block">主考導遊簽字:</span>
              <span className="text-xs font-black text-[#6D4C41] font-serif leading-normal">{mascotName} 🐾</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#795548] font-bold block">探險畢業日期:</span>
            <span className="text-xs font-black text-[#5D4037] leading-normal">{dateString}</span>
          </div>

        </div>

        {/* Audio helper for congrats */}
        <div className="my-4 pt-4 border-t border-dashed border-[#FFE0B2]">
          <AudioSpeaker text={certificateSpeechText} lang="zh-HK" size="sm" label="聽聽導遊給你頒獎" />
        </div>

      </motion.div>

      {/* Action buttons drawer (HIDDEN WHEN PRINTING) */}
      <div className="mt-8 flex gap-4 max-w-md w-full px-4 print-hide relative z-20">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 bg-white border-2 border-[#FFE0B2] hover:border-stone-300 text-[#795548] rounded-2xl font-black text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>返回地圖</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 py-3 px-4 bg-[#FFB74D] border-b-4 border-b-[#D84315] text-[#6D4C41] rounded-2xl font-black text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:brightness-105 animate-pulse"
        >
          <Printer className="w-4 h-4" />
          <span>列印證書</span>
        </button>

        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 bg-[#D32F2F] border-b-4 border-b-[#B71C1C] text-white rounded-2xl font-black text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:brightness-110"
        >
          <RotateCcw className="w-4 h-4" />
          <span>重新探險</span>
        </button>
      </div>

      {/* Inline styles for clean print view layout */}
      <style>{`
        @media print {
          .print-hide {
            display: none !important;
          }
          body, .printing-container {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #certificate-print-area {
            border: 8px double #fbbf24 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            padding: 2rem !important;
          }
        }
      `}</style>

    </div>
  );
}
