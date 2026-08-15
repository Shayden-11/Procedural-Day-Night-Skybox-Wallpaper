// Default State Configuration
let config = {
    is24Hour: false,
    clocks: [
        { id: 'local-main', label: 'Local Time', timeZone: null, x: null, y: null }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
    initUI();
    renderClocks();
    
    // Main loop
    updateDisplay();
    setInterval(updateDisplay, 1000);
});

/* ================= Storage & State Management ================= */
function loadSettings() {
    const saved = localStorage.getItem("skybox_wallpaper_cfg");
    if (saved) {
        try {
            config = JSON.parse(saved);
        } catch(e) {
            console.error("Could not parse saved config", e);
        }
    }
}

function saveSettings() {
    localStorage.setItem("skybox_wallpaper_cfg", JSON.stringify(config));
}

/* ================= UI Control Panel Logic ================= */
function initUI() {
    const panel = document.getElementById("settings-panel");
    const toggleBtn = document.getElementById("settings-toggle");
    const btn12h = document.getElementById("btn-12h");
    const btn24h = document.getElementById("btn-24h");
    const addBtn = document.getElementById("add-clock-btn");
    const resetBtn = document.getElementById("reset-layout-btn");

    // Toggle Settings Flyout
    toggleBtn.addEventListener("click", () => {
        panel.classList.toggle("hidden");
    });

    // Format Switches
    btn12h.addEventListener("click", () => {
        config.is24Hour = false;
        btn12h.classList.add("active");
        btn24h.classList.remove("active");
        saveSettings();
        updateDisplay();
    });

    btn24h.addEventListener("click", () => {
        config.is24Hour = true;
        btn24h.classList.add("active");
        btn12h.classList.remove("active");
        saveSettings();
        updateDisplay();
    });

    if (config.is24Hour) {
        btn24h.classList.add("active");
        btn12h.classList.remove("active");
    }

    // Add Clock
    addBtn.addEventListener("click", () => {
        const select = document.getElementById("timezone-select");
        const tz = select.value;
        const label = select.options[select.selectedIndex].text.split(" (")[0];

        const newId = "clock-" + Date.now();
        config.clocks.push({
            id: newId,
            label: label,
            timeZone: tz,
            x: window.innerWidth / 2 - 130 + (Math.random() * 40 - 20),
            y: window.innerHeight / 2 - 50 + (Math.random() * 40 - 20)
        });

        saveSettings();
        renderClocks();
        updateDisplay();
    });

    // Reset Layout
    resetBtn.addEventListener("click", () => {
        config.clocks = [
            { id: 'local-main', label: 'Local Time', timeZone: null, x: null, y: null }
        ];
        saveSettings();
        renderClocks();
        updateDisplay();
    });
}

/* ================= Clock Rendering & Dragging ================= */
function renderClocks() {
    const container = document.getElementById("clocks-container");
    container.innerHTML = "";

    config.clocks.forEach(clock => {
        const card = document.createElement("div");
        card.className = "clock-card";
        card.id = clock.id;

        const isMain = clock.id === 'local-main';

        card.innerHTML = `
            <div class="card-header">
                <span class="region-label">${clock.label}</span>
                ${!isMain ? `<button class="remove-btn" onclick="removeClock('${clock.id}')">✕</button>` : ''}
            </div>
            <div class="time-display">00:00:00</div>
            <div class="date-display">Loading date...</div>
        `;

        container.appendChild(card);

        // Position Card
        if (clock.x !== null && clock.y !== null) {
            card.style.left = `${clock.x}px`;
            card.style.top = `${clock.y}px`;
        } else {
            // Default center placement for main clock
            card.style.left = `${(window.innerWidth - card.offsetWidth) / 2}px`;
            card.style.top = `${(window.innerHeight - card.offsetHeight) / 2}px`;
        }

        enableDrag(card, clock);
    });
}

function removeClock(id) {
    config.clocks = config.clocks.filter(c => c.id !== id);
    saveSettings();
    renderClocks();
}

function enableDrag(element, clockConfig) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener("pointerdown", (e) => {
        if (e.target.classList.contains("remove-btn")) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;

        element.setPointerCapture(e.pointerId);
    });

    element.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const newX = initialX + dx;
        const newY = initialY + dy;

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;

        clockConfig.x = newX;
        clockConfig.y = newY;
    });

    element.addEventListener("pointerup", (e) => {
        if (isDragging) {
            isDragging = false;
            saveSettings();
        }
    });
}

/* ================= Time & Atmosphere Updates ================= */
function updateDisplay() {
    const now = new Date();

    // 1. Update Skybox using local hardware time
    updateSkybox(now);

    // 2. Update each clock instance
    config.clocks.forEach(clock => {
        const card = document.getElementById(clock.id);
        if (!card) return;

        const timeElem = card.querySelector(".time-display");
        const dateElem = card.querySelector(".date-display");

        // Format Options
        const timeOptions = {
            hour12: !config.is24Hour,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const dateOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };

        if (clock.timeZone) {
            timeOptions.timeZone = clock.timeZone;
            dateOptions.timeZone = clock.timeZone;
        }

        timeElem.textContent = now.toLocaleTimeString('en-US', timeOptions);
        dateElem.textContent = now.toLocaleDateString('en-US', dateOptions);
    });
}

function updateSkybox(now) {
    const currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

    const skybox = document.getElementById("skybox");
    const stars = document.getElementById("stars");
    const celestial = document.getElementById("celestial-body");

    let skyGradient = "";
    let isNight = false;
    let progress = 0;

    if (currentHours >= 5 && currentHours < 7) {
        skyGradient = "linear-gradient(to bottom, #161c38 0%, #613659 45%, #d1604a 100%)";
        celestial.className = "sun";
        progress = (currentHours - 5) / 14;
    } else if (currentHours >= 7 && currentHours < 17) {
        skyGradient = "linear-gradient(to bottom, #1d4e89 0%, #4a82b8 50%, #83b0d1 100%)";
        celestial.className = "sun";
        progress = (currentHours - 5) / 14;
    } else if (currentHours >= 17 && currentHours < 19) {
        skyGradient = "linear-gradient(to bottom, #0f172a 0%, #4a2140 50%, #c84b31 100%)";
        celestial.className = "sun";
        progress = (currentHours - 5) / 14;
    } else {
        skyGradient = "linear-gradient(to bottom, #03050d 0%, #080c1f 50%, #11172f 100%)";
        celestial.className = "moon";
        isNight = true;

        const nightHours = currentHours >= 19 ? currentHours - 19 : currentHours + 5;
        progress = nightHours / 10;
    }

    skybox.style.background = skyGradient;
    stars.style.opacity = isNight ? "0.85" : "0";

    const x = progress * window.innerWidth;
    const peakY = window.innerHeight * 0.12;
    const baseY = window.innerHeight * 0.88;
    const y = baseY - 4 * (baseY - peakY) * progress * (1 - progress);

    celestial.style.left = `${x}px`;
    celestial.style.top = `${y}px`;
}