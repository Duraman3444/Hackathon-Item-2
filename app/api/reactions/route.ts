import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for reactions (in production, use Redis or a database)
const reactionStore: Array<{
  id: string
  emoji: string
  x: number
  timestamp: number
}> = []

// Clean up old reactions periodically
setInterval(() => {
  const now = Date.now()
  const cutoff = now - 10000 // Keep reactions for 10 seconds
  while (reactionStore.length > 0 && reactionStore[0].timestamp < cutoff) {
    reactionStore.shift()
  }
}, 1000)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const since = parseInt(searchParams.get('since') || '0')
  
  // Get reactions newer than the requested timestamp
  const newReactions = reactionStore.filter(r => r.timestamp > since)
  const timestamp = Date.now()
  
  return NextResponse.json({
    reactions: newReactions,
    timestamp
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { emoji, x } = body
    
    if (!emoji || typeof x !== 'number') {
      return NextResponse.json(
        { error: 'Invalid reaction data' },
        { status: 400 }
      )
    }
    
    const reaction = {
      id: Date.now().toString() + Math.random(),
      emoji,
      x,
      timestamp: Date.now()
    }
    
    reactionStore.push(reaction)
    
    // Keep only last 1000 reactions to prevent memory issues
    if (reactionStore.length > 1000) {
      reactionStore.splice(0, reactionStore.length - 1000)
    }
    
    return NextResponse.json({ success: true, reaction })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process reaction' },
      { status: 500 }
    )
  }
} 