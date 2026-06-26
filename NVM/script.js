// ==========================================
// CONFIGURATION: SET BIRTHDAY DATE HERE
// ==========================================
// Format: YYYY-MM-DDTHH:mm:ss
// Contoh: "2026-10-15T00:00:00" -> 15 Oktober 2026 jam 12 malam
const TARGET_DATE = new Date("2026-06-26T00:00:00");

// Variables for Canvas Particle System
let canvas, ctx;
let particles = [];
const particleColors = ['#ff8fa3', '#ffcad4', '#ff6b81', '#ff4757', '#ffd2dc'];
const shapes = ['heart', 'sparkle', 'circle'];

// Audio Elements
let audio, vinyl, playIcon, progressBar, currentTimeEl, totalTimeEl;

// Playlist Configuration
const playlist = [
    { title: 'Rearrange the World', file: 'song1.mp3' },
    { title: 'Keep Me', file: 'song2.mp3' },
    { title: 'Kasih Putih', file: 'song3.mp3' }
];

let currentSongIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize variables
    audio = document.getElementById('birthday-track');
    vinyl = document.getElementById('vinyl-disc');
    playIcon = document.getElementById('play-icon');
    progressBar = document.getElementById('progress-bar');
    currentTimeEl = document.getElementById('current-time');
    totalTimeEl = document.getElementById('total-time');

    // Load love counter from localStorage
    const storedCount = localStorage.getItem('love_count') || '0';
    document.getElementById('love-count').innerText = storedCount;

    // 2. Audio Setup & Sync Duration
    if (audio) {
        audio.volume = 0.6;
        audio.addEventListener('timeupdate', updateAudioProgress);
        audio.addEventListener('loadedmetadata', () => {
            if (totalTimeEl) totalTimeEl.innerText = formatTime(audio.duration);
        });
        audio.addEventListener('ended', playNextSong);
        // In case audio is already pre-loaded
        if (audio.duration && totalTimeEl) {
            totalTimeEl.innerText = formatTime(audio.duration);
        }
        
        // Load first song
        loadSong(currentSongIndex);
    }

    // 3. Date check logic
    const urlParams = new URLSearchParams(window.location.search);
    const isBypass = urlParams.get('bypass') === 'true' || urlParams.get('test') === 'true';
    
    // Display target date in human-readable format
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const targetDateStrEl = document.getElementById('target-date-str');
    if (targetDateStrEl) {
        targetDateStrEl.innerText = TARGET_DATE.toLocaleDateString('id-ID', options);
    }

    const now = new Date();
    if (isBypass || now >= TARGET_DATE) {
        // Unlock: Show Envelope Cover Screen
        const cover = document.getElementById('cover');
        if (cover) cover.classList.remove('hidden');
    } else {
        // Lock: Show Countdown
        const lockScreen = document.getElementById('lock-screen');
        if (lockScreen) lockScreen.classList.remove('hidden');
        startCountdown();
    }
});

// Countdown Timer Loop
let countdownInterval;
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function update() {
        const now = new Date();
        const difference = TARGET_DATE - now;

        // If target date is reached!
        if (difference <= 0) {
            clearInterval(countdownInterval);
            const lockScreen = document.getElementById('lock-screen');
            const cover = document.getElementById('cover');
            if (lockScreen) lockScreen.classList.add('hidden');
            if (cover) cover.classList.remove('hidden');
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = d < 10 ? '0' + d : d;
        if (hoursEl) hoursEl.innerText = h < 10 ? '0' + h : h;
        if (minutesEl) minutesEl.innerText = m < 10 ? '0' + m : m;
        if (secondsEl) secondsEl.innerText = s < 10 ? '0' + s : s;
    }

    update();
    countdownInterval = setInterval(update, 1000);
});

