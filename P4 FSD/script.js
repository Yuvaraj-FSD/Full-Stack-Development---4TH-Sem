/* ============================================================
   DOM CRAFT — script.js
   JavaScript Basics & DOM Manipulation Laboratory
   ============================================================ */

"use strict";

// ── 1. THEME TOGGLE ────────────────────────────────────────

const themeBtn = document.getElementById('themeToggle');

themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeBtn.textContent = '🌙 Dark';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️ Light';
  }
});

// ── 2. TYPEWRITER EFFECT (HERO) ────────────────────────────

const codeLines = [
  '// Select an element',
  'const el = document.getElementById("demo");',
  '',
  '// Change its content',
  'el.textContent = "Hello, DOM!";',
  '',
  '// Apply inline styles',
  'el.style.color = "#6c63ff";',
  'el.style.fontSize = "24px";',
  '',
  '// Toggle a CSS class',
  'el.classList.toggle("active");',
  '',
  '// Listen to events',
  'el.addEventListener("click", () => {',
  '  el.style.opacity = "0";',
  '});'
];

const typewriterEl = document.getElementById('typewriterCode');
let lineIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;
let fullText = codeLines.join('\n');

function type() {
  if (!isDeleting && charIndex <= fullText.length) {
    currentText = fullText.slice(0, charIndex);
    typewriterEl.textContent = currentText;
    charIndex++;
    setTimeout(type, 28);
  } else if (charIndex > fullText.length && !isDeleting) {
    isDeleting = true;
    setTimeout(type, 2800);
  } else if (isDeleting && charIndex > 0) {
    currentText = fullText.slice(0, charIndex);
    typewriterEl.textContent = currentText;
    charIndex--;
    setTimeout(type, 10);
  } else {
    isDeleting = false;
    charIndex = 0;
    setTimeout(type, 500);
  }
}
type();

// ── 3. CONTENT MANIPULATION ────────────────────────────────

// --- textContent / innerHTML ---
const textOutput   = document.getElementById('textOutput');
const textSnippet  = document.getElementById('textSnippet');
let textState = 0;

const textStates = [
  {
    html: '<h3>Hello, World!</h3><p>Click a button below to change this content.</p>',
    snippet: 'document.getElementById("textOutput").textContent = "..."'
  },
  {
    html: '<h3 style="color:var(--violet)">JavaScript is awesome! 🚀</h3><p style="color:var(--text)">textContent was used to update this text safely.</p>',
    snippet: 'element.textContent = "JavaScript is awesome! 🚀";'
  },
  {
    html: '<h3>🎨 Rich HTML Injected!</h3><p>Using <code style="color:var(--violet)">innerHTML</code> we can inject <strong>styled HTML</strong> directly into the DOM.</p>',
    snippet: 'element.innerHTML = "<h3>Rich HTML Injected!</h3>";'
  }
];

function changeText() {
  textState = 1;
  textOutput.innerHTML = textStates[1].html;
  textSnippet.firstChild.textContent = textStates[1].snippet;
  textOutput.style.borderLeft = '4px solid var(--violet)';
}

function changeHTML() {
  textState = 2;
  textOutput.innerHTML = textStates[2].html;
  textSnippet.firstChild.textContent = textStates[2].snippet;
  textOutput.style.borderLeft = '4px solid var(--rose)';
}

function resetText() {
  textState = 0;
  textOutput.innerHTML = textStates[0].html;
  textSnippet.firstChild.textContent = textStates[0].snippet;
  textOutput.style.borderLeft = '';
}

// --- Live Input Mirror ---
const mirrorOutput  = document.getElementById('mirrorOutput');
const charCounter   = document.getElementById('charCounter');

function mirrorText(val) {
  mirrorOutput.textContent = val || 'Your text will appear here';
  charCounter.textContent  = val.length + ' character' + (val.length === 1 ? '' : 's');

  // Dynamic styling based on length
  if (val.length > 50)      mirrorOutput.style.color = 'var(--rose)';
  else if (val.length > 20) mirrorOutput.style.color = 'var(--amber)';
  else                      mirrorOutput.style.color = 'var(--text)';
}

// --- Counter ---
let count = 0;
const counterDisplay = document.getElementById('counterDisplay');

