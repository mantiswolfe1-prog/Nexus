import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Check, X, Plus } from 'lucide-react';
import GlassCard from '../UI/GlassCard.js';
import NeonButton from '../UI/NeonButton.js';
import { Button } from '../UI/button.js';
import { Input } from '../UI/input.js';
import { Textarea } from '../UI/textarea.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI/dialog.js";

const SAMPLE_CARDS = [
  { id: 1, question: 'What is the formula for the area of a circle?', answer: 'A = πr²', difficulty: 'easy' },
  { id: 2, question: 'What is the powerhouse of the cell?', answer: 'Mitochondria', difficulty: 'easy' },
  { id: 3, question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare', difficulty: 'medium' },
  { id: 4, question: 'What is the chemical symbol for Gold?', answer: 'Au (from Latin "Aurum")', difficulty: 'medium' },
  { id: 5, question: 'What year did World War II end?', answer: '1945', difficulty: 'easy' },
];

export default function FlashcardDeck({ accentColor = '#a55eea' }) {
  const [cards, setCards] = useState(SAMPLE_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  const markCorrect = () => {
    setCorrect(prev => prev + 1);
    nextCard();
  };

  const markIncorrect = () => {
    setIncorrect(prev => prev + 1);
    nextCard();
  };

  const addCard = () => {
    if (newCard.question && newCard.answer) {
      setCards(prev => [...prev, { 
        id: Date.now(), 
        question: newCard.question, 
        answer: newCard.answer,
        difficulty: 'medium'
      }]);
      setNewCard({ question: '', answer: '' });
      setDialogOpen(false);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrect(0);
    setIncorrect(0);
  };

  return (
    <GlassCard className="p-6" accentColor={accentColor} hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Flashcards</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">
            {currentIndex + 1} / {cards.length}
          </span>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <NeonButton variant="ghost" size="icon">
                <Plus className="w-4 h-4" />
              </NeonButton>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-white/10">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Flashcard</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-white/70 mb-2 block">Question</label>
                  <Textarea
                    value={newCard.question}
                    onChange={(e) => setNewCard(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Enter your question..."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70 mb-2 block">Answer</label>
                  <Textarea
                    value={newCard.answer}
                    onChange={(e) => setNewCard(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="Enter the answer..."
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <Button 
                  onClick={addCard}
                  className="w-full"
                  style={{ backgroundColor: accentColor }}
                >
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Flashcard */}
      <div 
        className="relative h-48 perspective-1000 cursor-pointer mb-4"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div 
            className="absolute inset-0 rounded-xl p-6 flex items-center justify-center text-center backface-hidden"
            style={{ 
              backgroundColor: accentColor + '20',
              backfaceVisibility: 'hidden'
            }}
          >
            <p className="text-white font-medium">{currentCard?.question}</p>
          </div>
          
          {/* Back */}
          <div 
            className="absolute inset-0 rounded-xl p-6 flex items-center justify-center text-center"
            style={{ 
              backgroundColor: accentColor + '30',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <p className="text-white font-medium">{currentCard?.answer}</p>
          </div>
        </motion.div>
      </div>

      <p className="text-center text-xs text-white/40 mb-4">Tap to flip</p>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <NeonButton variant="ghost" size="icon" onClick={prevCard}>
          <ChevronLeft className="w-5 h-5" />
        </NeonButton>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={markIncorrect}
            className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"
          >
            <X className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={markCorrect}
            className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"
          >
            <Check className="w-5 h-5" />
          </motion.button>
        </div>

        <NeonButton variant="ghost" size="icon" onClick={nextCard}>
          <ChevronRight className="w-5 h-5" />
        </NeonButton>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <span className="text-green-400">✓ {correct}</span>
        <span className="text-red-400">✗ {incorrect}</span>
        <button onClick={reset} className="text-white/50 hover:text-white">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </GlassCard>
  );
}