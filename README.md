# Aurangzeb Sunny Portfolio — High-End Developer Experience

A premium, interactive developer portfolio and lead conversion system built for **Aurangzeb Sunny**. This project features a unique "Dual Experience" architecture, allowing users to switch between a high-performance visual interface and an immersive developer-centric terminal experience.

---

## 🚀 Key Features

### 1. Dual Mode Interface
- **Code Mode (Developer Experience)**: A terminal-inspired interface with boot sequences, system logs, and a command-palette-driven navigation.
- **Normal Mode (Visual Experience)**: A sleek, modern, glassmorphic UI with vibrant colors and smooth transitions for non-technical stakeholders.

### 2. Interactive System Architecture Visualizer
- Explore real-world engineering decisions through interactive diagrams.
- Displays stack details, architecture layers (Frontend, API, Cache, Database), and engineering challenges solved for each project.

### 3. Smart Project Estimator
- An interactive tool for potential clients to calculate project costs in real-time.
- Features selectable project types, granular feature add-ons, and timeline adjustments to provide instant budget ranges.

### 4. Performance & Metrics Dashboard
- Real-time visualization of developer skills and system status.
- Implements `Recharts` for high-fidelity data representation of uptime, latency, and productivity metrics.

### 5. Immersive UI Elements
- **Boot Sequence**: A terminal-style loading sequence that sets the tone for the developer experience.
- **Command Palette**: `Ctrl/Cmd + K` interface for rapid navigation and system commands.
- **Architecture Visualizer**: Deep-dives into project structures with connection-line animations.
- **Skill Modules**: Interactive hexagonal grid or list-based skill visualizations.

---

## 🛠 Tech Stack

### Frontend Core
- **React 18**: Component-based architecture.
- **Vite 6**: Ultra-fast build tool and development server.
- **React Router 7**: Sophisticated routing for application state.

### Styling & Animation
- **Tailwind CSS 4**: Modern, utility-first styling with the latest engine.
- **Framer Motion**: Complex physics-based animations and layout transitions.
- **Lucide React**: Clean, consistent iconography.
- **Radix UI**: Accessible, unstyled primitives for complex components (Dialogs, Tabs, etc.).

### Data Visualization
- **Recharts**: Responsive chart components for performance metrics.

---

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository
# (Assuming the repo is cloned already)

# Install dependencies
npm install
```

### Development
```bash
# Start the development server
npm run dev
```

### Building for Production
```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

---

## 📂 Project Structure

- `src/app/components/`: Core UI components including `ArchitectureVisualizer`, `ProjectEstimator`, and `BootSequence`.
- `src/app/pages/`: Main page layouts for both Code and Normal modes.
- `src/app/data/`: Centralized data for projects, skills, and timeline.
- `public/favicon/`: Full suite of branding assets and web manifests.

---

## 🎨 Design Philosophy

This portfolio is designed to **WOW** at first glance. It prioritizes:
- **Rich Aesthetics**: Vibrant gradients, dark mode by default, and high-quality glassmorphism.
- **Interactive Feedback**: Micro-animations on every hover and click.
- **Developer Brand**: Transparent display of engineering depth through the Architecture Visualizer.

---

Generated with ❤️ for Aurangzeb Sunny. Original design based on [Figma](https://www.figma.com/design/cYrLssKSHOi4vUcZpefJMy/Aurangzeb-Sunny-Portfolio).