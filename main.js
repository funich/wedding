const weddingDate = new Date('2026-05-15T13:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
    if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');
    if (secsEl) secsEl.innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(timer);
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) countdownEl.innerHTML = "<h2 style='color: white;'>Мы уже женаты! ❤️</h2>";
    }
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal();
