---
title: Feiertags Diff
---

<div>
  <label for="base-state">Current:</label>
  <select id="base-state" name="base-state" onchange="compareHolidays()">
    <option value="Baden-Württemberg">Baden-Württemberg</option>
    <option value="Bayern">Bayern</option>
    <option value="Berlin">Berlin</option>
    <option value="Brandenburg">Brandenburg</option>
    <option value="Bremen">Bremen</option>
    <option value="Hamburg">Hamburg</option>
    <option value="Hessen">Hessen</option>
    <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
    <option value="Niedersachsen">Niedersachsen</option>
    <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
    <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
    <option value="Saarland">Saarland</option>
    <option value="Sachsen">Sachsen</option>
    <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
    <option value="Schleswig-Holstein">Schleswig-Holstein</option>
    <option value="Thüringen">Thüringen</option>
  </select>
</div>
<div class="horizontal-checkboxes">
  <label for="compare-states">Incoming:</label>
  <div id="compare-states" class="horizontal-checkboxes">
    <label><input type="checkbox" name="compare-state" value="Baden-Württemberg" onchange="compareHolidays()"> Baden-Württemberg</label>
    <label><input type="checkbox" name="compare-state" value="Bayern" onchange="compareHolidays()"> Bayern</label>
    <label><input type="checkbox" name="compare-state" value="Berlin" onchange="compareHolidays()"> Berlin</label>
    <label><input type="checkbox" name="compare-state" value="Brandenburg" onchange="compareHolidays()"> Brandenburg</label>
    <label><input type="checkbox" name="compare-state" value="Bremen" onchange="compareHolidays()"> Bremen</label>
    <label><input type="checkbox" name="compare-state" value="Hamburg" onchange="compareHolidays()"> Hamburg</label>
    <label><input type="checkbox" name="compare-state" value="Hessen" onchange="compareHolidays()"> Hessen</label>
    <label><input type="checkbox" name="compare-state" value="Mecklenburg-Vorpommern" onchange="compareHolidays()"> Mecklenburg-Vorpommern</label>
    <label><input type="checkbox" name="compare-state" value="Niedersachsen" onchange="compareHolidays()"> Niedersachsen</label>
    <label><input type="checkbox" name="compare-state" value="Nordrhein-Westfalen" onchange="compareHolidays()"> Nordrhein-Westfalen</label>
    <label><input type="checkbox" name="compare-state" value="Rheinland-Pfalz" onchange="compareHolidays()"> Rheinland-Pfalz</label>
    <label><input type="checkbox" name="compare-state" value="Saarland" onchange="compareHolidays()"> Saarland</label>
    <label><input type="checkbox" name="compare-state" value="Sachsen" onchange="compareHolidays()"> Sachsen</label>
    <label><input type="checkbox" name="compare-state" value="Sachsen-Anhalt" onchange="compareHolidays()"> Sachsen-Anhalt</label>
    <label><input type="checkbox" name="compare-state" value="Schleswig-Holstein" onchange="compareHolidays()"> Schleswig-Holstein</label>
    <label><input type="checkbox" name="compare-state" value="Thüringen" onchange="compareHolidays()"> Thüringen</label>
  </div>
</div>

<div id="next-holiday" class="next-holiday">
  <!-- Next holiday information will be dynamically added here -->
</div>

<div id="result" class="diff-container">
  <table id="holidays-table">
    <thead>
      <tr>
        <th>Datum</th>
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
        overflow-x: auto;
        position: relative;
    }
    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
        overflow: hidden;
    }

    th, td {
        padding: 8px;
        border: 1px solid #e1e4e8;
        text-align: left;
        min-width: 200px;
    }

    /* Sticky first two columns */
    th:first-child,
    td:first-child {
        position: sticky;
        left: 0;
        z-index: 2;
        background: white;
        border-right: 2px solid #e1e4e8;
    }

    th:nth-child(2),
    td:nth-child(2) {
        position: sticky;
        left: 200px; /* same as min-width */
        z-index: 1;
        background: white;
        border-right: 2px solid #e1e4e8;
    }

    th:first-child,
    th:nth-child(2) {
        z-index: 3;
        background: #f6f8fa;
    }

    tr:nth-child(odd) td:first-child,
    tr:nth-child(odd) td:nth-child(2) {
        background: #fafafa;
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
        background-color: #f0f7fb;
        border-left: 5px solid #3498db;
        padding: 15px;
        border-radius: 3px;
    }
    .warning-icon {
        color: #d9534f;
        margin-left: 5px;
    }