// Countdown Timer Loop
let countdownInterval;
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function update() {
        const now = new Date();
        const difference = TARGET_DATE - now;

        // If target date is reached!
        if (difference <= 0) {
            clearInterval(countdownInterval);
            const lockScreen = document.getElementById('lock-screen');
            const cover = document.getElementById('cover');
            if (lockScreen) lockScreen.classList.add('hidden');
            if (cover) cover.classList.remove('hidden');
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = d < 10 ? '0' + d : d;
        if (hoursEl) hoursEl.innerText = h < 10 ? '0' + h : h;
        if (minutesEl) minutesEl.innerText = m < 10 ? '0' + m : m;
        if (secondsEl) secondsEl.innerText = s < 10 ? '0' + s : s;
    }

    update();
    countdownInterval = setInterval(update, 1000);
}

// Buka Envelope Surprise
function bukaKejutan() {
    const cover = document.getElementById('cover');
    if (!cover) return;

    cover.style.opacity = '0';
    cover.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        cover.classList.add('hidden');
        
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.classList.add('show');
            }, 100);
        }
        
        // Auto play audio on interaction
        if (audio) {
            audio.play().then(() => {
                if (playIcon) playIcon.className = "fa-solid fa-pause";
                if (vinyl) vinyl.style.animationPlayState = "running";
            }).catch(error => {
                console.log("Audio waiting for user click/interaction to play.");
            });
        }

        // Initialize particles & start letter writing animation
        initParticles();
        startTypingEffect();
    }, 800);
}

// Letter Typing Effect
const messageText = `Selamat ulang tahun.

Aku gatau harus mulai dari mana. Hatiku berat banget buat nerima fakta kalau kita gabisa buat bareng. Maybe it's karma buat aku karena udah pernah jauhin kamu, i know. tapi kamu perlu tahu alasannya. waktu itu aku pikir kamu udah ada someone, dan aku respect itu, jadi aku pergi. i respected him too.

tapi yang kamu perlu tau adalah: aku sayang kamu dari saat pertama kita bertemu. honestly. cuma aku belum berani bilang soalnya aku butuh waktu buat make sure kalo ini beneran atau cuma sesaat. tapi setelah 1 bulan bareng kamu, aku realize i really like you. kaya aku kosong kalau gaada kamu. i'm not looking for excuses or redemption or whatever, if you think aku cuma nyari pembelaan ya fine, i let you think about it. but in the end, aku beneran sayang kamu.

semalem aku mimpi kamu udah dapet the man you need. dalam mimpi itu kamu happy. dan aku masih disini, still here. aku bisa inget setiap detail dari mimpi itu, dan somehow it feels like you're already starting to fade from me. sedangkan aku masih disini, still trying to process everything.

aku cuma mau kamu tahu, kamu berarti buat aku. dan aku harap kamu happy. that's all i want for you.

happy birthday. 💖`;

let charIndex = 0;
function startTypingEffect() {
    const textEl = document.getElementById('message-text');
    if (!textEl) return;
    textEl.innerHTML = "";
    
    function type() {
        if (charIndex < messageText.length) {
            const char = messageText[charIndex];
            if (char === '\n') {
                textEl.innerHTML += '<br>';
            } else {
                textEl.innerHTML += char;
            }
            charIndex++;
            setTimeout(type, 50);
        }
    }
    type();
}

// Interactive Love Button & Counter
function kirimCinta(event) {
    let loveCount = parseInt(localStorage.getItem('love_count') || '0');
    loveCount++;
    localStorage.setItem('love_count', loveCount);
    
    const countEl = document.getElementById('love-count');
    if (countEl) countEl.innerText = loveCount;
    
    // Spawn flying hearts at button position
    const btnRect = event.currentTarget.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top;
    
    // Only spawn if particle system is initialized
    if (!canvas) {
        initParticles();
    }
    
    for (let i = 0; i < 12; i++) {
        particles.push({
            x: startX + (Math.random() - 0.5) * 30,
            y: startY,
            size: Math.random() * 12 + 6,
            speedY: -(Math.random() * 3 + 2), // Fly upwards faster
            speedX: (Math.random() - 0.5) * 4,
            color: '#ff4757',
            shape: 'heart',
            opacity: 1,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            isClickSpawned: true
        });
    }
}

