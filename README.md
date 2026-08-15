# 🌌 Procedural Day-Night Skybox Wallpaper

A real-time, zero-dependency interactive desktop wallpaper built using pure HTML5, CSS3, and vanilla JavaScript. The skybox calculates atmospheric color transitions and solar/lunar parabolic arcs according to local system time, accompanied by multi-timezone clock widgets with dynamic drag-and-drop placement.

---

## ✨ Features

- **Procedural Day/Night Skybox**: Dynamic gradients reflecting dawn, noon, sunset, and night stages with parabolic sun/moon trajectory calculations.
- **Dynamic Starfield & Cloud Drift**: Procedural star opacity toggling during nighttime hours with continuous CSS-animated cloud layers.
- **Multi-Timezone Support**: Instantiate world clocks across various global regions (UTC, London, New York, Tokyo, Dubai, IST, etc.).
- **Dynamic Drag-and-Drop**: Reposition any clock card anywhere across the screen. Layout coordinates and configurations automatically persist in `localStorage`.
- **12-Hour / 24-Hour Switcher**: One-click format toggling via the floating settings panel.
- **100% Offline Compatible**: Uses zero external CDN dependencies, libraries, or network APIs.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic layout and dynamic widget container structure.
- **CSS3**: Backdrop blur (`backdrop-filter`), CSS radial gradients, keyframe drift animations, and responsive flexbox/grid.
- **JavaScript (Vanilla ES6)**: Pointer capture drag APIs, `Intl.DateTimeFormat` timezone handling, parabolic arc math, and `localStorage` persistence.

---

## 🚀 Installation & Setup

### 1. File Structure
Ensure the repository files are kept in the same root folder:
```text
SkyboxWallpaper/
├── index.html
├── style.css
└── script.js
