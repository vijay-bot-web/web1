/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Moon, 
  Sun, 
  Leaf, 
  Flower, 
  Zap, 
  ChevronRight, 
  Layout, 
  Palette, 
  PenTool, 
  Compass, 
  Maximize, 
  Home,
  ChevronDown
} from 'lucide-react';

// Types
type Emotion = 'calm' | 'happy' | 'stressed' | 'lonely' | null;

interface RoomData {
  id: Emotion;
  title: string;
  text: string;
  bg: string;
  image: string;
  icon: React.ReactNode;
  emoji: string;
}

const ROOMS: Record<string, RoomData> = {
  calm: {
    id: 'calm',
    title: 'Calm',
    text: '“I hope this calm space reminds you how much you are loved.”🌿',
    bg: '#E8EBE4',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920', // 3D-like minimalist room
    icon: <Leaf className="w-6 h-6" />,
    emoji: '🌿'
  },
  happy: {
    id: 'happy',
    title: 'Happy',
    text: '“May laughter and smiles follow you everywhere, my sweetest friend.”☀️',
    bg: '#FFF8E1',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920', // Bright 3D-like living room
    icon: <Flower className="w-6 h-6" />,
    emoji: '☀️'
  },
  stressed: {
    id: 'stressed',
    title: 'Stressed',
    text: '“Take a deep breath, Papa — everything will be okay.”⚡',
    bg: '#1A1A1A', // Darker background to avoid "white page" look
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1920', // Moody 3D-like library/study
    icon: <Zap className="w-6 h-6" />,
    emoji: '⚡'
  },
  lonely: {
    id: 'lonely',
    title: 'Lonely',
    text: '“You are never truly lonely; my heart is always with you papa.”🌙',
    bg: '#EDEFF2',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=1920', // Minimalist 3D-like bedroom
    icon: <Moon className="w-6 h-6" />,
    emoji: '🌙'
  }
};

