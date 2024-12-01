---
layout: default
title: Secret Santa Generator
---

# Secret Santa Generator

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

<style>
.santa-container {
  max-width: 600px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group textarea {
  width: 100%;
  padding: 8px;
}

.form-group input[type="date"] {
  padding: 8px;
}

.generate-button {
  background: #0366d6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.generate-button:hover {
  background: #045cb5;
}

.result-container {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
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
