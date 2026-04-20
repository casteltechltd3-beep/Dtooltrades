# Expertool - Complete Documentation

## Overview
Expertool is a professional AI-powered trading platform built with Next.js, featuring real-time Deriv market integration, automated trading bots, and advanced market analysis tools.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Color System](#color-system)
5. [Components](#components)
6. [Configuration](#configuration)

## Quick Start

### Installation
```bash
npm install
npm run dev
```

### Accessing the Application
- Main App: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Account: http://localhost:3000/account

## Architecture

### Directory Structure
```
expertool/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main trading dashboard
│   ├── layout.tsx         # Root layout
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   └── account/           # User account pages
├── components/            # Reusable React components
│   ├── tabs/              # Trading tabs
│   ├── charts/            # Chart components
│   ├── admin/             # Admin components
│   └── ui/                # UI components
├── lib/                   # Utility functions
├── types/                 # TypeScript types
├── hooks/                 # Custom React hooks
├── styles/                # Global styles
└── public/                # Static assets
```

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Trading API**: Deriv WebSocket API
- **Charts**: Recharts
- **State Management**: React Hooks + SWR
- **Authentication**: Custom session-based auth
- **Database**: Supabase (optional)

## Features

### Trading Features
1. **DTrader Integration** - Direct Deriv trading platform
2. **SmartTrader** - Simplified trading interface
3. **Copy Trading** - Clone successful traders
4. **SmartAuto24** - 24/7 automated trading bot
5. **AutoBot** - Customizable trading bot
6. **Advanced Signals** - AI-powered trade signals
7. **Market Analysis** - Real-time charting and analysis

### Analysis Tools
- Even/Odd digit prediction
- Over/Under price direction
- Pattern matching analysis
- AI-powered market analysis
- Live market feeds

### Admin Features
- User management dashboard
- Trading console
- Real-time analytics
- Transaction monitoring
- Message system
- Account management

## Color System (Premium Heritage Theme)

### Primary Colors
```
Indigo-Purple:  oklch(0.6 0.2 250)   #6366F1
Deep Purple:    oklch(0.6 0.2 300)   #A855F7
Soft Gold:      oklch(0.7 0.15 70)   #FB923C
```

### Background & Surface
```
Deep Midnight:  oklch(0.05 0.01 240) #050505
Slate Dark:     oklch(0.1 0.02 240)  #0F1419
White:          oklch(0.98 0 0)      #F8FAFC
```

### Usage
- **Primary (Indigo)**: Main brand, active states, CTAs
- **Accent (Purple)**: Interactive elements, highlights
- **Gold**: Secondary accents, premium features
- **Neutrals**: Backgrounds, text, borders

## Components

### Loading Screen
- Card initialization animation (1.35 seconds)
- 5-step system initialization
- Progress bar with Deriv branding
- Responsive design (mobile & desktop)

### Header (DerivHeader)
- 3 Deriv trading platforms (DTrader, SmartTrader, Copy Trading)
- Symbol selector dropdown (8 popular markets)
- Real-time market data display
- Premium gradient styling

### Main Tabs
1. **Dashboard** - Trading overview
2. **Smart Analysis** - AI market insights
3. **SmartAuto24** - Automated 24/7 bot
4. **AutoBot** - Manual bot configuration
5. **Signals** - Trading signal generation
6. **AI Analysis** - Machine learning predictions
7. **Tools Info** - Documentation

## Configuration

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_DERIV_APP_ID=your_app_id
DERIV_APP_SECRET=your_app_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Deriv API Setup
1. Register at https://deriv.com
2. Create an API token
3. Add to environment variables
4. Configure webhook endpoints

## Styling Guide

### Button States
```tsx
// Active/Primary
className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"

// Hover
className="hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"

// Disabled
className="opacity-50 cursor-not-allowed"
```

### Card Styling
```tsx
// Premium Card
className="bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30"

// With Glow
className="shadow-[0_0_20px_rgba(99,102,241,0.2)]"
```

## Development

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

### Code Style
- ESLint configured
- TypeScript strict mode
- Prettier formatting
- No console logs in production

## Performance Optimizations

1. **Code Splitting** - Route-based lazy loading
2. **Image Optimization** - Next.js Image component
3. **Caching** - SWR with stale-while-revalidate
4. **CSS** - Tailwind purging
5. **API** - Debounced requests

## Security

- HTTPS required for production
- CORS configured for Deriv API
- Session-based authentication
- Rate limiting on API routes
- Input validation on all forms
- CSRF protection enabled

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## Support & Resources

- Deriv API Docs: https://api.deriv.com
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Issue Tracking: [GitHub Issues]

## License
MIT License - See LICENSE file for details

---

**Last Updated**: 2026-04-20
**Version**: 2.0 (Expertool)
**Branding**: Powered by Deriv
