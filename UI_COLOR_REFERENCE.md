# ProfitHub UI Color & Component Reference

## 🎨 Brand Color Palette

### Primary Colors (Main Theme)
```
┌─────────────────────────────────────────────────────────┐
│ INDIGO-PURPLE                                           │
│ oklch(0.6 0.2 250) | #3B82F6 (approx) | RGB(59,130,246) │
│ Usage: Active states, primary buttons, main branding    │
│ Glow Effect: rgba(99,102,241, 0.4-0.6)                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ DEEP PURPLE (Accent)                                    │
│ oklch(0.6 0.2 300) | #A855F7 (approx) | RGB(168,85,247)│
│ Usage: Interactive elements, highlights, hovers         │
│ Glow Effect: rgba(168,85,247, 0.3-0.5)                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ SOFT GOLD (Secondary)                                   │
│ oklch(0.7 0.15 70) | #FACC15 (approx) | RGB(250,204,21) │
│ Usage: Warnings, highlights, premium features           │
│ Glow Effect: rgba(250,204,21, 0.3-0.5)                 │
└─────────────────────────────────────────────────────────┘
```

### Background Colors
```
┌─────────────────────────────────────────────────────────┐
│ DEEP MIDNIGHT (Background)                              │
│ oklch(0.05 0.01 240) | #050505 | RGB(5,5,10)            │
│ Usage: Page background, dark surfaces                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ SEMI-TRANSPARENT CARD                                   │
│ oklch(0.1 0.02 240) | rgba(15,22,41, 0.8)               │
│ Usage: Cards, modals, panels                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ WHITE (Foreground)                                      │
│ oklch(0.98 0 0) | #F0F4F8 | RGB(240,244,248)            │
│ Usage: Text, main content                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Component Color Assignments

### Loading Screen - Step Colors

```
STEP 1: Establishing Secure Link
├─ Icon Gradient: from-indigo-500 to-indigo-600
├─ Glow Color: Indigo @ 20% opacity
└─ Loading Bar: Indigo gradient

STEP 2: Calibrating Market Feeds
├─ Icon Gradient: from-amber-500 to-amber-600
├─ Glow Color: Amber @ 20% opacity
└─ Loading Bar: Amber gradient

STEP 3: Quantum Analysis Engaged
├─ Icon Gradient: from-purple-500 to-purple-600
├─ Glow Color: Purple @ 20% opacity
└─ Loading Bar: Purple gradient

STEP 4: Verifying Authentication
├─ Icon Gradient: from-indigo-400 to-indigo-500
├─ Glow Color: Indigo @ 20% opacity
└─ Loading Bar: Indigo gradient

STEP 5: Launching Interface
├─ Icon Gradient: from-amber-400 to-amber-500
├─ Glow Color: Amber @ 20% opacity
└─ Loading Bar: Amber gradient
```

### Header Elements

```
ACTIVE TAB BUTTON
├─ Background: gradient-to-r from-indigo-600 to-purple-600
├─ Text Color: white
├─ Shadow: shadow-[0_0_20px_rgba(99,102,241,0.4)]
├─ Hover Shadow: shadow-[0_0_30px_rgba(99,102,241,0.6)]
└─ Scale Transform: hover:scale-105 | active:scale-95

INACTIVE TAB BUTTON (Dark Mode)
├─ Background: bg-slate-800/50
├─ Border: border-slate-700/50
├─ Text Color: text-slate-300
├─ Hover: bg-slate-700/50, border-indigo-500/30
└─ Text On Hover: text-white

HEADER CONTAINER
├─ Background: bg-[#0a0a0a]/95
├─ Backdrop: backdrop-blur-xl
├─ Border: border-white/8
└─ Transition: duration-300
```

### Loading Ring Animation

```
ANIMATED GRADIENT RING
├─ Colors: Indigo (50%) → Purple (25%) → Gold (25%)
├─ Animation: rotate-360 over 2 seconds
├─ Direction: Linear rotation
└─ Effect: Hypnotic, premium feel

LOGO CENTER
├─ Filter: drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]
├─ Animation: animate-pulse
└─ Size: w-10 h-10 (sm: w-12 h-12)
```

---

## 📊 Tab Categories & Colors

### Dashboard & Core Trading
```
┌─────────────────────────────────────────┐
│ Color: Indigo-Purple                    │
│ Tabs: Dashboard, Smart Analysis         │
│        Smart Adaptive, SmartAuto24       │
└─────────────────────────────────────────┘
```

### Automated Systems
```
┌─────────────────────────────────────────┐
│ Color: Purple with Indigo accent        │
│ Tabs: Auto Bot, Automated               │
└─────────────────────────────────────────┘
```

### Signal Systems
```
┌─────────────────────────────────────────┐
│ Color: Indigo-Purple with Gold hints    │
│ Tabs: Signals, Pro Signals              │
│        Super Signals, Advanced Signals   │
└─────────────────────────────────────────┘
```

### Analysis Tools
```
┌─────────────────────────────────────────┐
│ Color: Gold with Purple accents         │
│ Tabs: Even/Odd, Over/Under              │
│        Matches, Differs, AI Analysis     │
└─────────────────────────────────────────┘
```

### Documentation
```
┌─────────────────────────────────────────┐
│ Color: Light Indigo                     │
│ Tabs: Tools Info                        │
└─────────────────────────────────────────┘
```

---

## 🌈 Gradient Combinations

### Primary Gradient (Most Used)
```css
background: linear-gradient(135deg, 
  from-indigo-600 
  via-purple-600 
  to-amber-500);

