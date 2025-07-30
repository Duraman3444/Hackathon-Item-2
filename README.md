# Reaction Panel

A real-time reaction panel app with animated emoji reactions, similar to Twitch or iMessage reactions. Supports multiple simultaneous users!

## Features

- 🎯 Click reaction buttons to display animated emojis
- 🎨 Beautiful steam-like animations that rise to the top of the screen
- 📱 Fully responsive design with mobile zoom prevention
- 👥 **Multi-user support** - See reactions from all connected users in real-time
- 🚀 Ready for Vercel deployment
- ♾️ Infinite button clicks allowed
- ⚖️ Balanced set of 10 emojis for diverse reactions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the reaction panel.

## Multi-User Feature

The app automatically syncs reactions between all connected users:
- Your reactions appear instantly (no lag)
- Other users' reactions appear with a slight hue shift to distinguish them
- Polling every 500ms ensures smooth real-time updates
- Works seamlessly when deployed to Vercel

## Deployment on Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and deploy

### Option 3: Deploy without Git

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload this folder directly
4. Vercel will handle the build and deployment

## How It Works

- **Top Section**: Displays animated reactions that float upward like steam
- **Bottom Section**: Grid of emoji buttons to click
- **Animations**: Each reaction rises to the very top of the screen with a gradual fade
- **Multi-User**: API route syncs reactions between all connected clients
- **Mobile Optimized**: Prevents accidental zooming while spamming reactions

## Available Emojis

### Positive Reactions
👍 ❤️ 🔥 🤯 💀

### Negative Reactions
👎 💔 😭 🤮 🗑️

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- API Routes (for multi-user sync) 