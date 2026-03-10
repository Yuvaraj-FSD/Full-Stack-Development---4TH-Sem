// script.js - Consolidated site script
// Handles loader, navigation, smooth scroll, reveal, countdown, accordion, map/form buttons,
// WhatsApp widget, and sponsors marquee setup.

(() => {
  /* ---------- SITE LOADER ---------- */
  const loader = document.getElementById('siteLoader');
  const progressBar = document.getElementById('loaderProgressBar');
  const loaderMsg = document.getElementById('loaderMsg');

  if (loader && progressBar) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      window.addEventListener('load', () => {
        loader.classList.add('site-loader--hidden');
        setTimeout(() => loader.remove(), 420);
      });
    } else {
      let progress = 6;
      progressBar.style.width = progress + '%';
      let tick = setInterval(() => {
        const delta = Math.random() * 4;
        progress = Math.min(92, progress + delta);
        progressBar.style.width = Math.round(progress) + '%';
        if (progress >= 92 && tick) { clearInterval(tick); tick = null; }
      }, 220);

      window.addEventListener('load', () => {
        progressBar.style.width = '100%';
        if (loaderMsg) loaderMsg.textContent = 'Almost ready — launching...';
        setTimeout(() => { loader.classList.add('site-loader--hidden'); setTimeout(() => { try { loader.remove(); } catch (e) {} }, 480); }, 650);
      });

      // Fallback: ensure loader doesn't hang
      setTimeout(() => {
        if (loader && !loader.classList.contains('site-loader--hidden')) {
          progressBar.style.width = '100%';
          loader.classList.add('site-loader--hidden');
          setTimeout(() => { try { loader.remove(); } catch (e) {} }, 480);
        }
      }, 12000);
    }
  }

  /* ---------- MAIN BEHAVIOR ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // NAV TOGGLE
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    navToggle?.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navList || !navToggle) return;
      if (!navList.contains(e.target) && !navToggle.contains(e.target) && navList.classList.contains('open')) {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // SMOOTH SCROLL & JUMP
    function headerHeight() {
      const header = document.querySelector('.site-header');
      return header ? header.getBoundingClientRect().height : 72;
    }
    function scrollToId(id) {
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => { target.querySelector('a,button,input,textarea')?.focus(); }, 600);
    }
    document.addEventListener('click', (e) => {
      const el = e.target.closest('a[href^="#"], button#jumpRegister');
      if (!el) return;
      if (el.id === 'jumpRegister') { e.preventDefault(); scrollToId('register'); return; }
      const href = el.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      e.preventDefault();
      scrollToId(href.slice(1));
      if (navList && navList.classList.contains('open')) { navList.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
    });

    // REVEAL ON SCROLL
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('show'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // COUNTDOWN
    const EVENT_DATE = new Date('2026-01-31T09:00:00');
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');
    const eventDateEl = document.getElementById('eventDate');
    if (eventDateEl) eventDateEl.textContent = EVENT_DATE.toLocaleString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    function updateCountdown() {
      const now = new Date(); let diff = Math.max(0, EVENT_DATE - now);
      if (diff <= 0) { if (cdDays) cdDays.textContent='00'; if (cdHours) cdHours.textContent='00'; if (cdMins) cdMins.textContent='00'; if (cdSecs) cdSecs.textContent='00'; return; }
      const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
      const hours = Math.floor(diff / (1000*60*60)); diff -= hours*(1000*60*60);
      const mins = Math.floor(diff / (1000*60)); diff -= mins*(1000*60);
      const secs = Math.floor(diff / 1000);
      if (cdDays) cdDays.textContent = String(days).padStart(2,'0');
      if (cdHours) cdHours.textContent = String(hours).padStart(2,'0');
      if (cdMins) cdMins.textContent = String(mins).padStart(2,'0');
      if (cdSecs) cdSecs.textContent = String(secs).padStart(2,'0');
    }
    updateCountdown();
    const countdownInterval = setInterval(() => { updateCountdown(); if (new Date() >= EVENT_DATE) clearInterval(countdownInterval); }, 1000);

    // ACCORDION
    document.querySelectorAll('.accordion-item').forEach(item => {
      const btn = item.querySelector('.accordion-button');
      const panel = item.querySelector('.accordion-panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', () => toggleAccordion(btn, panel));
      btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAccordion(btn,panel); } });
    });
    function toggleAccordion(btn, panel) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.accordion-button').forEach(b => { b.setAttribute('aria-expanded','false'); if (b.nextElementSibling) b.nextElementSibling.hidden = true; const sym = b.querySelector('.acc-symbol'); if (sym) sym.textContent='+'; });
      if (!expanded) { btn.setAttribute('aria-expanded','true'); panel.hidden = false; const sym = btn.querySelector('.acc-symbol'); if (sym) sym.textContent='−'; panel.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
    }

    // MAP/Open official form
    const openMapBtn = document.getElementById('openMapBtn');
    openMapBtn?.addEventListener('click', () => window.open('https://www.google.com/maps/search/?api=1&query=AMET+University+Kanathur+Chennai', '_blank'));
    const openOfficialFormBtn = document.getElementById('openOfficialForm');
    openOfficialFormBtn?.addEventListener('click', () => window.open('https://forms.gle/LG6AzBqL9vw4T52F6', '_blank', 'noopener,noreferrer'));

    // WHATSAPP widget
    const widget = document.getElementById('whatsappWidget');
    const toggle = document.getElementById('whatsappToggle');
    const menu = document.getElementById('whatsappMenu');
    const closeBtn = document.getElementById('whatsappClose');
    const closeBottom = document.getElementById('whatsappCloseBottom');
    if (widget && toggle && menu) {
      function openWs(){ widget.classList.add('open'); toggle.setAttribute('aria-expanded','true'); menu.setAttribute('aria-hidden','false'); document.addEventListener('click',outside); document.addEventListener('keydown',keyHandler); }
      function closeWs(){ widget.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true'); toggle.focus(); document.removeEventListener('click',outside); document.removeEventListener('keydown',keyHandler); }
      function outside(e){ if (!widget.contains(e.target)) closeWs(); }
      function keyHandler(e){ if (e.key==='Escape') closeWs(); if (e.key==='Tab') setTimeout(()=>{ if (!widget.contains(document.activeElement)) closeWs(); },0); }
      toggle.addEventListener('click', e=>{ e.stopPropagation(); widget.classList.contains('open')?closeWs():openWs(); });
      closeBtn?.addEventListener('click', e=>{ e.stopPropagation(); closeWs(); });
      closeBottom?.addEventListener('click', e=>{ e.stopPropagation(); closeWs(); });
      menu.querySelectorAll('[role="menuitem"]').forEach(a=>{ a.setAttribute('tabindex','0'); a.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' ') { e.currentTarget.click(); } }); });
    }

    // Sponsors marquee setup (defensive)
    const marquee = document.getElementById('sponsorMarquee');
    if (marquee) {
      const trackWrap = marquee.querySelector('.track-wrap');
      if (trackWrap) {
        const tracks = trackWrap.querySelectorAll('.sponsor-track');
        if (tracks.length === 1) trackWrap.appendChild(tracks[0].cloneNode(true));
        trackWrap.querySelectorAll('img').forEach(img => {
          img.addEventListener('dragstart', e => e.preventDefault());
          img.addEventListener('touchstart', () => {}, {passive: true});
        });
      }
    }

    // Accessibility: close nav on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (navList && navList.classList.contains('open')) {
          navList.classList.remove('open');
          navToggle.setAttribute('aria-expanded','false');
          navToggle.focus();
        }
      }
    });
  }); // DOMContentLoaded end
})(); // IIFE end