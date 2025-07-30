'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Reaction {
  id: string
  emoji: string
  x: number
  timestamp?: number
  isLocal?: boolean
}

const EMOJIS = ['😀', '😍', '🎉', '❤️', '🔥', '👏', '😂', '🤩', '💯', '🚀', '✨', '🙌', '🗑️', '💀']

export default function ReactionPanel() {
  const [reactions, setReactions] = useState<Reaction[]>([])
  const lastTimestampRef = useRef<number>(0)

  const addReaction = async (emoji: string) => {
    const x = 10 + Math.random() * 80
    const newReaction: Reaction = {
      id: Date.now().toString() + Math.random(),
      emoji,
      x,
      isLocal: true,
    }
    
    // Add to local state immediately for instant feedback
    setReactions(prev => [...prev, newReaction])
    
    // Send to server for other users
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji, x })
      })
    } catch (error) {
      console.error('Failed to send reaction:', error)
    }
  }

  // Poll for new reactions from other users
  useEffect(() => {
    const pollReactions = async () => {
      try {
        const response = await fetch(`/api/reactions?since=${lastTimestampRef.current}`)
        const data = await response.json()
        
        if (data.reactions && data.reactions.length > 0) {
          // Add new reactions from other users
          setReactions(prev => [...prev, ...data.reactions.map((r: Reaction) => ({
            ...r,
            isLocal: false
          }))])
          lastTimestampRef.current = data.timestamp
        }
      } catch (error) {
        console.error('Failed to fetch reactions:', error)
      }
    }

    // Poll every 500ms for smooth real-time feel
    const interval = setInterval(pollReactions, 500)
    
    // Initial fetch
    pollReactions()
    
    return () => clearInterval(interval)
  }, [])

  // Clean up old reactions
  useEffect(() => {
    const interval = setInterval(() => {
      setReactions(prev => prev.filter(r => {
        const age = Date.now() - parseInt(r.id.split('.')[0])
        return age < 7000 // Keep reactions for 7 seconds
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900 to-black touch-none overflow-hidden">
      {/* Reaction Display Area - Now covers full screen */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {reactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              className="absolute"
              style={{
                left: `${reaction.x}%`,
                fontSize: '80px',
                bottom: '100px', // Start above the button panel
                pointerEvents: 'none',
              }}
              initial={{ 
                y: 0,
                opacity: 1,
                scale: 0.5,
              }}
              animate={{ 
                y: '-110vh',
                opacity: [1, 1, 1, 1, 0.8, 0.3, 0],
                scale: [0.5, 1, 1, 1, 1, 0.9, 0.8],
              }}
              exit={{ 
                opacity: 0
              }}
              transition={{ 
                duration: 7,
                ease: "linear",
                y: {
                  duration: 7,
                  ease: "linear"
                },
                opacity: {
                  times: [0, 0.3, 0.6, 0.85, 0.92, 0.97, 1],
                  ease: "linear"
                },
                scale: {
                  times: [0, 0.15, 0.4, 0.85, 0.92, 0.97, 1],
                }
              }}
            >
              <motion.div
                animate={{
                  x: [0, -15, 15, -10, 10, -5, 5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  filter: reaction.isLocal ? 'none' : 'hue-rotate(15deg)',
                }}
              >
                {reaction.emoji}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Reaction Buttons - Now positioned absolutely at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-gray-800 p-3 safe-bottom pointer-events-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {EMOJIS.map((emoji) => (
              <motion.button
                key={emoji}
                onClick={() => addReaction(emoji)}
                className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center text-2xl sm:text-3xl 
                         bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-lg sm:rounded-xl transition-all
                         border border-gray-700 hover:border-gray-600 touch-manipulation select-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 