function counterAction(delta) {
  if (delta === 0) {
    count = 0;
  } else {
    count += delta;
  }
  counterDisplay.textContent = count;

  // Change color based on value
  if (count > 0)      counterDisplay.style.color = 'var(--emerald)';
  else if (count < 0) counterDisplay.style.color = 'var(--red)';
  else                counterDisplay.style.color = 'var(--violet)';

  // Animate
  counterDisplay.style.transform = 'scale(1.2)';
  setTimeout(() => (counterDisplay.style.transform = 'scale(1)'), 150);
}

// ── 4. STYLE MANIPULATION ──────────────────────────────────

// --- Color / Class Demo ---
const styleBox     = document.getElementById('styleBox');
const styleSnippet = document.getElementById('styleSnippet');
let isRounded = false;

function applyColor(hex, name) {
  styleBox.style.background = hex;
  styleBox.style.color      = '#fff';
  styleBox.style.borderColor = 'transparent';
  styleBox.querySelector('span').textContent = name + ' ✓';
  styleSnippet.querySelector('code').textContent =
    `element.style.background = '${hex}'; // ${name}`;
}

function toggleRound() {
  isRounded = !isRounded;
  styleBox.style.borderRadius = isRounded ? '50px' : '8px';
  styleSnippet.querySelector('code').textContent =
    `element.style.borderRadius = '${isRounded ? '50px' : '8px'}';`;
}

function resetStyle() {
  styleBox.removeAttribute('style');
  styleBox.querySelector('span').textContent = 'Style Me!';
  isRounded = false;
  styleSnippet.querySelector('code').textContent = "element.style.background = '#6c63ff';";
}

// --- Dynamic Typography ---
const fontDemo    = document.getElementById('fontDemo');
const fontSizeVal = document.getElementById('fontSizeVal');
const spacingVal  = document.getElementById('spacingVal');

function changeFontSize(val) {
  fontDemo.style.fontSize = val + 'px';
  fontSizeVal.textContent = val + 'px';
}

function changeSpacing(val) {
  fontDemo.style.letterSpacing = val + 'px';
  spacingVal.textContent = val + 'px';
}

function setFont(style) {
  fontDemo.style.fontWeight  = style === 'bold'   ? '700' : '400';
  fontDemo.style.fontStyle   = style === 'italic' ? 'italic' : 'normal';
}

// --- CSS Class Animations ---
const animBox = document.getElementById('animBox');
let animTimeout = null;

function animate(type) {
  // Remove all animation classes
  animBox.classList.remove('bounce', 'spin', 'pulse', 'shake');
  const animPara = animBox.querySelector('p');

  if (type === 'none') {
    animPara.textContent = 'Ready to animate';
    return;
  }
  animBox.classList.add(type);
  animPara.textContent = '.' + type + ' class added ✓';
}

// ── 5. VISIBILITY MANIPULATION ─────────────────────────────

// --- display / opacity / visibility toggles ---
function toggleDisplay(id) {
  const el = document.getElementById(id);
  if (el.style.display === 'none') {
    el.style.display = '';
    el.textContent = '📦 Element A (display)';
  } else {
    el.style.display = 'none';
  }
}

function toggleOpacity(id) {
  const el = document.getElementById(id);
  el.classList.toggle('opaque');
}

function toggleVisibility(id) {
  const el = document.getElementById(id);
  el.classList.toggle('invisible');
  el.textContent = el.classList.contains('invisible')
    ? '👁️ Element C (hidden but space preserved)'
    : '👁️ Element C (visibility)';
}

// --- Modal ---
const modalOverlay = document.getElementById('modalOverlay');

