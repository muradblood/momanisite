<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Momeni & Hyasat Hub

### 🚀 A Professional Dashboard for Marketing & Programming Services

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=flat&logo=google)](https://ai.google.dev/)

</div>

---

## 📋 Overview

**Momeni & Hyasat Hub** (مؤسسة المومني والحياصات) is a comprehensive web application showcasing digital marketing and programming services. The platform features AI-powered tools including logo generation, text-to-speech conversion, and location-based booking services, all powered by Google's Gemini AI.

### 🎯 Key Features

- 🏠 **Professional Landing Page** - Comprehensive showcase of services, portfolio, and FAQ section
- 📅 **Booking Calendar** - Interactive appointment scheduling system with real-time availability
- 🎤 **Voice Generator Studio** - AI-powered text-to-speech conversion using Gemini 2.5 with multiple voice options
- 🎨 **AI Logo Creator** - Generate professional logos using Imagen 4.0 (component available)
- 📍 **Location Assistant** - Intelligent map-based chat assistant (component available)

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 6.2.0
- **AI Services:** Google Gemini AI (@google/genai v1.30.0)
  - Gemini 2.5 Flash Preview (Text-to-Speech)
  - Imagen 4.0 (Image Generation)
  - Gemini 3 Pro (Map Integration)
- **UI Components:** Lucide React Icons
- **Styling:** TailwindCSS (via inline styles)
- **Markdown Rendering:** react-markdown

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)

### 1. Clone the Repository

```bash
git clone https://github.com/muradblood/momanisite.git
cd momanisite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
API_KEY=your_gemini_api_key_here
```

> **Note:** You can obtain a Gemini API key from [Google AI Studio](https://ai.google.dev/). The key is required for all AI-powered features.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 5. Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### 6. Preview Production Build

```bash
npm run preview
```

---

## 🎨 Features Documentation

### 1. Home Page (الرئيسية)

The landing page includes:

- **Hero Section** with animated background and call-to-action
- **About Section** - Vision, mission, and values
- **Services Showcase** - 10+ marketing and programming services
- **Portfolio Gallery** - 6 featured projects with categories
- **Web Development Section** - Specialized web services
- **FAQ Section** - Common questions about services
- **Contact Footer** - Company information and quick links

**Key Services Highlighted:**
- Digital Campaign Management
- Brand Identity Design
- Content Creation
- AI-Powered Marketing Solutions
- Web & Mobile App Development
- E-commerce Solutions

### 2. Booking Calendar (حجز موعد)

Interactive appointment scheduling system with:

- **Calendar Grid View** - Monthly calendar navigation
- **Date Selection** - Visual indication of available, booked, and current dates
- **Time Slots** - Multiple available time slots per day
- **Booking Confirmation** - Real-time booking status with summary
- **Responsive Design** - Works seamlessly on mobile and desktop

**Usage:**
1. Select an available date from the calendar
2. Choose a preferred time slot
3. Click "تأكيد الحجز" (Confirm Booking)
4. View booking summary and confirmation

### 3. Voice Generator Studio (ستوديو الصوت)

AI-powered text-to-speech conversion using Gemini 2.5:

**Features:**
- **Multiple Voice Options:** 5 different voices (male and female)
  - Puck (صوت هادئ) - Male
  - Charon (صوت عميق) - Male
  - Kore (صوت دافئ) - Female
  - Fenrir (صوت قوي) - Male
  - Zephyr (صوت ناعم) - Female
- **Real-time Audio Playback** - Instant preview of generated speech
- **Audio Visualization** - Animated sound waves during playback
- **Custom Text Input** - Support for Arabic and multilingual text

**Usage:**
1. Enter your text in the text area (supports Arabic)
2. Select a voice personality
3. Click "توليد الصوت" (Generate Voice)
4. Play, pause, or regenerate the audio

**Technical Details:**
- Sample Rate: 24kHz
- Audio Format: PCM (raw)
- Processing: Client-side audio buffer decoding
- API: Gemini 2.5 Flash Preview TTS

---

## 🗂️ Project Structure

```
momanisite/
├── components/
│   ├── Home.tsx                 # Main landing page
│   ├── BookingCalendar.tsx     # Appointment booking system
│   ├── VoiceGenerator.tsx      # AI text-to-speech interface
│   ├── LogoCreator.tsx         # AI logo generation (available)
│   └── LocationAssistant.tsx   # Map-based chat assistant (available)
├── services/
│   └── geminiService.ts        # Gemini AI service integration
├── App.tsx                     # Main application component
├── index.tsx                   # Application entry point
├── types.ts                    # TypeScript type definitions
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

---

## 🔧 Configuration

### TypeScript Configuration

The project uses TypeScript 5.8.2 with strict mode enabled. Configuration is in `tsconfig.json`.

### Vite Configuration

Build tool settings are in `vite.config.ts`, including:
- React plugin with Fast Refresh
- Port configuration
- Build optimizations

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Gemini API key for AI features | Yes |

---

## 🌐 API Integration

### Gemini AI Services

The application integrates with multiple Gemini AI models:

1. **Text-to-Speech (TTS)**
   - Model: `gemini-2.5-flash-preview-tts`
   - Features: Multiple voices, natural Arabic speech
   - Usage: Voice Generator component

2. **Image Generation**
   - Model: `imagen-4.0-generate-001`
   - Features: Professional logo creation
   - Usage: Logo Creator component (available in codebase)

3. **Map Integration**
   - Model: `gemini-3-pro-preview`
   - Features: Location-based queries with Google Maps
   - Usage: Location Assistant component (available in codebase)

---

## 🚀 Deployment

### Build the Application

```bash
npm run build
```

### Deploy to Hosting Service

The `dist` folder can be deployed to any static hosting service:

- **Vercel:** `vercel deploy`
- **Netlify:** Drag and drop the `dist` folder
- **GitHub Pages:** Configure GitHub Actions workflow
- **Firebase Hosting:** `firebase deploy`

### Environment Variables in Production

Ensure your hosting platform has the `API_KEY` environment variable configured.

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** "API Key not found" error
- **Solution:** Ensure `.env.local` file exists with `API_KEY=your_key`
- Restart the dev server after adding environment variables

**Issue:** Voice Generator audio doesn't play
- **Solution:** Check browser autoplay policies, user interaction may be required
- Ensure your browser supports Web Audio API

**Issue:** Build fails with TypeScript errors
- **Solution:** Run `npm install` to ensure all dependencies are installed
- Check TypeScript version compatibility

**Issue:** Gemini API rate limiting
- **Solution:** Implement request throttling or upgrade API tier
- Check your API quota in Google AI Studio

---

## 📱 Browser Support

- Chrome/Edge (v90+) ✅
- Firefox (v88+) ✅
- Safari (v14+) ✅
- Mobile browsers ✅

**Note:** Web Audio API required for Voice Generator feature.

---

## 🤝 Contributing

This is a private project for Momeni & Hyasat Foundation. For inquiries, please contact the development team.

---

## 📄 License

Copyright © 2025 Momeni & Hyasat Foundation. All rights reserved.

---

## 📞 Contact

- **Website:** [View Live Application](https://ai.studio/apps/drive/1u0XU7TOJO4z3jaG_L3NWw6WCGZ8Oz3XL)
- **Location:** Amman, Jordan
- **Email:** info@momenihyasat.com
- **Phone:** +962 79 000 0000

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Gemini AI**

[🌟 View Demo](https://ai.studio/apps/drive/1u0XU7TOJO4z3jaG_L3NWw6WCGZ8Oz3XL)

</div>
