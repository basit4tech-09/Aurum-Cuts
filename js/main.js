// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ── Hero Slideshow ──
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function nextSlide() { goToSlide(current + 1); }

function startTimer() {
  timer = setInterval(nextSlide, 4000);
}

document.getElementById('nextSlide').addEventListener('click', () => {
  clearInterval(timer);
  goToSlide(current + 1);
  startTimer();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  clearInterval(timer);
  goToSlide(current - 1);
  startTimer();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(timer);
    goToSlide(parseInt(dot.getAttribute('data-index')));
    startTimer();
  });
});

startTimer();
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(bookingForm);

    const response = await fetch('https://formspree.io/f/maqkqorb', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      bookingForm.innerHTML = `
        <div class="booking-success">
          <span>✅</span>
          <h3>Booking Confirmed!</h3>
          <p>We've received your booking. We'll be in touch shortly.</p>
        </div>
      `;
    } else {
      bookingForm.innerHTML = `
        <div class="booking-success">
          <span>❌</span>
          <h3>Something went wrong</h3>
          <p>Please try again or contact us directly.</p>
        </div>
      `;
    }
  });
}

// ── Booking Form ──
/*const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingForm.innerHTML = '<p class="form-success">✅ Booking confirmed! We\'ll be in touch shortly.</p>';
  });
}*/