// main.js — ES6 Module entry point
// Uses: import/export, arrow functions, destructuring, template literals, promises, async/await

import { add, subtract, multiply, divide, describe } from "./mathUtils.js";

// ─────────────────────────────────────────────
// Section 1: Arrow Functions
// ─────────────────────────────────────────────
window.runArrow = () => {
  const input = document.getElementById("arrow-input").value.trim();
  const outputEl = document.getElementById("arrow-output");

  if (!input) {
    outputEl.textContent = "Please enter some numbers first.";
    outputEl.className = "output error";
    return;
  }

  // Parse input, filter, map — all using arrow functions
  const nums = input.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

  if (nums.length === 0) {
    outputEl.textContent = "Couldn't parse any valid numbers.";
    outputEl.className = "output error";
    return;
  }

  const evens    = nums.filter(n => n % 2 === 0);
  const odds     = nums.filter(n => n % 2 !== 0);
  const doubled  = nums.map(n => n * 2);
  const sum      = nums.reduce((acc, n) => acc + n, 0);
  const sorted   = [...nums].sort((a, b) => a - b);

  outputEl.innerHTML =
    `Original:  [${nums.join(", ")}]\n` +
    `Doubled:   [${doubled.join(", ")}]\n` +
    `Evens:     [${evens.join(", ") || "none"}]\n` +
    `Odds:      [${odds.join(", ") || "none"}]\n` +
    `Sum:       ${sum}\n` +
    `Sorted ↑:  [${sorted.join(", ")}]`;
  outputEl.className = "output success";
};

// ─────────────────────────────────────────────
// Section 2: Destructuring
// ─────────────────────────────────────────────
window.runDestruct = () => {
  const nameVal = document.getElementById("dest-name").value.trim();
  const ageVal  = document.getElementById("dest-age").value.trim();
  const cityVal = document.getElementById("dest-city").value.trim();
  const outputEl = document.getElementById("dest-output");

  if (!nameVal || !ageVal || !cityVal) {
    outputEl.textContent = "Please fill in all three fields.";
    outputEl.className = "output error";
    return;
  }

  // Object destructuring
  const person = { name: nameVal, age: parseInt(ageVal), city: cityVal, role: undefined };
  const { name, age, city, role = "Student" } = person; // default value for role

  // Array destructuring
  const coords = [28.6139, 77.2090, 216];
  const [lat, lng, altitude = 0] = coords;

  outputEl.innerHTML =
    `── Object Destructuring ──\n` +
    `Name: ${name}\n` +
    `Age: ${age}\n` +
    `City: ${city}\n` +
    `Role (default): ${role}\n\n` +
    `── Array Destructuring ──\n` +
    `Latitude: ${lat}\n` +
    `Longitude: ${lng}\n` +
    `Altitude: ${altitude}m`;
  outputEl.className = "output success";
};

// ─────────────────────────────────────────────
// Section 3: Template Literals
// ─────────────────────────────────────────────
window.runTemplate = () => {
  const name    = document.getElementById("tpl-name").value.trim();
  const subject = document.getElementById("tpl-subject").value.trim();
  const outputEl = document.getElementById("tpl-output");

  if (!name || !subject) {
    outputEl.textContent = "Please fill in both fields.";
    outputEl.className = "output error";
    return;
  }

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  // Template literal: multi-line, expression, method call
  const message = `${greeting}, ${name}!
You mentioned you enjoy ${subject}.
That's awesome — keep learning!

Today is ${now.toDateString()}, and the time is ${now.toLocaleTimeString()}.
${subject.length > 10 ? `"${subject}" is quite a long subject name!` : `"${subject}" — short and sweet.`}`;

  outputEl.textContent = message;
  outputEl.className = "output success";
};

// ─────────────────────────────────────────────
// Section 4: Promises
// ─────────────────────────────────────────────
window.runPromise = () => {
  const outputEl = document.getElementById("promise-output");
  outputEl.textContent = "Flipping coin...";
  outputEl.className = "output loading";

  // Simulate a small delay so the user can see it "working"
  const flipCoin = new Promise((resolve, reject) => {
    setTimeout(() => {
      const isHeads = Math.random() > 0.5;
      if (isHeads) {
        resolve("Heads! ✓  The Promise resolved successfully.");
      } else {
        reject("Tails! ✗  The Promise was rejected.");
      }
    }, 800);
  });

  flipCoin
    .then(result => {
      outputEl.textContent = result;
      outputEl.className = "output success";
    })
    .catch(err => {
      outputEl.textContent = err;
      outputEl.className = "output error";
    });
};

// ─────────────────────────────────────────────
// Section 5: Async / Await
// ─────────────────────────────────────────────
const fetchJoke = async () => {
  const res = await fetch("https://official-joke-api.appspot.com/jokes/random");
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const data = await res.json();
  // Destructuring the response object
  const { setup, punchline } = data;
  return `${setup}\n\n👉 ${punchline}`;
};

window.runAsync = async () => {
  const outputEl = document.getElementById("async-output");
  outputEl.textContent = "Fetching joke...";
  outputEl.className = "output loading";

  try {
    const joke = await fetchJoke();
    outputEl.textContent = joke;
    outputEl.className = "output success";
  } catch (err) {
    outputEl.textContent = `Could not fetch joke. (${err.message})\nMaybe check your internet connection?`;
    outputEl.className = "output error";
  }
};

// ─────────────────────────────────────────────
// Section 6: Modules (imported from mathUtils.js)
// ─────────────────────────────────────────────
window.runModule = () => {
  const a  = parseFloat(document.getElementById("mod-a").value);
  const b  = parseFloat(document.getElementById("mod-b").value);
  const op = document.getElementById("mod-op").value;
  const outputEl = document.getElementById("mod-output");

  if (isNaN(a) || isNaN(b)) {
    outputEl.textContent = "Please enter valid numbers.";
    outputEl.className = "output error";
    return;
  }

  // Using imported functions from mathUtils.js
  const operations = { add, subtract, multiply, divide };
  const symbols    = { add: "+", subtract: "−", multiply: "×", divide: "÷" };

  const result = operations[op](a, b);
  const label  = describe(symbols[op], a, b, result);

  outputEl.innerHTML =
    `Result: ${label}\n\n` +
    `(Function imported from mathUtils.js using ES6 import/export)`;
  outputEl.className = "output success";
};