function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === modalOverlay) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// --- Accordion ---
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');

  // Close all open items first
  document.querySelectorAll('.acc-header.open').forEach(h => {
    h.classList.remove('open');
    h.nextElementSibling.style.maxHeight = null;
  });

  if (!isOpen) {
    header.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// ── 6. EVENT HANDLING ──────────────────────────────────────

// --- Mouse Tracker ---
const trackerZone   = document.getElementById('trackerZone');
const trackerCursor = document.getElementById('trackerCursor');
const trackerCoords = document.getElementById('trackerCoords');

function trackMouse(e) {
  const rect = trackerZone.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  trackerCursor.style.left    = x + 'px';
  trackerCursor.style.top     = y + 'px';
  trackerCursor.style.opacity = '1';
  trackerCoords.textContent   = `X: ${Math.round(x)}  Y: ${Math.round(y)}`;
}

function resetTracker() {
  trackerCursor.style.opacity = '0';
  trackerCoords.textContent   = 'X: — Y: —';
}

// --- Click spark ---
function clickSpark(e) {
  createSpark(e.clientX, e.clientY);
}

// --- Keyboard logger ---
document.addEventListener('keydown', e => {
  const badge = document.getElementById('keyBadge');
  badge.textContent = e.key === ' ' ? 'Space' : e.key;
  badge.style.borderColor = 'var(--violet)';
  badge.style.transform   = 'scale(1.15)';
  setTimeout(() => {
    badge.style.borderColor = 'var(--border)';
    badge.style.transform   = 'scale(1)';
  }, 200);
});

// --- Global click event for event button ---
document.getElementById('evBtn1').addEventListener('click', function () {
  logEvent('click', '#evBtn1');
});

// --- Event Logger ---
const eventLog = document.getElementById('eventLog');
let logCount   = 0;

function logEvent(eventName, target) {
  const placeholder = eventLog.querySelector('.log-placeholder');
  if (placeholder) placeholder.remove();

  const now  = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour12: false });

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = `
    <span class="log-time">${time}</span>
    <span class="log-event">${eventName}</span>
    <span class="log-target">on ${target}</span>
  `;

  eventLog.insertBefore(entry, eventLog.firstChild);
  logCount++;

  // Keep at most 30 entries
  if (logCount > 30) {
    eventLog.removeChild(eventLog.lastChild);
    logCount--;
  }
}

function clearLog() {
  logCount = 0;
  eventLog.innerHTML = '<div class="log-placeholder">Events will appear here...</div>';
}

// ── 7. TO-DO LIST (createElement / removeChild) ────────────

const todoList  = document.getElementById('todoList');
const todoEmpty = document.getElementById('todoEmpty');
const todoInput = document.getElementById('todoInput');
let todoCount   = 0;

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todoEmpty.style.display = 'none';
  todoCount++;

  const li = document.createElement('li');
  li.id = 'todo-' + todoCount;

  const left = document.createElement('div');
  left.className = 'todo-item-left';

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'todo-check';

  const span = document.createElement('span');
  span.textContent = text;

  // Toggle done state
  check.addEventListener('change', () => {
    li.classList.toggle('done', check.checked);
  });
  left.addEventListener('click', (e) => {
    if (e.target !== check) {
      check.checked = !check.checked;
      li.classList.toggle('done', check.checked);
    }
  });

  const del = document.createElement('button');
  del.className = 'todo-del';
  del.textContent = '✕';
  del.title = 'Remove task';
  del.addEventListener('click', () => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(40px)';
    li.style.transition = 'all .25s';
    setTimeout(() => {
      todoList.removeChild(li);
      if (todoList.children.length === 0) {
        todoEmpty.style.display = '';
      }
    }, 250);
  });

  left.appendChild(check);
  left.appendChild(span);
  li.appendChild(left);
  li.appendChild(del);
  todoList.appendChild(li);

  todoInput.value = '';
  todoInput.focus();
}

// ── 8. CANVAS SPARK EFFECT ─────────────────────────────────

const canvas = document.getElementById('sparkCanvas');
const ctx    = canvas.getContext('2d');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
const COLORS = ['#6c63ff','#f43f5e','#10b981','#f59e0b','#38bdf8'];

class Particle {
  constructor(x, y) {
    this.x  = x;
    this.y  = y;
    this.r  = Math.random() * 5 + 2;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8 - 3;
    this.alpha = 1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  update() {
    this.x     += this.vx;
    this.y     += this.vy;
    this.vy    += 0.25; // gravity
    this.alpha -= 0.025;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function createSpark(x, y, count = 14) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) particles.splice(i, 1);
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Spark on any .btn click anywhere on the page
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    createSpark(e.clientX, e.clientY, 10);
  });
});

// ── 9. SMOOTH SECTION REVEAL (IntersectionObserver) ────────

const sections = document.querySelectorAll('.lab-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

sections.forEach(sec => {
  sec.style.opacity   = '0';
  sec.style.transform = 'translateY(40px)';
  sec.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(sec);
});