</style>
<script>
  let holidays = {};

  async function fetchHolidays() {
    const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2024/DE');
    const data = await response.json();
    
    // Complete mapping of state codes to full names
    const stateMapping = {
      'DE-BW': 'Baden-Württemberg',
      'DE-BY': 'Bayern',
      'DE-BE': 'Berlin',
      'DE-BB': 'Brandenburg',
      'DE-HB': 'Bremen',
      'DE-HH': 'Hamburg',
      'DE-HE': 'Hessen',
      'DE-MV': 'Mecklenburg-Vorpommern',
      'DE-NI': 'Niedersachsen',
      'DE-NW': 'Nordrhein-Westfalen',
      'DE-RP': 'Rheinland-Pfalz',
      'DE-SL': 'Saarland',
      'DE-SN': 'Sachsen',
      'DE-ST': 'Sachsen-Anhalt',
      'DE-SH': 'Schleswig-Holstein',
      'DE-TH': 'Thüringen'
    };

    // Initialize holidays object
    holidays = Object.values(stateMapping).reduce((acc, state) => {
      acc[state] = [];
      return acc;
    }, {});

    // Transform API data into required format
    data.forEach(holiday => {
      const holidayData = {
        date: holiday.date,
        name: holiday.localName
      };

      // If holiday is global, add it to all states
      if (holiday.global) {
        Object.keys(holidays).forEach(state => {
          holidays[state].push({...holidayData});
        });
        return;
      }

      // Add holiday to specific states
      if (holiday.counties) {
        holiday.counties.forEach(county => {
          const stateName = stateMapping[county];
          if (stateName && holidays[stateName]) {
            holidays[stateName].push({...holidayData});
          }
        });
      }
    });

    // Sort holidays by date for each state
    Object.keys(holidays).forEach(state => {
      holidays[state].sort((a, b) => a.date.localeCompare(b.date));
    });

    compareHolidays();
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      currentState: params.get('current'),
      incomingStates: params.getAll('incoming')
    };
  }

  function updateURL(baseState, compareStates) {
    const params = new URLSearchParams();
    params.set('current', baseState);
    compareStates.forEach(state => params.append('incoming', state));
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

    const baseState = document.getElementById('base-state').value;
    const compareStates = Array.from(document.querySelectorAll('input[name="compare-state"]:checked')).map(el => el.value);
    const selectedStates = [baseState, ...compareStates];

    const statesWithHoliday = selectedStates.filter(state => 
      holidays[state].some(holiday => holiday.date === nextHoliday.date)
    );
    const statesWithoutHoliday = selectedStates.filter(state => 
      !holidays[state].some(holiday => holiday.date === nextHoliday.date)
    );

    const nextHolidayDiv = document.getElementById('next-holiday');
    nextHolidayDiv.innerHTML = `
      Nächster Feiertag ist <strong>${nextHoliday.name} am ${nextHoliday.date}</strong>
      ${statesWithHoliday.length ? `in ${statesWithHoliday.map(state => `${state} 😎`).join(', ')}` : ''}
      ${statesWithoutHoliday.length ? `und nicht in ${statesWithoutHoliday.map(state => `${state} 👨‍💻`).join(', ')}` : ''}.
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
    holidaysTableHead.innerHTML = `<th>Date</th><th id="base-state-header">Current: ${baseState}</th>`;

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
      const dateTd = document.createElement('td');
      dateTd.textContent = date;

      let hasDiff = false;

      if (baseHoliday) {
        baseTd.textContent = `${baseHoliday.name}`;
      } else {
        baseTd.textContent = 'Kein Feiertag';
        baseTd.classList.add('removed');
        hasDiff = true;
      }
      tr.appendChild(dateTd);
      tr.appendChild(baseTd);

      compareStates.forEach(state => {
        const td = document.createElement('td');
        const stateHoliday = holidays[state].find(h => h.date === date);
        if (stateHoliday) {
          td.textContent = `${stateHoliday.name}`;
          if (!baseHoliday) {
            td.classList.add('added');
            hasDiff = true;
          }
        } else {
          td.textContent = 'Kein Feiertag';
          td.classList.add('removed');
          hasDiff = true;
        }
        tr.appendChild(td);
      });

      if (hasDiff) {
        dateTd.innerHTML += ' <span class="warning-icon">⚠️</span>';
      }

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
