# USA Core - Web Platform

USA Core is the official web platform and frontend interface for the USA Core Discord Bot, tailored specifically for GTA SA-MP communities. This repository contains the source code for the landing page, real-time status dashboard, and technical documentation.

## Project Overview

The website serves three main purposes:
1. **Marketing & Landing Page**: Introduces the bot's capabilities (A.E.G.I.S Automod, Lua Malware Scanner, Boombox, RTM Marketplace) with a modern, highly interactive UI.
2. **Real-time Status Dashboard**: Displays live metrics of the bot (uptime, latency, server count, active members) synchronized via Supabase.
3. **Documentation**: Comprehensive technical guides and commands reference powered by Fumadocs.

## Tech Stack

This project is built with a modern frontend stack focusing on performance and user experience:

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: Vanilla CSS & [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://framer.com/motion)
- **Database / Real-time**: [Supabase](https://supabase.com/)
- **Documentation Engine**: [Fumadocs](https://fumadocs.vercel.app/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)

## Architecture Highlights

- **React Server Components (RSC)**: Utilized for initial data fetching (e.g., the Status page) to eliminate loading states and ensure optimal SEO.
- **Client-Side Hydration**: Supabase Realtime subscriptions take over after the initial server render to keep data synchronized without page reloads.
- **Global Error Handling**: Custom, branded error boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`) to handle system failures gracefully.
- **Hardware-Accelerated Animations**: Scroll and interaction animations are optimized using CSS GPU acceleration (`will-change`, `translate3d`).

## Local Development Setup

### Prerequisites
- Node.js (v20 or higher recommended)
- npm, pnpm, or yarn

### Environment Variables
Create a `.env.local` file in the root directory and configure the following variables for the status dashboard to function:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation & Execution

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Configuration

Brand identity, links, and SEO metadata are centralized. To modify the website's branding, edit the `brand.config.ts` file located in the root directory. This acts as the single source of truth for the entire application.

## Author & Maintainer
Developed and maintained by Raihan.
For support, visit the [USA Core Support Server](https://discord.gg/CnHuMnpKkV).
