// Use explicit constructor to avoid cross-browser parsing differences (year, monthIndex, day, hour, minute, second)
const eventDate = new Date(2026, 0, 13, 9, 0, 0); // 13 Jan 2026 09:00 local time

function updateCountdown(){
  const now = new Date();
  let diff = eventDate.getTime() - now.getTime();
  if(diff < 0) diff = 0;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
  const secs = Math.floor((diff % (1000*60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('secs').textContent = String(secs).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP form validation and fake submission
const rsvpForm = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');

rsvpForm.addEventListener('submit', function(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const attendees = parseInt(document.getElementById('attendees').value,10);

  // simple email check
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if(!name || !emailValid || !attendees || attendees < 1){
    formMessage.textContent = 'Please provide a valid name, email and number of attendees.';
    formMessage.classList.remove('success');
    formMessage.classList.add('error');
    return;
  }

  // Simulate submission (replace with a real POST to persist)
  formMessage.textContent = 'Thanks, ' + name + '! Your RSVP has been recorded. See you on 13 Jan 2026.';
  formMessage.classList.remove('error');
  formMessage.classList.add('success');
  rsvpForm.reset();
});

// Clear form message on reset
rsvpForm.addEventListener('reset', function(){
  formMessage.textContent = '';
  formMessage.classList.remove('success','error');
});

// Hamburger menu toggle using CSS class
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('nav--open');
});

// Smooth scroll for internal links (only when href starts with '#')
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      // close nav on small screens if open
      if(nav.classList.contains('nav--open')){
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});