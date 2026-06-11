/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Volume2 } from 'lucide-react';
import { PIPI_IMAGE, TART_IMAGE } from '../data';
import AudioSpeaker from './AudioSpeaker';

interface Message {
  id: string;
  sender: 'user' | 'helper';
  text: string;
  timestamp: Date;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMascot: 'pipi' | 'tart';
  explorerName: string;
}

const PRESET_QUESTIONS = [
  '澳門名字是怎麼來的呀？⛵',
  '大三巴牌坊為什麼只剩下一面牆？🏛️',
  '澳門幣上面真的有蓮花花瓣嗎？🪙',
  '澳門最有名最好吃的美食是什麼？🧁',
  '大熊貓健健康康最喜歡吃什麼？🐼',
];

export default function AIChatModal({ isOpen, onClose, selectedMascot, explorerName }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const mascotName = selectedMascot === 'pipi' ? '探險小鳥琵琵' : '葡撻寶寶';
  const mascotAvatar = selectedMascot === 'pipi' ? PIPI_IMAGE : TART_IMAGE;

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'helper',
          text: `嗨，${explorerName}！我是你的旅行夥伴 ${mascotName} 呀！你對澳門有什麼好奇的大疑問嗎？不管你問什麼，我都懂喔！快點擊下面的快捷小卡片，或者打個字問問我吧！`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length, explorerName, mascotName]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          mascot: selectedMascot,
          explorerName: explorerName
        })
      });

      if (!response.ok) {
        throw new Error('抱歉小寶貝，我開小差去了，請再問我一次喔！');
      }

      const data = await response.json();
      
      const helperMsg: Message = {
        id: Math.random().toString(),
        sender: 'helper',
        text: data.reply || '哎呀，我剛剛沒聽懂，你能用簡單的話再問一次嗎？',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, helperMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: Math.random().toString(),
        sender: 'helper',
        text: '噢，魔法書信件寄丟了，可能網絡叔叔睡著了。再按一次問題問我吧！',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        
        {/* Modal Outer Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="bg-white border-4 border-amber-300 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] relative"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 border-b-4 border-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-white/90">
                <img src={mascotAvatar} alt={mascotName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left text-white">
                <span className="text-[10px] font-black bg-white/25 px-2 py-0.5 rounded-full">
                  ✨ 澳門智能AI小精靈
                </span>
                <h3 className="text-base font-black leading-tight">
                  {mascotName} 的對話台
                </h3>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/20">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2.5`}
                >
                  {/* helper avatar */}
                  {!isUser && (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-amber-200 flex-shrink-0">
                      <img src={mascotAvatar} alt={mascotName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  <div className="max-w-[80%] text-left">
                    <div
                      className={`p-3.5 rounded-2xl border-2 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-rose-400 text-white border-rose-500 rounded-tr-none font-bold'
                          : 'bg-white text-stone-800 border-amber-200 rounded-tl-none font-medium'
                      }`}
                    >
                      {msg.text}
                      
                      {/* Read out loud helper only for mascot replies */}
                      {!isUser && (
                        <div className="mt-2 text-right">
                          <AudioSpeaker text={msg.text} lang="zh-HK" size="sm" label="聽大聲公讀" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {isTyping && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-amber-200">
                  <img src={mascotAvatar} alt={mascotName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-white border-2 border-amber-100 p-3 rounded-2xl flex items-center gap-1.5 shadow-sm">
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick preset cards drawer */}
          <div className="px-4 py-2 bg-stone-50 border-t-2 border-stone-100">
            <p className="text-[10px] font-black text-stone-400 text-left mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>常用童話探索提問（一鍵提問）：</span>
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 select-none">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                  className="flex-shrink-0 bg-white border-2 border-amber-200/60 hover:border-amber-400 text-stone-700 font-bold text-[11px] px-3 py-1.5 rounded-full shadow-xs cursor-pointer select-none transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Inputs */}
          <div className="p-4 bg-white border-t-4 border-stone-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(inputText);
              }}
              placeholder="輸入或讓媽媽幫你輸入想問的問題喔..."
              className="flex-1 bg-stone-50 border-2 border-stone-200 outline-none rounded-2xl py-3 px-4 text-sm font-bold text-stone-800 placeholder-stone-400 focus:border-amber-400 focus:bg-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage(inputText)}
              className="p-3 bg-rose-400 hover:bg-rose-500 text-white rounded-2xl border-b-4 border-rose-600 shadow-md cursor-pointer flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
