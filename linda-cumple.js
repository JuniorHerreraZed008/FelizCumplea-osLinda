// ============================================
// CONFIGURACIÓN
// ============================================
let currentScreen = 1;
const totalScreens = 4;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initConfetti();
    initBalloons();
    initGiftBox();
    initCake();
    initCompliments();
    initMusic();
    initCelebrate();
});

// ============================================
// CONFETI ANIMADO
// ============================================
function initConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#FF1493', '#FFD700', '#FF69B4', '#9370DB', '#FFB6C1', '#FFA500'];
    const confettiCount = window.innerWidth < 768 ? 50 : 80;
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 5 + 3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 3 + 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.vy;
            this.x += this.vx;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// GLOBOS FLOTANTES
// ============================================
function initBalloons() {
    setInterval(() => {
        createBalloon();
    }, 2500);
}

function createBalloon() {
    const container = document.getElementById('balloonsContainer');
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const balloonEmojis = ['🎈', '🎉', '🎊', '🎁', '💖', '✨', '🌟'];
    balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
    balloon.style.left = Math.random() * 90 + '%';
    balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';
    
    container.appendChild(balloon);
    
    setTimeout(() => balloon.remove(), 10000);
}

// ============================================
// CAJA DE REGALO INICIAL
// ============================================
function initGiftBox() {
    const giftBox = document.getElementById('giftBox');
    
    giftBox.addEventListener('click', () => {
        // Animación de explosión
        giftBox.style.transform = 'scale(1.5)';
        giftBox.style.opacity = '0';
        
        // Crear explosión de confeti
        createExplosion(giftBox);
        
        setTimeout(() => {
            goToScreen(2);
        }, 800);
    });
}

function createExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const emojis = ['🎉', '✨', '💖', '🌟', '🎊', '💫'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.fontSize = '2rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        const angle = (i / 20) * Math.PI * 2;
        const distance = 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        setTimeout(() => {
            particle.style.transition = 'all 1s ease-out';
            particle.style.transform = `translate(${tx}px, ${ty}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => particle.remove(), 1100);
    }
}

// ============================================
// PASTEL INTERACTIVO
// ============================================
function initCake() {
    const cake = document.getElementById('cake');
    
    cake.addEventListener('click', () => {
        const candles = cake.querySelectorAll('.candle');
        
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.style.transition = 'all 0.5s ease';
                candle.style.opacity = '0';
                candle.style.transform = 'translateY(-50px)';
            }, index * 200);
        });
        
        setTimeout(() => {
            createFireworks();
        }, 800);
        
        setTimeout(() => {
            candles.forEach(candle => {
                candle.style.opacity = '1';
                candle.style.transform = 'translateY(0)';
            });
        }, 3000);
    });
}

function createFireworks() {
    const colors = ['#FF1493', '#FFD700', '#FF69B4', '#9370DB'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;
            
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                
                document.body.appendChild(particle);
                
                const angle = (j / 12) * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                setTimeout(() => {
                    particle.style.transition = 'all 1s ease-out';
                    particle.style.transform = `translate(${tx}px, ${ty}px)`;
                    particle.style.opacity = '0';
                }, 10);
                
                setTimeout(() => particle.remove(), 1100);
            }
        }, i * 300);
    }
}

// ============================================
// TARJETAS DE ELOGIOS
// ============================================
function initCompliments() {
    const cards = document.querySelectorAll('.compliment-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// ============================================
// NAVEGACIÓN ENTRE PANTALLAS
// ============================================
function goToScreen(screenNum) {
    if (screenNum < 1 || screenNum > totalScreens) return;
    
    const currentScreenEl = document.querySelector('.screen.active');
    const nextScreenEl = document.getElementById(`screen${screenNum}`);
    
    currentScreenEl.classList.remove('active');
    
    setTimeout(() => {
        nextScreenEl.classList.add('active');
        currentScreen = screenNum;
        
        // Efectos especiales por pantalla
        if (screenNum === 4) {
            startHeartsRain();
        }
    }, 300);
}

// ============================================
// LLUVIA DE CORAZONES
// ============================================
function startHeartsRain() {
    const container = document.getElementById('heartsRain');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    }
    
    // Crear corazones continuamente
    const interval = setInterval(createHeart, 300);
    
    // Detener después de 10 segundos
    setTimeout(() => clearInterval(interval), 10000);
}

// ============================================
// MÚSICA
// ============================================
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const music = document.getElementById('birthdayMusic');
    
    music.volume = 0.3;
    
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicBtn.classList.add('playing');
        } else {
            music.pause();
            musicBtn.classList.remove('playing');
        }
    });
}

// ============================================
// BOTÓN CELEBRAR
// ============================================
function initCelebrate() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    
    celebrateBtn.addEventListener('click', () => {
        // Mega explosión de fuegos artificiales
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFireworks();
            }, i * 200);
        }
        
        // Más corazones
        startHeartsRain();
        
        // Cambiar texto del botón
        celebrateBtn.textContent = '🎉 ¡Eres increíble Linda! 🎉';
        celebrateBtn.style.background = 'linear-gradient(to right, #FF6B6B, #FFD93D, #6BCF7F, #4D96FF)';
        
        setTimeout(() => {
            celebrateBtn.textContent = '🎊 ¡Celebrar! 🎊';
            celebrateBtn.style.background = '';
        }, 3000);
    });
}

// ============================================
// EFECTOS DE TOUCH EN MÓVIL
// ============================================
if ('ontouchstart' in window) {
    document.querySelectorAll('.next-btn, .celebrate-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// ============================================
// SWIPE EN MÓVIL
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50 && currentScreen < totalScreens) {
        // Swipe izquierda - siguiente
        goToScreen(currentScreen + 1);
    }
    
    if (touchEndX - touchStartX > 50 && currentScreen > 1) {
        // Swipe derecha - anterior
        goToScreen(currentScreen - 1);
    }
}

// ============================================
// MENSAJES EN CONSOLA
// ============================================
console.log('%c🎂 ¡Feliz Cumpleaños Linda! 🎉', 'color: #FF1493; font-size: 30px; font-weight: bold;');
console.log('%c✨ Eres una mujer increíble ✨', 'color: #FFD700; font-size: 20px;');
console.log('%c💖 ¡Que tengas el mejor día! 💖', 'color: #FF69B4; font-size: 20px;');