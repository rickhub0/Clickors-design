# Clickors Design

Clickors Design is a premium, high-performance web application tailored for an AI-powered web design agency. Features a stunning deep dark aesthetic with meticulous "liquid glass" elements, fluid Framer Motion animations, and cinematic HLS video backgrounds.

## Features

- **Luxury Liquid-Glass Aesthetics**: Complex CSS styling combining luminosity blending, strong backdrops, and gradient masks for an ultra-premium glassmorphism feel.
- **Cinematic Experience**: Integration of HLS (`.m3u8`) and MP4 video backgrounds acting seamlessly in tandem with UI components.
- **Micro-Animations**: Extensive use of `framer-motion` for advanced word-by-word reveal effects (`BlurText`) and staggered entry animations.
- **Complete SaaS Structure**: Fully functioning dummy routing structure for standard public pages (`/services`, `/pricing`, `/work`, etc).
- **Authentication & Dashboard**: Built-in state-managed protected routing handling user Login and Sign Up via `/login` and `/signup`.
- **Project Management**: Internal dashboard with fully operational frontend CRUD (Create, Read, Update, Delete) mimicking a real project platform.

## Tech Stack

This project is built using:
- [React (Vite Base)](https://vitejs.dev/) - Lightning-fast frontend tooling.
- [Tailwind CSS (v3)](https://v3.tailwindcss.com/) - Utility-first styling including custom colors and base tokens.
- [Framer Motion](https://www.framer.com/motion/) - Declarative React animations.
- [React Router DOM](https://reactrouter.com/) - Client-side page navigation routing.
- [HLS.js](https://github.com/video-dev/hls.js/) - Smooth fallback streaming integration for large background videos.
- [Lucide React](https://lucide.dev/) - Beautifully clean and crisp SVG icons.

## Getting Started

Follow the instructions below to get the project running locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Navigate to the directory**:
   ```bash
   cd clickors-design
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Visit the local app**:
   Open a browser and navigate to the URL provided in your console (usually `http://localhost:5173/`).

## Project Structure

```text
clickors-design/
├── src/
│   ├── components/
│   │   ├── layout/       <-- Navigation, Wrappers
│   │   ├── sections/     <-- Modular Landing Page Blocks
│   │   └── ui/           <-- Reusable Elements (BlurText, HlsVideo)
│   ├── hooks/            <-- Custom React Hooks (useAuth)
│   ├── pages/            <-- Main Routed Pages (App, Auth, Dashboard, etc.)
│   ├── index.css         <-- Core CSS Utilities & Themes
│   ├── App.tsx           <-- Router Setup and Configuration
│   └── main.tsx
├── tailwind.config.js    <-- Design Tokens and Variables
└── package.json
```

## Contributing / Next Steps

- The authentication is currently managed inside a frontend `React Context`. It can seamlessly be swapped with a real Backend-as-a-Service system (such as Supabase or Firebase).
- Implement persistent client data hooks (like React Query or SWR) when a backend is attached.
