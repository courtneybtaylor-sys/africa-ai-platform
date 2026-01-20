"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

// African Proverbs categorized by theme
const proverbs = [
  // General Wisdom & Life Lessons
  { text: "Even an ant can hurt an elephant.", meaning: "Everyone, no matter how small, has power.", category: "wisdom" },
  { text: "Examine what is said, not who speaks.", meaning: "Value truth over reputation.", category: "wisdom" },
  { text: "Once you carry your own water, you will learn the value of every drop.", meaning: "Hard work teaches appreciation.", category: "wisdom" },
  { text: "Haste and hurry can only bear children with many regrets.", meaning: "Take your time; avoid mistakes.", category: "wisdom" },
  { text: "Rain beats a leopard's skin, but it does not wash out the spots.", meaning: "One's nature endures.", category: "wisdom" },
  { text: "It takes a whole village to raise a child.", meaning: "Community responsibility is key.", category: "wisdom" },
  { text: "You are beautiful, but learn to work, for you cannot eat your beauty.", meaning: "Beauty alone isn't enough.", category: "wisdom" },
  { text: "No shortcuts exist to the top of a palm tree.", meaning: "Success requires effort.", category: "wisdom" },
  { text: "If you think you are too small to make a difference, try spending the night with a mosquito.", meaning: "Even small things matter.", category: "wisdom" },
  { text: "If there is no enemy within, the enemy outside can do no harm.", meaning: "Strength comes from inner peace.", category: "wisdom" },
  { text: "However long the night, the dawn will always break.", meaning: "Hard times pass.", category: "wisdom" },
  { text: "Only a fool tests the depth of a river with no feet.", meaning: "Be cautious when unsure.", category: "wisdom" },
  
  // Knowledge & Understanding
  { text: "Wisdom is like a baobab tree; no one person can embrace it.", meaning: "Wisdom is vast.", category: "knowledge" },
  { text: "Knowledge is like a garden; if it is not cultivated, it cannot be harvested.", meaning: "Learning requires effort.", category: "knowledge" },
  { text: "He who learns, teaches.", meaning: "Teach others what you know.", category: "knowledge" },
  { text: "When an old man dies, a library burns with him.", meaning: "Elders hold wisdom.", category: "knowledge" },
  { text: "Do not look where you fell, but where you slipped.", meaning: "Understand causes, not results.", category: "knowledge" },
  { text: "The axe forgets but the tree remembers.", meaning: "Those hurt seldom forget.", category: "knowledge" },
  
  // Love & Relationships
  { text: "Truth should be in love and love in truth.", meaning: "Genuine relationships are honest.", category: "love" },
  { text: "Where there is love, there is no darkness.", meaning: "Love illuminates life.", category: "love" },
  { text: "If love is a sickness, patience is the remedy.", meaning: "Patience nurtures love.", category: "love" },
  { text: "It is better to be loved than to be feared.", meaning: "Love beats fear.", category: "love" },
  
  // Family & Community
  { text: "A mother cannot give birth to something bigger than herself.", meaning: "One shapes what they raise.", category: "family" },
  { text: "A small house will hold a hundred friends.", meaning: "Hospitality enriches community.", category: "family" },
  { text: "Sticks in a bundle are unbreakable.", meaning: "Unity brings strength.", category: "family" },
  { text: "Home affairs are not talked about on the public square.", meaning: "Family matters stay private.", category: "family" },
  
  // Nature & Animals
  { text: "When two elephants fight, it is the grass that gets hurt.", meaning: "The innocent suffer in conflicts.", category: "nature" },
  { text: "Even the lion protects himself against flies.", meaning: "Stay vigilant.", category: "nature" },
  { text: "A bird that flies off the Earth and lands on an anthill is still on the ground.", meaning: "Roots matter.", category: "nature" },
  { text: "Restless feet might walk you into a snake pit.", meaning: "Rash actions have risks.", category: "nature" },
  { text: "Wood already touched by fire is not hard to set alight.", meaning: "Once influenced, reactions come easily.", category: "nature" },
];

export function ProverbSection() {
  const [dailyProverb, setDailyProverb] = useState(proverbs[0]);

  useEffect(() => {
    // Get day of year to show consistent proverb for the day
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use day of year to select a proverb
    const proverbIndex = dayOfYear % proverbs.length;
    setDailyProverb(proverbs[proverbIndex]);
  }, []);

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Dark background for better text contrast */}
      <div className="absolute inset-0 bg-ebony" />
      
      {/* Accent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-safari-gold/20 via-sunset-orange/10 to-kente-red/20" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Quote Icon */}
          <div className="shrink-0 w-12 h-12 rounded-full bg-safari-gold/20 border border-safari-gold/30 flex items-center justify-center">
            <Quote className="w-6 h-6 text-safari-gold" />
          </div>

          {/* Proverb Content */}
          <div className="text-center sm:text-left flex-1">
            <p className="font-serif text-lg md:text-xl font-semibold text-white leading-snug">
              "{dailyProverb.text}"
            </p>
            <p className="text-sm text-safari-gold/90 mt-1">
              {dailyProverb.meaning}
            </p>
          </div>

          {/* Category badge */}
          <span className="shrink-0 px-3 py-1 rounded-full bg-safari-gold/20 border border-safari-gold/30 text-safari-gold text-xs font-medium">
            Daily Proverb
          </span>
        </div>
      </div>
    </section>
  );
}
