/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioSpeakerProps {
  text: string;
  lang?: 'zh-HK' | 'zh-CN' | 'pt-PT' | 'en';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function AudioSpeaker({ text, lang = 'zh-HK', size = 'md', label }: AudioSpeakerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
    }
  };

  const startSpeaking = () => {
    if (!synth) {
      alert('抱歉，你的瀏覽器不支援發音功能喔！');
      return;
    }

    // Cancel anything speaking currently
    synth.cancel();

    // Clean up texts for speech (remove emojis since they sound weird in tts)
    const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    
    // Choose voice based on language and availability
    const voices = synth.getVoices();
    let selectedVoice = null;
    
    if (lang === 'zh-HK') {
      selectedVoice = voices.find(v => v.lang.includes('HK') || v.lang.includes('hk') || v.lang.includes('Yue') || v.lang.includes('yue'));
    } else if (lang === 'pt-PT') {
      selectedVoice = voices.find(v => v.lang.includes('PT') || v.lang.includes('pt'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Child-friendly speed and pitch
    utterance.rate = 0.95; // Slightly slower
    utterance.pitch = 1.25; // Slightly higher/cuter pitch
    
    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    synth.speak(utterance);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  const btnClasses = size === 'sm' 
    ? 'p-2 text-xs rounded-full' 
    : size === 'lg' 
      ? 'p-4 text-lg rounded-3xl gap-2 shadow-md' 
      : 'p-3 text-sm rounded-2xl gap-1.5 shadow';

  return (
    <div className="inline-flex items-center" id={`speaker-container-${text.substring(0, 5)}`}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className={`${btnClasses} inline-flex items-center justify-center font-bold text-white transition-all 
          ${isPlaying 
            ? 'bg-rose-500 hover:bg-rose-600 animate-pulse' 
            : 'bg-amber-400 hover:bg-amber-500 border-2 border-stone-100'
          }`}
        type="button"
        title={isPlaying ? "停止說話" : "大聲讀給你聽"}
      >
        {isPlaying ? (
          <>
            <VolumeX className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
            {label && <span className="mr-1">{label}</span>}
          </>
        ) : (
          <>
            <Volume2 className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
            {label && <span className="mr-1">{label}</span>}
          </>
        )}
      </motion.button>
      
      {isPlaying && (
        <span className="flex h-3 w-3 relative mr-2 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
      )}
    </div>
  );
}
