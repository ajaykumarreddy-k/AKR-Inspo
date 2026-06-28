# AKR-Inspo Component Library 🚀

Welcome to the **AKR-Inspo Component Library**! This repository is a comprehensive, modern, and highly interactive collection of UI components, complex animations, 3D elements, page templates, and entire full-stack site templates. It is designed to be a sandbox and an inspiration hub for modern web development.

---

## 🌟 Overview

AKR-Inspo is built to push the boundaries of modern frontend development, featuring pixel-perfect replications of high-end design patterns, interactive micro-interactions, and WebGL-powered 3D experiences. 

Whether you need a dynamic hero section, a seamless scroll-triggered animation, or an entire brutalist-style website template, this library has it all organized in a neat, multi-project architecture.

### ✨ Key Features

- **Framer & 21st Dev Components:** High-fidelity, smooth animations including Pixel Scroll, Runaround Text Wraps, WebGL Text Tunnels, and Scroll-Triggered Text Reveals.
- **3D & WebGL Animations:** Integrated Three.js and OGL configurations for stunning 3D visual effects.
- **Micro-Interactions:** Custom counting loaders, hover reveal effects, exploding inputs, and parallax image scrolls.
- **Page Templates & Full Sites:** Ready-to-use page layouts, brutalist footers, grid hovers, and full "Hermes Agent Clone" site experiences.
- **Pinterest-Style Inspiration Feed:** A global dashboard showcasing masonry grids, infinite scroll, and categorized component folders.

---

## 🛠️ Technology Stack

This project is built using a modern frontend ecosystem to ensure maximum performance and developer experience:

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://gsap.com/)
- **3D/WebGL:** [Three.js](https://threejs.org/) & [OGL](https://github.com/oframe/ogl)

---

## 📂 Project Structure

The repository is structured as a monorepo-style collection of independent frontend environments bundled together seamlessly by Vite:

```text
AKR-Inspo/
├── 3d text animations/             # Assorted 3D typography effects
├── Components-maintiles/           # Core UI components categorized by type
│   ├── Footers/
│   ├── Themes/
│   ├── Testimonials/
│   └── UI-Components/
├── Entire site/                    # Full-page templates and completed mock sites
├── Frammer&21st dev Components/    # Advanced interaction components & Framer clones
├── Scroll animations/              # Scroll-triggered effects & GSAP logic
├── src/                            # Global dashboard & Pinterest-style inspiration feed
├── scripts/                        # Build scripts for handling nested projects
└── vite.config.ts                  # Complex Vite config routing nested entry points
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ajaykumarreddy-k/AKR-Inspo.git
   cd AKR-Inspo
   ```

2. Install the dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```
   *This command runs a custom pre-build script that registers all nested projects before spinning up the Vite dev server at `http://localhost:3000`.*

### Building for Production

To create an optimized production build for all nested components:

```bash
bun run build
```
*(Note: Building requires significant memory due to the large number of nested projects. If you encounter OOM errors, the build script is configured with increased Node memory limit).*

---

## 🎨 Design Philosophy

- **Use Rich Aesthetics:** Focusing on vibrant colors, curated dark modes, glassmorphism, and dynamic animations to create stunning first impressions.
- **Dynamic Interactions:** Components feel responsive and alive with hover effects, custom cursors, and micro-animations.
- **Premium Feel:** Emphasizing smooth gradients, modern typography (Google Fonts), and seamless layout transitions.

---

## 👨‍💻 Author

Designed and Developed by **Ajay Kumar Reddy K**.

Feel free to explore, get inspired, and integrate these components into your own projects!