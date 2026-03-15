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

// RSVP Form Logic
const rsvpForm = document.getElementById('rsvp-form');
const rsvpStatus = document.getElementById('rsvp-status');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = rsvpForm.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';
        rsvpStatus.innerText = '';
        rsvpStatus.className = 'rsvp-status';

        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6Hb6IL0Zs-OULqheaMgs33uMTaEMkuFxVlCzw1tfhRxXDRSnKD6FdOsnvQTf4J_V8CQ/exec';
            
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors if not handling preflight
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            rsvpStatus.innerText = 'Спасибо! Ваш ответ успешно отправлен.';
            rsvpStatus.classList.add('status-success');
            rsvpForm.reset();

        } catch (error) {
            rsvpStatus.innerText = 'Произошла ошибка. Пожалуйста, попробуйте позже.';
            rsvpStatus.classList.add('status-error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
}