const HeartCharacter = () => {
  return (
    <motion.div 
      animate={{
        x: [0, 60, -60, 30, -30, 0],
        y: [0, -40, 40, -20, 20, 0],
        rotate: [0, 5, -5, 3, -3, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-48 h-48 flex items-center justify-center"
    >
      {/* Arms */}
      <motion.div 
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-2 bg-[#38BDF8] rounded-full origin-right" 
      />
      <motion.div 
        animate={{ rotate: [0, -20, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-2 bg-[#38BDF8] rounded-full origin-left" 
      />
      
      {/* Legs */}
      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="absolute bottom-0 left-1/3 w-2 h-8 bg-[#38BDF8] rounded-full" 
      />
      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        className="absolute bottom-0 right-1/3 w-2 h-8 bg-[#38BDF8] rounded-full" 
      />

      {/* Main Heart Body */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          filter: [
            'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))',
            'drop-shadow(0 0 40px rgba(56, 189, 248, 0.7))',
            'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))'
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Heart size={120} fill="#38BDF8" stroke="#38BDF8" className="drop-shadow-2xl" />
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-6">
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="w-3 h-3 bg-white rounded-full" 
          />
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="w-3 h-3 bg-white rounded-full" 
          />
        </div>

        {/* Smile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-2">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path d="M 5 5 Q 20 20 35 5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(null);
  const [miniHearts, setMiniHearts] = useState<{ id: number; x: number; y: number; tx: number; ty: number; rotation: number; scale: number }[]>([]);
  const emotionRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);

  const handleStart = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const count = Math.floor(Math.random() * 5) + 8; // 8-12 hearts
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      tx: (Math.random() - 0.5) * 150, // Random X deviation
      ty: -Math.random() * 200 - 150, // Float upward
      rotation: Math.random() * 45 - 22.5, // Slight rotation
      scale: Math.random() * 0.5 + 0.5,
    }));
    
    setMiniHearts(prev => [...prev, ...newHearts]);
    
    // Cleanup hearts after animation
    setTimeout(() => {
      setMiniHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 3000);

    if (!started) {
      setStarted(true);
      setTimeout(() => {
        emotionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }
  };

  const handleSelectEmotion = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setTimeout(() => {
      roomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen selection:bg-accent/30 font-sans">
      {/* Entry Screen */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-base">
        {/* Moving Interior Design Tools in Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const icons = [Layout, Palette, PenTool, Compass, Maximize, Home];
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + 'vw', 
                  y: Math.random() * 100 + 'vh',
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                animate={{ 
                  x: [null, Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'],
                  y: [null, Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
                  opacity: [0, 0.15, 0],
                  rotate: [null, Math.random() * 360, Math.random() * 360]
                }}
                transition={{ 
                  duration: 25 + Math.random() * 15, 
                  repeat: Infinity, 
                  delay: Math.random() * 10,
                  ease: "linear"
                }}
                className="absolute text-accent"
              >
                <Icon size={40 + Math.random() * 60} strokeWidth={1} />
              </motion.div>
            );
          })}
        </div>

        {/* Continuous Background Mini Hearts Flow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`bg-heart-${i}`}
              initial={{ 
                x: Math.random() * 100 + 'vw', 
                y: '110vh',
                opacity: Math.random() * 0.2 + 0.05,
                scale: Math.random() * 0.4 + 0.2,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: '-10vh',
                x: [null, (Math.random() * 100) + 'vw'],
                rotate: [null, Math.random() * 360 + 360]
              }}
              transition={{ 
                duration: Math.random() * 20 + 20, 
                repeat: Infinity, 
                delay: Math.random() * 25,
                ease: "linear"
              }}
              className="absolute"
            >
              <Heart size={20} fill="#38BDF8" stroke="none" className="opacity-30" />
            </motion.div>
          ))}
        </div>

        {/* Main Sky Blue Heart Character */}
        <div className="relative flex items-center justify-center mb-12">
          <HeartCharacter />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center"
          >
            <motion.span 
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-text-primary text-xl md:text-3xl font-bold tracking-[0.1em] block transition-all duration-300 group-hover:drop-shadow-md"
            >
              Nice to see you
            </motion.span>
            <motion.div 
              className="h-[1.5px] bg-accent/40 w-full mt-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.5 }}
            />
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs uppercase tracking-[0.3em] text-accent font-bold mt-8 block"
            >
              Switch on the room
            </motion.span>
          </motion.button>
        </div>

        {/* Mini Hearts Container */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatePresence>
            {miniHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ 
                  x: heart.x, 
                  y: heart.y, 
                  opacity: 1, 
                  scale: 1,
                  rotate: 0
                }}
                animate={{ 
                  x: heart.x + heart.tx,
                  y: heart.y + heart.ty,
                  opacity: 0,
                  scale: 0.5,
                  rotate: heart.rotation
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute"
                style={{ left: -10, top: -10 }} // Offset for heart size
              >
                <Heart size={20} fill="#38BDF8" stroke="#38BDF8" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-text-primary/30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Emotion Selection Screen */}
      <section 
        ref={emotionRef}
        className="min-h-screen flex flex-col items-center justify-center py-24 px-6 bg-bg-base"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How does this space feel?</h2>
          <p className="text-text-primary/60 text-lg">Select an emotion to transform the room.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {Object.values(ROOMS).map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleSelectEmotion(room.id)}
              className={`cursor-pointer p-8 rounded-3xl glass-card premium-shadow transition-all duration-500 group ${
                selectedEmotion === room.id ? 'ring-2 ring-accent' : ''
              }`}
            >
              <div className="mb-6 w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                {room.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{room.title} {room.emoji}</h3>
              <p className="text-text-primary/50 text-sm leading-relaxed">Experience a space designed for {room.id} moments.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Room Transformation Section */}
      <div ref={roomRef}>
        <AnimatePresence mode="wait">
          {selectedEmotion && (
            <motion.section
              key={selectedEmotion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: ROOMS[selectedEmotion].bg }}
              className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Refined SVG Filters */}
              <svg className="hidden">
                <filter id="subtle-pulse">
                  <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3">
                    <animate attributeName="scale" values="3;6;3" dur="10s" repeatCount="indefinite" />
                  </feDisplacementMap>
                </filter>
              </svg>

              {/* Immersive Room Visuals */}
              <div className="absolute inset-0 z-0">
                {/* Base Room Layer */}
                <motion.div
                  initial={{ scale: 1.12, x: -15, y: -10 }}
                  animate={{ 
                    scale: [1.12, 1.05, 1.1],
                    x: [0, 10, -10],
                    y: [0, -8, 8]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut" 
                  }}
                  className="w-full h-full"
                  style={{ filter: 'url(#subtle-pulse)' }}
                >
                  <img
                    src={ROOMS[selectedEmotion].image}
                    alt={`${selectedEmotion} room`}
                    className={`w-full h-full object-cover transition-all duration-[2000ms] ${
                      selectedEmotion === 'stressed' ? 'brightness-80 contrast-140 saturate-[0.7]' : 
                      selectedEmotion === 'happy' ? 'brightness-120 saturate-120' : 
                      selectedEmotion === 'lonely' ? 'brightness-85 grayscale-[0.5]' : 'brightness-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Sophisticated Lighting & Atmosphere Layers */}
                <motion.div 
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  style={{
                    background: selectedEmotion === 'happy' 
                      ? 'radial-gradient(circle at 20% 20%, rgba(255, 245, 210, 0.6), transparent 50%)'
                      : selectedEmotion === 'calm'
                      ? 'radial-gradient(circle at 80% 20%, rgba(210, 255, 230, 0.4), transparent 60%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(180, 220, 255, 0.3), transparent 70%)'
                  }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => {
                    const size = Math.random() * 2 + 1;
                    const duration = Math.random() * 15 + 15;
                    return (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: Math.random() * 100 + 'vw', 
                          y: Math.random() * 100 + 'vh',
                          opacity: 0
                        }}
                        animate={{ 
                          y: [null, '-20vh', '-50vh'],
                          opacity: [0, 0.5, 0]
                        }}
                        transition={{ 
                          duration: duration, 
                          repeat: Infinity, 
                          delay: Math.random() * 10,
                          ease: "linear"
                        }}
                        style={{ width: size, height: size }}
                        className="absolute rounded-full bg-white/40 blur-[1px]"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Minimal Text Overlay */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-24 px-6 pointer-events-none">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center max-w-2xl bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-white/10"
                >
                  <h2 className={`text-sm md:text-lg font-medium leading-relaxed mb-4 ${
                    selectedEmotion === 'stressed' ? 'text-white' : 'text-white'
                  }`}>
                    {ROOMS[selectedEmotion].text}
                  </h2>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 100 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="h-[2px] bg-accent/80 mx-auto rounded-full" 
                  />
                </motion.div>
              </div>

              {/* Reset Control */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => emotionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className={`absolute bottom-8 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase transition-all pointer-events-auto ${
                  selectedEmotion === 'stressed' ? 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80' : 'bg-black/10 text-text-primary/40 hover:bg-black/20 hover:text-text-primary/70'
                } backdrop-blur-md border border-white/10 shadow-xl`}
              >
                Reset Space
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Final Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-bg-base px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl text-center"
        >
          <div className="mb-12 flex justify-center">
            <Heart className="w-12 h-12 text-accent fill-accent/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 italic">
            “A room is never just a room. It becomes what the person inside feels.”
          </h2>
          <div className="w-16 h-[1px] bg-text-primary/20 mx-auto mb-12" />
          <p className="text-accent uppercase tracking-[0.3em] text-xs font-bold">The Room That Remembers</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5 text-center text-text-primary/30 text-xs tracking-widest uppercase">
        &copy; 2026 Interior Psychology Studio
      </footer>
    </div>
  );
}
