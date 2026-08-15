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
```
## How to turn the wallpaper lively

Lively Wallpaper (Windows - Free & Open Source)
Open Lively Wallpaper.

Click the + (Add Wallpaper) button in the top right.

Drag and drop the index.html file into the application window (or browse to it).

Set title/metadata and click OK.

Select the tile to apply it as your active background.

Wallpaper Engine (Windows / Steam)
Open Wallpaper Engine.

Click Open Wallpaper (bottom-left) ➔ Open Offline Wallpaper.

Select index.html and click Apply.

macOS (WebViewScreenSaver / Plucka)
Configure your WebKit wallpaper runner.

Direct the URL source to your local path: file:///Users/username/path/to/SkyboxWallpaper/index.html.

⚙️ Usage Controls
Click the ⚙ (Gear) icon in the bottom-right corner to open the HUD controls.

Toggle between 12-Hour and 24-Hour modes.

Select a region from the dropdown and click + Add Clock to generate a new widget.

Drag any clock by clicking and holding the card body.

Click ✕ on any secondary clock card to remove it.

Click Reset Clock Positions to restore the default single-clock layout.
