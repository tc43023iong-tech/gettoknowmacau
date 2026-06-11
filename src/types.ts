/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Explorer {
  name: string;
  hasStarted: boolean;
  selectedMascot: 'pipi' | 'tart';
  collectedBadges: string[]; // ids of badges: 'history', 'culture', 'language', 'currency', 'food', 'attractions'
}

export interface Chapter {
  id: string;
  title: string;
  titleCn: string;
  badgeName: string;
  badgeEmoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconName: string;
}

export interface LanguageWord {
  phrase: string;
  pinyin: string;
  translation?: string;
  portuguese: string;
  portuguesePronounce: string;
  funFact: string;
  category: 'greeting' | 'life' | 'food';
}

export interface FoodIngredient {
  id: string;
  name: string;
  emoji: string;
  required: boolean;
}

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export interface PuzzlePiece {
  id: number;
  correctIndex: number;
  currentIndex: number;
  imageUrl: string;
}
