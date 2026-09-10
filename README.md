# SST - Corporate Website

A premium corporate website for SST built with modern web technologies, featuring rich 3D graphics and high-performance scroll animations.

## Overview

The SST website showcases the company's services, industries, turnkey projects, and clients with a dynamic, immersive user experience. It leverages React, Vite, and TypeScript as the core foundation, enriched by WebGL 3D elements and GSAP-powered scrolling effects.

## Technology Stack

- **Framework**: React 19 / DOM
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: `react-router-dom` v7
- **Animations**: GSAP (GreenSock) for high-performance scroll triggers and timeline animations
- **3D Graphics & Canvas**: 
  - `three` (Three.js core)
  - `@react-three/fiber` (React renderer for Three.js)
  - `@react-three/drei` (Useful helpers and abstractions for R3F)
  - `@react-three/postprocessing` (For glow, bloom, and post-processing effects)
- **Styling**: Vanilla CSS (Modular stylesheets scoped by naming conventions, heavily utilizing CSS Variables and CSS Grid/Flexbox)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository and navigate into the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── common/          # Buttons, Headings, Background canvases, Loaders
│   ├── layout/          # Global layout wrappers (Header, Footer)
│   ├── sections/        # Distinct sections of the Home page (Hero, About, Clients, etc.)
│   ├── three/           # React Three Fiber 3D components (Globes, OrbitalObjects)
│   └── ui/              # Micro UI elements (Orbs)
├── context/             # React Context providers (ServiceContext)
├── data/                # Static data definitions (Clients, Services, Navigation, Industries)
├── layouts/             # Page layout wrappers (MainLayout)
├── pages/               # Top-level route components (Home, About, Services, etc.)
├── store/               # Global state management
├── styles/              # Component and page-specific CSS files
├── App.tsx              # Root component & Route definitions
└── main.tsx             # Application entry point
```

## Data Management

Data is predominantly handled via **Static Data Files** in the `src/data/` directory.

- `services.ts`: Defines all service offerings, their slugs, icons, features, and detailed copy.
- `clients.ts` & `industries.ts`: Define logos, names, and industry specifics.
- `navigation.ts`: Defines header/footer links.

Dynamic pages (like `/services/:slug`) query these static files to render their content.

## Styling & Animations

- **Styling Strategy**: No external utility frameworks are used. `global.css` and `index.css` define the root CSS variables ensuring a unified design system. Each component has an accompanying `.css` file using semantic class names.
- **GSAP Animations**: Scroll-driven animations (`ScrollTrigger`) and UI reveals (`fromTo` timelines) bring the DOM elements to life smoothly and efficiently.
- **React Three Fiber**: 3D elements like the `InfrastructureGlobe` and `OrbitalObjects` act as visual centerpieces. They are fully interactive and feature post-processing bloom effects.
