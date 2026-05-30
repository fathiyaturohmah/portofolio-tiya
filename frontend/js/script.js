// Nyalakan Animasi & Ikon
AOS.init({ duration: 800, once: true });
lucide.createIcons();

/* ==========================================
   1. FITUR MENGETIK OTOMATIS (FIXED BUG)
   ========================================== */
const phrases = ["FullStack Web Engineering", "Data Science & AI Enthusiast", "Creative Media Strategy"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;

function typeEffect() {
    const target = document.getElementById("typing-text");
    if (!target) return; // Pengaman jika elemen HTML belum siap dimuat

    if (i < phrases.length) {
        // Proses mengetik (j dikoreksi menjadi < panjang kata)
        if (!isDeleting && j < phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            target.innerHTML = currentPhrase.join("");
        }
        // Proses menghapus kata
        else if (isDeleting && j > 0) {
            currentPhrase.pop();
            j--;
            target.innerHTML = currentPhrase.join("");
        }

        // Cek jika satu kata sudah selesai diketik penuh
        if (j === phrases[i].length && !isDeleting) {
            setTimeout(() => isDeleting = true, 1500); // Jeda sebelum dihapus
            return setTimeout(typeEffect, 100);
        }
        
        // Cek jika kata sudah habis terhapus semua
        if (j === 0 && isDeleting) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) i = 0; // Reset balik ke kata pertama
        }
    }
    
    // Kecepatan mengetik (100ms) vs menghapus (40ms)
    setTimeout(typeEffect, isDeleting ? 40 : 100);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(typeEffect, 500));

/* ==========================================
   2. EFEK PARTIKEL BACKGROUND CANVAS
   ========================================== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [], mouse = { x: null, y: null, radius: 100 };

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let k = 0; k < 45; k++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2
            });
        }
    }

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    initCanvas();

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            if (mouse.x && mouse.y) {
                let dx = p.x - mouse.x;
                let dy = p.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
}