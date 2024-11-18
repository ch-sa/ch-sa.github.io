---
title: Feiertags Diff
---

<div>
  <label for="base-state">Base State:</label>
  <select id="base-state" name="base-state" onchange="compareHolidays()">
    <option value="Bayern">Bayern</option>
    <option value="Berlin">Berlin</option>
    <option value="Sachsen">Sachsen</option>
    <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
    <!-- Add more states as needed -->
  </select>
</div>
<div>
  <label for="compare-states">Incoming States:</label>
  <div id="compare-states" class="horizontal-checkboxes">
    <label><input type="checkbox" name="compare-state" value="Bayern" onchange="compareHolidays()"> Bayern</label>
    <label><input type="checkbox" name="compare-state" value="Berlin" onchange="compareHolidays()"> Berlin</label>
    <label><input type="checkbox" name="compare-state" value="Sachsen" onchange="compareHolidays()"> Sachsen</label>
    <label><input type="checkbox" name="compare-state" value="Nordrhein-Westfalen" onchange="compareHolidays()"> Nordrhein-Westfalen</label>
    <!-- Add more states as needed -->
  </div>
</div>

<div id="next-holiday" class="next-holiday">
  <!-- Next holiday information will be dynamically added here -->
</div>

<div id="result" class="diff-container">
  <table id="holidays-table">
    <thead>
      <tr>
        <th id="base-state-header">Base State Holidays</th>
        <!-- Compare state headers will be dynamically added here -->
      </tr>
    </thead>
    <tbody id="holidays-table-body">
      <!-- Holiday rows will be dynamically added here -->
    </tbody>
  </table>
</div>

<style>
    .main-content {
        max-width: 80%;
        margin: 0 auto;
    }
    .diff-container {
        overflow: hidden;
    }
    table {
        border-collapse: collapse;
        table-layout: fixed;
    }

    th, td {
        padding: 8px;
        border: 1px solid #e1e4e8;
        text-align: left;
    }
    th {
        background-color: #f6f8fa;
    }
    tr:nth-child(odd) {
        background-color: #f6f8fa;
    }
    .added {
        background-color: #e6ffed;
        color: #22863a;
    }
    .removed {
        background-color: #ffeef0;
        color: #cb2431;
    }
    .horizontal-checkboxes {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .horizontal-checkboxes label {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .next-holiday {
        margin: 20px 0;
        font-style: italic;
    }
</style>
<script>
  let holidays = {};

  async function fetchHolidays() {
    const response = await fetch('public-holidays.json');
    holidays = await response.json();
    compareHolidays();
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      currentState: params.get('currentState'),
      incomingStates: params.get('incomingStates') ? params.get('incomingStates').split(',') : []
    };
  }

  function updateURL(baseState, compareStates) {
    const params = new URLSearchParams();
    params.set('currentState', baseState);
    params.set('incomingStates', compareStates.join(','));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }

  function getNextHoliday() {
    const today = new Date().toISOString().split('T')[0];
    const allHolidays = Object.values(holidays).flat();
    const futureHolidays = allHolidays.filter(holiday => holiday.date >= today);
    futureHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureHolidays[0];
  }

  function updateNextHolidaySection() {
    const nextHoliday = getNextHoliday();
    if (!nextHoliday) return;

    const statesWithHoliday = Object.keys(holidays).filter(state => holidays[state].some(holiday => holiday.date === nextHoliday.date));
    const statesWithoutHoliday = Object.keys(holidays).filter(state => !holidays[state].some(holiday => holiday.date === nextHoliday.date));

    const nextHolidayDiv = document.getElementById('next-holiday');
    nextHolidayDiv.innerHTML = `
      Nächster Feiertag ist <strong>${nextHoliday.name} am ${nextHoliday.date}</strong>
      in ${statesWithHoliday.map(state => `${state} 😎`).join(', ')} und nicht in
      ${statesWithoutHoliday.map(state => `${state} 😢`).join(', ')}.
    `;
  }

  function compareHolidays() {
    const baseState = document.getElementById('base-state').value;
    let compareStates = Array.from(document.querySelectorAll('input[name="compare-state"]:checked')).map(el => el.value);

    updateURL(baseState, compareStates);

    const baseHolidays = holidays[baseState] || [];
    const holidaysTableBody = document.getElementById('holidays-table-body');
    const holidaysTableHead = document.querySelector('#holidays-table thead tr');
    const baseStateHeader = document.getElementById('base-state-header');

    holidaysTableBody.innerHTML = '';
    baseStateHeader.textContent = `Current: ${baseState}`;
    holidaysTableHead.innerHTML = `<th id="base-state-header">Current: ${baseState}</th>`;

    // Remove the base state from the compare states if it is selected
    compareStates = compareStates.filter(state => state !== baseState);

    compareStates.forEach(state => {
      const th = document.createElement('th');
      th.textContent = `Incoming: ${state}`;
      holidaysTableHead.appendChild(th);
    });

    const allDates = new Set(baseHolidays.map(holiday => holiday.date));
    compareStates.forEach(state => {
      holidays[state].forEach(holiday => allDates.add(holiday.date));
    });

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    sortedDates.forEach(date => {
      const tr = document.createElement('tr');
      const baseHoliday = baseHolidays.find(h => h.date === date);
      const baseTd = document.createElement('td');
      if (baseHoliday) {
        baseTd.textContent = `${baseHoliday.date} - ${baseHoliday.name}`;
      } else {
        baseTd.textContent = 'Kein Feiertag';
        baseTd.classList.add('removed');
      }
      tr.appendChild(baseTd);

      compareStates.forEach(state => {
        const td = document.createElement('td');
        const stateHoliday = holidays[state].find(h => h.date === date);
        if (stateHoliday) {
          td.textContent = `${stateHoliday.date} - ${stateHoliday.name}`;
          if (!baseHoliday) {
            td.classList.add('added');
          }
        } else {
          td.textContent = 'Kein Feiertag';
          td.classList.add('removed');
        }
        tr.appendChild(td);
      });

      holidaysTableBody.appendChild(tr);
    });

    // Remove the checkbox for the selected base state
    document.querySelectorAll('input[name="compare-state"]').forEach(checkbox => {
      checkbox.parentElement.style.display = checkbox.value === baseState ? 'none' : 'flex';
    });

    updateNextHolidaySection();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const { currentState, incomingStates } = getQueryParams();
    if (currentState) {
      document.getElementById('base-state').value = currentState;
    }
    incomingStates.forEach(state => {
      const checkbox = document.querySelector(`input[name="compare-state"][value="${state}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
    await fetchHolidays();
  });
</script>