// ----------------------------------------------------
// CANVAS PARTICLE SYSTEM
// ----------------------------------------------------
function initParticles() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Generate initial floating particles
    for (let i = 0; i < 25; i++) {
        particles.push(createParticle(true));
    }
    
    animateParticles();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle(randomY = false) {
    return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 20,
        size: Math.random() * 8 + 4,
        speedY: -(Math.random() * 1.2 + 0.4), // Float upwards
        speedX: (Math.random() - 0.5) * 1.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        isClickSpawned: false
    };
}

function drawHeart(x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    
    const topY = -size / 2;
    ctx.moveTo(0, size / 2);
    ctx.bezierCurveTo(-size, 0, -size, topY, -size / 2, topY);
    ctx.bezierCurveTo(0, topY, 0, 0, 0, size / 2);
    ctx.moveTo(0, size / 2);
    ctx.bezierCurveTo(size, 0, size, topY, size / 2, topY);
    ctx.bezierCurveTo(0, topY, 0, 0, 0, size / 2);
    
    ctx.fill();
    ctx.restore();
}

function drawSparkle(x, y, size, color, opacity, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
        ctx.lineTo(0, -size);
        ctx.lineTo(size/4, -size/4);
        ctx.rotate(Math.PI / 2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawCircle(x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        
        // Bounce off screen edges slightly
        if (p.x < 0 || p.x > canvas.width) {
            p.speedX *= -1;
        }
        
        // If particle moves off the top of the screen
        if (p.y < -20) {
            if (p.isClickSpawned) {
                // Click-spawned hearts disappear
                particles.splice(i, 1);
                i--;
                continue;
            } else {
                // Background particles recycle to the bottom
                particles[i] = createParticle(false);
            }
        }
        
        // Draw shape
        if (p.shape === 'heart') {
            drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.shape === 'sparkle') {
            drawSparkle(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
            drawCircle(p.x, p.y, p.size, p.color, p.opacity);
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// ----------------------------------------------------
// AUDIO PLAYER LOGIC
// ----------------------------------------------------
function togglePlay() {
    if (!audio) return;
    
    if (audio.paused) {
        audio.play().then(() => {
            if (playIcon) playIcon.className = "fa-solid fa-pause";
            if (vinyl) vinyl.style.animationPlayState = "running";
        }).catch(err => {
            console.log("Play failed: ", err);
        });
    } else {
        audio.pause();
        if (playIcon) playIcon.className = "fa-solid fa-play";
        if (vinyl) vinyl.style.animationPlayState = "paused";
    }
}

function updateAudioProgress() {
    if (!audio || !progressBar || !currentTimeEl) return;
    
    if (!isNaN(audio.duration)) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';
        currentTimeEl.innerText = formatTime(audio.currentTime);
    }
}

function setSeek(event) {
    if (!audio || isNaN(audio.duration)) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audio.currentTime = percentage * audio.duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// ==========================================
// PLAYLIST SYSTEM
// ==========================================
function loadSong(index) {
    if (index < 0 || index >= playlist.length) return;
    
    currentSongIndex = index;
    const song = playlist[index];
    
    // Update audio source
    const source = audio.querySelector('source');
    source.src = song.file;
    audio.load();
}

function playNextSong() {
    currentSongIndex++;
    
    if (currentSongIndex >= playlist.length) {
        // Loop back to first song
        currentSongIndex = 0;
    }
    
    loadSong(currentSongIndex);
    audio.play().catch(err => {
        console.log("Auto-play next song failed: ", err);
    });
}

function skipToSong(index) {
    loadSong(index);
    if (!audio.paused) {
        audio.play();
    }
}