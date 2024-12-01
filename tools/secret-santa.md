---
title: Secret Santa Generator
---

# 🎅 Secret Santa Generator 🎄

<div class="santa-container">
  <div class="form-group">
    <label for="participants">Names (one per line):</label>
    <textarea id="participants" rows="8" placeholder="Max Mustermann&#10;Erika Musterfrau&#10;..."></textarea>
  </div>

  <div class="form-group">
    <label for="handover-date">Gift handover date:</label>
    <input type="date" id="handover-date">
  </div>

  <button id="generate" class="generate-button">Generate & Share Link</button>

  <div id="result" class="result-container" style="display:none;">
    <h3>Results:</h3>
    <div id="assignments"></div>
  </div>
</div>

<div class="snowflakes" aria-hidden="true">
  <div class="snowflake">❅</div>
  <div class="snowflake">❆</div>
  <div class="snowflake">❅</div>
  <div class="snowflake">❆</div>
  <div class="snowflake">❅</div>
</div>

<style>
.main-content h1 {
    text-align: center;
}

.santa-container {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  border: 2px solid #c41e3a;
  position: relative;
}

.santa-container::before {
  content: "🎄";
  position: absolute;
  left: -30px;
  top: 50%;
  font-size: 2em;
}

.santa-container::after {
  content: "🎁";
  position: absolute;
  right: -30px;
  top: 50%;
  font-size: 2em;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #c41e3a;
  font-weight: bold;
}

.form-group textarea,
.form-group input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.form-group textarea:focus,
.form-group input[type="date"]:focus {
  border-color: #c41e3a;
  outline: none;
}

.generate-button {
  background: #c41e3a !important;
  color: white;
  border: 2px solid #8b0000;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.generate-button:hover {
  background: #8b0000 !important;
  transform: scale(1.05);
}

.result-container {
  margin-top: 20px;
  padding: 15px;
  border: 2px solid #006400;
  border-radius: 8px;
  background: #fff;
}

.result-container h3 {
  color: #006400;
  text-align: center;
  margin-top: 0;
}

.result-container p {
  padding: 10px;
  border-bottom: 1px dashed #ddd;
  margin: 0;
}

.result-container p:last-child {
  border-bottom: none;
}

.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.snowflake {
  color: #aae3fa;
  font-size: 1.5em;
  position: absolute;
  top: -10%;
  animation: fall 10s linear infinite;
  opacity: 0.5;
}

@keyframes fall {
  0% { transform: translateY(-10%) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}

.snowflake:nth-of-type(2n) { animation-delay: 2s; left: 20%; }
.snowflake:nth-of-type(3n) { animation-delay: 4s; left: 40%; }
.snowflake:nth-of-type(4n) { animation-delay: 6s; left: 60%; }
.snowflake:nth-of-type(5n) { animation-delay: 8s; left: 80%; }
</style>

<script>
// Seeded random number generator
class Random {
  constructor(seed) {
    this.seed = seed;
  }

  // Simple hash function for strings
  static hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  // Generate next random number
  next() {
    this.seed = (1664525 * this.seed + 1013904223) >>> 0;
    return this.seed / 0xFFFFFFFF;
  }

  // Shuffle array using Fisher-Yates
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

function generateAssignments(names, date) {
  const seed = Random.hash(names.join(',') + date);
  const random = new Random(seed);
  
  // Keep shuffling until no one gets themselves
  let shuffled;
  do {
    shuffled = random.shuffle([...names]);
  } while (names.some((name, i) => name === shuffled[i]));

  return names.map((name, i) => ({
    santa: name,
    recipient: shuffled[i]
  }));
}

function updateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const names = params.get('names');
  const date = params.get('date');

  if (names && date) {
    const nameList = decodeURIComponent(names).split(',');
    document.getElementById('participants').value = nameList.join('\n');
    document.getElementById('handover-date').value = date;
    showResults(nameList, date);
  }
}

function showResults(names, date) {
  const assignments = generateAssignments(names, date);
  const result = document.getElementById('result');
  const assignmentsDiv = document.getElementById('assignments');
  
  assignmentsDiv.innerHTML = assignments.map(({santa, recipient}) =>
    `<p>${santa} → ${recipient}</p>`
  ).join('');
  
  result.style.display = 'block';
}

document.getElementById('generate').addEventListener('click', () => {
  const names = document.getElementById('participants').value
    .split('\n')
    .map(n => n.trim())
    .filter(n => n.length > 0);
  const date = document.getElementById('handover-date').value;

  if (names.length < 2 || !date) {
    alert('Please enter at least 2 names and select a date!');
    return;
  }

  const params = new URLSearchParams();
  params.set('names', encodeURIComponent(names.join(',')));
  params.set('date', date);
  
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
  
  showResults(names, date);
});

// Load assignments from URL on page load
document.addEventListener('DOMContentLoaded', updateFromUrl);
</script>
