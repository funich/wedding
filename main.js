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
const submitBtn = rsvpForm ? rsvpForm.querySelector('.btn-rsvp') : null;

// Global flag and function for iframe callback
window.rsvpSubmitted = false;
window.showRsvpSuccess = function () {
    if (rsvpStatus && rsvpForm && submitBtn) {
        rsvpStatus.innerText = 'Спасибо! Ваш ответ успешно отправлен.';
        rsvpStatus.className = 'rsvp-status status-success';
        rsvpForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerText = 'Отправить ответ';
        window.rsvpSubmitted = false;
    }
};

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz01D5_wYF0cCEMigOoKZAdGFxNcziZ_DLmtmw6YMqiWKR1VaaBvsV9nWYdXsMvEJB7iw/exec';

        // Use traditional form submission via hidden iframe to bypass CORS/Redirect issues
        rsvpForm.action = SCRIPT_URL;
        rsvpForm.method = 'POST';
        rsvpForm.target = 'hidden_iframe';

        window.rsvpSubmitted = true;

        // Safety fallback: Show success after 2.5s even if Google redirect is blocked (403)
        setTimeout(() => {
            if (window.rsvpSubmitted) {
                window.showRsvpSuccess();
            }
        }, 2500);

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = 'Отправка...';
        }
        if (rsvpStatus) {
            rsvpStatus.innerText = '';
            rsvpStatus.className = 'rsvp-status';
        }
    });
}