/* Alternative shorthand */
bg-gradient-to-r from-indigo-600 to-purple-600
```

### Progress Bar Gradient
```css
background: linear-gradient(90deg,
  from-indigo-600 
  via-purple-600 
  to-amber-500);
```

### Hover/Active Gradient
```css
background: linear-gradient(145deg,
  from-indigo-500 
  to-purple-600);
```

### Text Gradient
```css
background: linear-gradient(135deg,
  from-indigo-500 
  via-purple-500 
  to-amber-500);
  
clip-path: text;
/* OR */
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## ✨ Glow Effects & Shadows

### Primary Glow (Indigo)
```css
box-shadow: 0 0 20px rgba(99, 102, 241, 0.4),
            inset 0 0 15px rgba(99, 102, 241, 0.05);
```

### Enhanced Glow (Hover)
```css
box-shadow: 0 0 30px rgba(99, 102, 241, 0.6),
            inset 0 0 25px rgba(99, 102, 241, 0.1);
```

### Purple Glow (Accent)
```css
box-shadow: 0 0 25px rgba(168, 85, 247, 0.3);
```

### Gold Glow (Warning/Info)
```css
box-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
```

### Drop Shadow Glow
```css
filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.4));
```

---

## 🎬 Animation Timing

### Smooth Transitions
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);  /* Fast */
transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);  /* Base */
transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);  /* Slow */
```

### Loading Bar Animation
```css
@keyframes loading-bar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

animation: loading-bar 1.5s infinite;
```

### Pulse Animation
```css
animation: pulse 2s ease-in-out infinite;
```

### Rotation Animation
```css
animation: rotate-360 2s linear infinite;
```

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
```
Text sizes: text-xs, text-sm
Icon sizes: h-4 w-4, h-6 w-6
Padding: p-3, px-4
```

### Tablet (640px - 1024px)
```
Text sizes: text-sm, text-base
Icon sizes: h-5 w-5, h-6 w-6
Padding: p-4, px-6
```

### Desktop (> 1024px)
```
Text sizes: text-base, text-lg
Icon sizes: h-6 w-6, h-8 w-8
Padding: p-6, px-8
```

---

## 🚀 Implementation Quick Copy

### Active Button
```jsx
className="bg-gradient-to-r from-indigo-600 to-purple-600 
           text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] 
           hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] 
           hover:scale-105 active:scale-95 
           transition-all duration-200"
```

### Loading Card
```jsx
className="bg-gradient-to-br from-slate-800 to-slate-900 
           border-indigo-500/60 
           shadow-[0_0_40px_rgba(99,102,241,0.25)] 
           rounded-2xl transition-all duration-500"
```

### Glow Text
```jsx
className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 
           bg-clip-text text-transparent"
```

### Header
```jsx
className="bg-[#0a0a0a]/95 backdrop-blur-xl 
           border-white/8 transition-all duration-300"
```

---

## 🎨 Figma/Design Export

### Color Tokens (CSS Variables)
```css
--primary: oklch(0.6 0.2 250);    /* Indigo-Purple */
--secondary: oklch(0.7 0.15 70);  /* Soft Gold */
--accent: oklch(0.6 0.2 300);     /* Deep Purple */
--background: oklch(0.05 0.01 240); /* Deep Midnight */
--foreground: oklch(0.98 0 0);    /* White */
```

### Tailwind Config (if needed)
```javascript
theme: {
  colors: {
    primary: 'oklch(0.6 0.2 250)',
    secondary: 'oklch(0.7 0.15 70)',
    accent: 'oklch(0.6 0.2 300)',
    background: 'oklch(0.05 0.01 240)',
  }
}
```

---

**Last Updated:** 2026-04-20
**Version:** 1.0
**Status:** Complete Reference Guide
